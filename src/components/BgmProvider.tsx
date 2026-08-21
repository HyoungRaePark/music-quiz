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
};

const BgmContext = createContext<BgmContextType | null>(null);

export function BgmProvider({ children }: { children: ReactNode }) {
  // 현재 페이지 주소
  const pathname = usePathname();

  // 실제 <audio> 태그
  const audioRef = useRef<HTMLAudioElement>(null);

  // Web Audio API의 AudioContext
  const audioContextRef = useRef<AudioContext | null>(null);

  // 음악이 analyser에 중복 연결되는 것을 방지
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  // BGM 재생 상태
  const [isPlaying, setIsPlaying] = useState(false);

  // 이퀄라이저가 사용할 분석기
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  // 페이지에 따라 사용할 BGM 결정
  const bgmSrc =
    pathname === "/game"
      ? "/audio/game-intro-bgm.wav"
      : "/audio/main-bgm.wav";

  const setupAudioAnalyser = () => {
    const audio = audioRef.current;

    if (!audio) return;

    // 이미 만들어져 있다면 다시 만들지 않음
    if (audioContextRef.current && analyser) {
      return;
    }

    const audioContext = new AudioContext();

    const source =
      audioContext.createMediaElementSource(audio);

    const analyserNode =
      audioContext.createAnalyser();

    // 분석 정밀도
    analyserNode.fftSize = 256;

    // audio → analyser 연결
    source.connect(analyserNode);

    // analyser → 스피커 연결
    analyserNode.connect(audioContext.destination);

    audioContextRef.current = audioContext;
    sourceRef.current = source;

    setAnalyser(analyserNode);
  };

  const toggleBgm = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    // 음악을 처음 실행할 때 analyser 생성
    setupAudioAnalyser();

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      // 브라우저에 의해 AudioContext가 멈춰있다면 다시 실행
      if (audioContextRef.current?.state === "suspended") {
        await audioContextRef.current.resume();
      }

      await audio.play();

      setIsPlaying(true);
    } catch (error) {
      console.error("BGM 재생 실패:", error);
    }
  };

  // 페이지가 변경되어 BGM 파일이 바뀌었을 때 처리
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    // 새로운 음악을 처음부터 시작
    audio.currentTime = 0;

    // 기존에 BGM이 켜져 있었다면 새 음악도 재생
    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("BGM 전환 실패:", error);
      });
    }
  }, [bgmSrc]);

  return (
    <BgmContext.Provider
      value={{
        isPlaying,
        toggleBgm,
        analyser,
      }}
    >
      <audio
        ref={audioRef}
        src={bgmSrc}
        loop
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