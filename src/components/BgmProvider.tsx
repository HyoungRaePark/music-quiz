"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

import { usePathname } from "next/navigation";

type BgmContextType = {
  isPlaying: boolean;
  toggleBgm: () => void;
  analyser: AnalyserNode | null;

  playPreview: (src: string) => void;
  stopPreview: () => void;
};

const BgmContext = createContext<BgmContextType | null>(null);

export function BgmProvider({ children }: { children: ReactNode }) {
  // 현재 페이지 주소
  const pathname = usePathname();

  // 기본 BGM
  const audioRef = useRef<HTMLAudioElement>(null);

  // 카드 hover 미리듣기
  const previewAudioRef = useRef<HTMLAudioElement>(null);

  // Web Audio API
  const audioContextRef = useRef<AudioContext | null>(null);

  // analyser 중복 연결 방지
  const sourceRef =
    useRef<MediaElementAudioSourceNode | null>(null);

  // BGM ON / OFF 상태
  const [isPlaying, setIsPlaying] = useState(false);

  // 이퀄라이저 분석기
  const [analyser, setAnalyser] =
    useState<AnalyserNode | null>(null);

  // 페이지에 따라 사용할 기본 BGM
  const bgmSrc =
    pathname === "/game"
      ? "/audio/game-intro-bgm.wav"
      : pathname === "/game/mode"
        ? "/audio/mode-bgm.wav"
        : "/audio/main-bgm.wav";

  // ==============================
  // AbortError 확인
  // ==============================

  const isAbortError = (error: unknown) => {
    return (
      error instanceof DOMException &&
      error.name === "AbortError"
    );
  };

  // ==============================
  // analyser 설정
  // ==============================

  const setupAudioAnalyser = () => {
    const audio = audioRef.current;

    if (!audio) return;

    // 이미 만들어져 있으면 다시 만들지 않음
    if (audioContextRef.current && analyser) {
      return;
    }

    const audioContext = new AudioContext();

    const source =
      audioContext.createMediaElementSource(audio);

    const analyserNode =
      audioContext.createAnalyser();

    analyserNode.fftSize = 256;

    // audio → analyser → 스피커
    source.connect(analyserNode);
    analyserNode.connect(audioContext.destination);

    audioContextRef.current = audioContext;
    sourceRef.current = source;

    setAnalyser(analyserNode);
  };

  // ==============================
  // BGM ON / OFF
  // ==============================

  const toggleBgm = async () => {
    const audio = audioRef.current;
    const preview = previewAudioRef.current;

    if (!audio) return;

    setupAudioAnalyser();

    // 현재 BGM이 켜져 있으면 OFF
    if (isPlaying) {
      audio.pause();

      if (preview) {
        preview.pause();
        preview.currentTime = 0;
      }

      setIsPlaying(false);

      return;
    }

    // BGM OFF → ON
    try {
      if (
        audioContextRef.current?.state === "suspended"
      ) {
        await audioContextRef.current.resume();
      }

      await audio.play();

      setIsPlaying(true);
    } catch (error) {
      if (isAbortError(error)) {
        return;
      }

      console.error("BGM 재생 실패:", error);
    }
  };

  // ==============================
  // 카드 hover 미리듣기
  // ==============================

  const playPreview = async (src: string) => {
    const bgm = audioRef.current;
    const preview = previewAudioRef.current;

    if (!bgm || !preview) return;

    // BGM OFF라면 미리듣기도 재생하지 않음
    if (!isPlaying) return;

    // 기본 BGM 잠시 정지
    bgm.pause();

    // 이전 미리듣기 초기화
    preview.pause();
    preview.currentTime = 0;

    // 새로운 미리듣기 파일 설정
    preview.src = src;

    // 변경된 src를 브라우저가 다시 읽도록 함
    preview.load();

    try {
      await preview.play();
    } catch (error) {
      // hover가 빠르게 해제되면서
      // play() 직후 pause()가 호출된 경우
      if (isAbortError(error)) {
        return;
      }

      console.error(
        "미리듣기 재생 실패:",
        error
      );
    }
  };

  // ==============================
  // 카드 hover 해제
  // ==============================

  const stopPreview = async () => {
    const bgm = audioRef.current;
    const preview = previewAudioRef.current;

    if (!bgm || !preview) return;

    // 미리듣기 종료
    preview.pause();
    preview.currentTime = 0;

    // BGM이 켜져 있던 상태라면 다시 재생
    if (isPlaying) {
      try {
        await bgm.play();
      } catch (error) {
        if (isAbortError(error)) {
          return;
        }

        console.error(
          "BGM 복귀 실패:",
          error
        );
      }
    }
  };

  // ==============================
  // 페이지 변경 시 BGM 변경
  // ==============================

  useEffect(() => {
    const audio = audioRef.current;
    const preview = previewAudioRef.current;

    if (!audio) return;

    // 페이지 이동 시 미리듣기 종료
    if (preview) {
      preview.pause();
      preview.currentTime = 0;
    }

    // 새로운 페이지의 BGM은 처음부터
    audio.currentTime = 0;

    // 기존에 BGM ON 상태였다면
    // 새로운 페이지 BGM도 재생
    if (isPlaying) {
      audio.play().catch((error) => {
        if (isAbortError(error)) {
          return;
        }

        console.error(
          "BGM 전환 실패:",
          error
        );
      });
    }
  }, [bgmSrc]);

  return (
    <BgmContext.Provider
      value={{
        isPlaying,
        toggleBgm,
        analyser,
        playPreview,
        stopPreview,
      }}
    >
      {/* 페이지 기본 BGM */}
      <audio
        ref={audioRef}
        src={bgmSrc}
        loop
        preload="auto"
      />

      {/* 카드 hover 미리듣기 */}
      <audio
        ref={previewAudioRef}
        preload="auto"
      />

      {children}
    </BgmContext.Provider>
  );
}

export function useBgm() {
  const context = useContext(BgmContext);

  if (!context) {
    throw new Error(
      "useBgm은 BgmProvider 안에서 사용해야 합니다."
    );
  }

  return context;
}