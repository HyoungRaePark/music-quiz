"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import GameHeader from "@/components/GameHeader";
import CorrectResult from "@/components/CorrectResult";
import WrongResult from "@/components/WrongResult";
import TimeoutResult from "@/components/TimeoutResult";
import GameOver from "@/components/GameOver";

import styles from "../../../styles/Play.module.scss";

const mockSongs = [
  {
    id: 1,
    title: "Hype Boy",
    audio: "/audio/hype-boy.mp3",
  },
  {
    id: 2,
    title: "좋은 날",
    audio: "/audio/좋은 날.mp3",
  },
  {
    id: 3,
    title: "Blue Valentine",
    audio: "/audio/Blue-valentine.mp3",
  },
];

export default function GamePlayPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode") ?? "K-POP";

  // ==============================
  // 게임 상태
  // ==============================

  const [timeLeft, setTimeLeft] = useState(5);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);

  // ==============================
  // 문제 상태
  // ==============================

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 맞힌 문제 수
  const [correctCount, setCorrectCount] = useState(0);

  // ==============================
  // 입력 / 결과 상태
  // ==============================

  const [answer, setAnswer] = useState("");

  const [resultType, setResultType] = useState<
    "correct" | "wrong" | "timeout" | null
  >(null);

  // ==============================
  // 게임 시작 / 종료 상태
  // ==============================

  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // ==============================
  // 최고 점수
  // ==============================

  const [bestScore, setBestScore] = useState(0);

  // 이번 게임에서 신기록인지 여부
  const [isNewRecord, setIsNewRecord] = useState(false);

  // ==============================
  // 현재 오디오
  // ==============================

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = mockSongs[currentQuestionIndex];

  // ==============================
  // 음악 정지
  // ==============================

  const stopMusic = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  // ==============================
  // 음악 재생
  // ==============================

  const playMusic = (songIndex: number) => {
    const song = mockSongs[songIndex];

    if (!song) return;

    stopMusic();

    const audio = new Audio(song.audio);

    audio.volume = 0.5;

    audioRef.current = audio;

    audio.play().catch((error) => {
      console.error("음악 재생 실패:", error);
    });
  };

  // ==============================
  // 개인 최고 점수 불러오기
  // ==============================

  useEffect(() => {
    const savedBestScore = localStorage.getItem(
      `songQuizBestScore_${mode}`
    );

    if (savedBestScore) {
      setBestScore(Number(savedBestScore));
    } else {
      setBestScore(0);
    }
  }, [mode]);

  // ==============================
  // 게임 시작
  // ==============================

  const handleStartGame = () => {
    setIsStarted(true);
    setIsGameOver(false);

    setTimeLeft(5);
    setLives(3);
    setScore(0);
    setCombo(0);

    setCorrectCount(0);
    setCurrentQuestionIndex(0);

    setAnswer("");
    setResultType(null);
    setIsNewRecord(false);

    playMusic(0);
  };

  // ==============================
  // 게임 종료
  // ==============================

  const finishGame = () => {
    stopMusic();

    setResultType(null);
    setIsStarted(false);
    setIsGameOver(true);

    // 현재 점수가 기존 최고 점수보다 높으면 신기록
    setScore((currentScore) => {
      if (currentScore > bestScore) {
        setBestScore(currentScore);
        setIsNewRecord(true);

        localStorage.setItem(
          `songQuizBestScore_${mode}`,
          String(currentScore)
        );
      } else {
        setIsNewRecord(false);
      }

      return currentScore;
    });
  };

  // ==============================
  // 다음 문제
  // ==============================

  const goToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;

    // 마지막 문제까지 끝난 경우
    if (nextIndex >= mockSongs.length) {
      finishGame();
      return;
    }

    // 다음 문제로 이동
    setResultType(null);
    setAnswer("");

    setCurrentQuestionIndex(nextIndex);
    setTimeLeft(5);

    playMusic(nextIndex);
  };

  // ==============================
  // 시간 초과
  // ==============================

  const handleTimeout = () => {
    stopMusic();

    setLives((prev) => {
      const nextLives = prev - 1;

      // 마지막 목숨이면 게임오버
      if (nextLives <= 0) {
        finishGame();
        return 0;
      }

      return nextLives;
    });

    // 목숨이 남아있으면 시간초과 결과 표시
    if (lives > 1) {
      setResultType("timeout");
    }
  };

  // ==============================
  // 타이머
  // ==============================

  useEffect(() => {
    if (!isStarted || isGameOver || resultType) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isGameOver, resultType]);

  // ==============================
  // 시간 초과 감지
  // ==============================

  useEffect(() => {
    if (
      !isStarted ||
      isGameOver ||
      resultType ||
      timeLeft !== 0
    ) {
      return;
    }

    handleTimeout();
  }, [
    timeLeft,
    isStarted,
    isGameOver,
    resultType,
  ]);

  // ==============================
  // 컴포넌트가 사라질 때 음악 정리
  // ==============================

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  // ==============================
  // 정답 제출
  // ==============================

  const handleSubmit = () => {
    if (
      !answer.trim() ||
      !isStarted ||
      isGameOver ||
      resultType !== null
    ) {
      return;
    }
    const userAnswer = answer.trim();

    // ==============================
    // 정답
    // ==============================

    if (userAnswer === currentSong.title) {
      const baseScore = 100;
      const timeBonus = timeLeft * 10;
      const earnedScore = baseScore + timeBonus;

      setScore((prev) => prev + earnedScore);
      setCombo((prev) => prev + 1);

      // 맞힌 문제 수 증가
      setCorrectCount((prev) => prev + 1);

      // 정답 화면 표시
      setResultType("correct");

      stopMusic();
    }

    // ==============================
    // 오답
    // ==============================

    else {
      setResultType("wrong");
    }

    setAnswer("");
  };

  // ==============================
  // 다시 도전
  // ==============================

  const handleRetry = () => {
    handleStartGame();
  };

  // ==============================
  // 메인 화면으로 이동
  // ==============================

  const handleExit = () => {
    stopMusic();

    router.push("/");
  };

  // ==============================
  // 게임오버 화면
  // ==============================

  if (isGameOver) {
    return (
      <GameOver
        mode={mode}
        correctCount={correctCount}
        totalQuestions={mockSongs.length}
        score={score}
        bestScore={Math.max(score, bestScore)}
        grade="-"
        isNewRecord={isNewRecord}
        onRetry={handleRetry}
        onExit={handleExit}
      />
    );
  }

  // ==============================
  // 게임 플레이 화면
  // ==============================

  return (
    <>
      <GameHeader />

      <main className={styles.playPage}>

        {/* 게임 HUD */}
        <section className={styles.gameHud}>

          {/* 모드 / 문제 번호 */}
          <div className={styles.modeInfo}>
            <span className={styles.modeName}>
              {mode}
            </span>

            <span className={styles.question}>
              QUESTION {currentQuestionIndex + 1} /{" "}
              {mockSongs.length}
            </span>
          </div>

          {/* 타이머 */}
          <div className={styles.timerArea}>
            <span className={styles.timer}>
              00:{String(timeLeft).padStart(2, "0")}
            </span>

            <div className={styles.timerBar}>
              <div
                className={styles.timerProgress}
                style={{
                  width: `${(timeLeft / 5) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* 게임 상태 정보 */}
          <div className={styles.statusArea}>

            {/* 남은 목숨 */}
            <div className={styles.lives}>
              <span className={styles.statusLabel}>
                LIVES
              </span>

              <span className={styles.hearts}>
                {Array.from({ length: 3 }).map(
                  (_, index) => (
                    <span key={index}>
                      {index < lives ? "♡" : "·"}
                    </span>
                  )
                )}
              </span>
            </div>

            {/* 현재 콤보 */}
            <div className={styles.combo}>
              <span className={styles.statusLabel}>
                COMBO
              </span>

              <span className={styles.comboValue}>
                ×{combo}
              </span>
            </div>

            {/* 현재 점수 */}
            <div className={styles.score}>
              <span className={styles.statusLabel}>
                SCORE
              </span>

              <span className={styles.scoreValue}>
                {score}
              </span>
            </div>

          </div>
        </section>


        {/* 음악 비주얼 영역 */}
        <section className={styles.visualArea}>

          {/* 왼쪽 Waveform */}
          <div className={`${styles.waveform} ${styles.waveformLeft}`}>
            <svg
              viewBox="0 0 500 180"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className={styles.wavePath}
                d="
                  M 0 90
                  C 25 90, 35 55, 60 55
                  C 85 55, 90 120, 115 120
                  C 140 120, 150 70, 175 70
                  C 200 70, 205 105, 230 105
                  C 255 105, 270 35, 295 35
                  C 320 35, 325 125, 350 125
                  C 375 125, 390 65, 415 65
                  C 440 65, 450 90, 500 90
                "
              />
            </svg>
          </div>

          {/* 가운데 LP판 */}
          <div className={styles.musicDisc}>
            <span className={styles.musicIcon}>
              ♪
            </span>
          </div>

          {/* 오른쪽 Waveform */}
          <div className={`${styles.waveform} ${styles.waveformRight}`}>
            <svg
              viewBox="0 0 500 180"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className={styles.wavePath}
                d="
                  M 0 90
                  C 25 90, 35 65, 60 65
                  C 85 65, 100 125, 125 125
                  C 150 125, 155 35, 180 35
                  C 205 35, 215 105, 240 105
                  C 265 105, 275 70, 300 70
                  C 325 70, 335 120, 360 120
                  C 385 120, 395 55, 420 55
                  C 445 55, 460 90, 500 90
                "
              />
            </svg>
          </div>

        </section>

        {/* 게임 시작 버튼 */}
        {/* 게임 시작 영역
            게임이 시작되어도 startArea 자체는 남겨서
            정답 입력칸의 위치가 움직이지 않도록 한다.
        */}
        <div className={styles.startArea}>
          {!isStarted && !isGameOver && (
            <>
              <p className={styles.readyText}>
                READY?
              </p>

              <button
                className={styles.startButton}
                onClick={handleStartGame}
              >
                START
              </button>
            </>
          )}
        </div>

        {/* 정답 */}
        {resultType === "correct" && (
          <CorrectResult
            score={score}
            songTitle={currentSong.title}
            onNext={goToNextQuestion}
          />
        )}

        {/* 오답 */}
        {resultType === "wrong" && (
          <WrongResult
            onClose={() => setResultType(null)}
          />
        )}

        {/* 시간초과 */}
        {resultType === "timeout" && (
          <TimeoutResult
            songTitle={currentSong.title}
            onNext={goToNextQuestion}
          />
        )}

        {/* 정답 입력 */}
        <section className={styles.answerArea}>

          <input
            type="text"
            placeholder="노래 제목을 입력하세요..."
            className={styles.answerInput}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            disabled={!isStarted || isGameOver || resultType !== null}
          />

          <p className={styles.answerGuide}>
            정확한 노래 제목을 입력해야 정답으로 인정됩니다.
          </p>

          {/* 테스트용 정답 */}
          <p>
            테스트 정답: {currentSong.title}
          </p>

        </section>

      </main>
    </>
  );
}