"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import GameHeader from "@/components/GameHeader";
import CorrectResult from "@/components/CorrectResult";
import WrongResult from "@/components/WrongResult";
import TimeoutResult from "@/components/TimeoutResult";
import GameOver from "@/components/GameOver";

import styles from "../../../styles/Play.module.scss";

/*
 * =========================================================
 * Song 타입
 * =========================================================
 *
 * Spring Boot의 SongResponse DTO에서 전달되는
 * JSON 데이터 구조와 맞춰준다.
 *
 * 백엔드 응답 예:
 *
 * {
 *   songId: 1,
 *   title: "좋은 날",
 *   artist: "IU",
 *   category: "KPOP",
 *   audioPath: "/music/kpop/good-day.mp3"
 * }
 */
type Song = {
  songId: number;
  title: string;
  artist: string;
  category: string;
  audioPath: string;
};

export default function GamePlayPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /*
   * 모드 선택 페이지에서 전달한 mode 값을 가져온다.
   *
   * 예:
   * /game/play?mode=K-POP
   *
   * 값이 없다면 기본적으로 K-POP을 사용한다.
   */
  const mode = searchParams.get("mode") ?? "K-POP";

  // ========================================================
  // 노래 데이터 상태
  // ========================================================

  /*
   * 백엔드에서 조회한 원본 노래 목록.
   *
   * 이 배열 자체는 게임 진행 중 변경하지 않는다.
   */
  const [songs, setSongs] = useState<Song[]>([]);

  /*
   * 이번 게임에서 실제로 출제할 노래 목록.
   *
   * 게임 START를 누르면 songs를 복사한 뒤
   * 랜덤으로 섞어서 gameSongs에 저장한다.
   *
   * 따라서:
   *
   * songs
   * → 서버에서 받은 원본
   *
   * gameSongs
   * → 이번 게임의 실제 문제 순서
   */
  const [gameSongs, setGameSongs] = useState<Song[]>([]);

  /*
   * 백엔드에서 노래 목록을 받아오는 중인지 나타낸다.
   *
   * API 요청이 끝나기 전에 게임 화면이 먼저 동작하는 것을
   * 방지하기 위해 사용한다.
   */
  const [isLoadingSongs, setIsLoadingSongs] = useState(true);

  // ========================================================
  // 게임 상태
  // ========================================================

  const [timeLeft, setTimeLeft] = useState(5);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);

  // ========================================================
  // 문제 상태
  // ========================================================

  /*
   * 현재 몇 번째 문제인지 저장한다.
   *
   * 배열은 0부터 시작하므로
   * 첫 번째 문제의 index는 0이다.
   */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 이번 게임에서 맞힌 문제 수
  const [correctCount, setCorrectCount] = useState(0);

  /*
   * 현재 문제의 노래.
   *
   * gameSongs가 아직 만들어지지 않았다면
   * currentSong은 undefined일 수 있다.
   */
  const currentSong = gameSongs[currentQuestionIndex];

  // ========================================================
  // 입력 / 결과 상태
  // ========================================================

  const [answer, setAnswer] = useState("");

  /*
   * 현재 표시할 결과 화면.
   *
   * null
   * → 결과 화면 없음
   *
   * correct
   * → 정답
   *
   * wrong
   * → 오답
   *
   * timeout
   * → 시간 초과
   */
  const [resultType, setResultType] = useState<
    "correct" | "wrong" | "timeout" | null
  >(null);

  // ========================================================
  // 게임 시작 / 종료 상태
  // ========================================================

  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // ========================================================
  // 최고 점수
  // ========================================================

  const [bestScore, setBestScore] = useState(0);

  // 이번 게임에서 신기록을 세웠는지 여부
  const [isNewRecord, setIsNewRecord] = useState(false);

  // ========================================================
  // 오디오
  // ========================================================

  /*
   * 현재 재생 중인 Audio 객체를 저장한다.
   *
   * React 렌더링과 관계없는 객체이기 때문에
   * useState가 아니라 useRef를 사용한다.
   */
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ========================================================
  // 백엔드에서 게임용 노래 조회
  // ========================================================

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setIsLoadingSongs(true);

        /*
         * 프론트와 DB의 장르 표기가 조금 다르다.
         *
         * 프론트:
         * K-POP / J-POP
         *
         * 백엔드:
         * KPOP / JPOP
         *
         * 따라서 API 요청 전에 백엔드 형식으로 변환한다.
         */
        const category =
          mode === "K-POP"
            ? "KPOP"
            : mode === "J-POP"
              ? "JPOP"
              : mode;

        const response = await fetch(
          `http://localhost:8080/api/songs?category=${category}`
        );

        /*
         * 서버가 4xx 또는 5xx 상태 코드를 반환하면
         * 정상 응답으로 처리하지 않는다.
         */
        if (!response.ok) {
          throw new Error("노래 목록 조회에 실패했습니다.");
        }

        const data: Song[] = await response.json();

        /*
         * 서버에서 받은 원본 데이터만 songs에 저장한다.
         *
         * 실제 게임 문제 목록인 gameSongs는
         * START 버튼을 눌렀을 때 생성한다.
         */
        setSongs(data);
      } catch (error) {
        console.error("노래 조회 실패:", error);

        // 요청 실패 시 이전 데이터가 남지 않도록 초기화한다.
        setSongs([]);
      } finally {
        // 성공/실패와 관계없이 로딩 상태를 종료한다.
        setIsLoadingSongs(false);
      }
    };

    fetchSongs();
  }, [mode]);

  // ========================================================
  // 개인 최고 점수 불러오기
  // ========================================================

  useEffect(() => {
    /*
     * 현재는 로그인/DB 기록 저장 기능을 구현하기 전이므로
     * 브라우저 localStorage를 이용해 최고 점수를 저장한다.
     *
     * 모드별로 각각 다른 최고 점수를 사용한다.
     */
    const savedBestScore = localStorage.getItem(
      `songQuizBestScore_${mode}`
    );

    if (savedBestScore) {
      setBestScore(Number(savedBestScore));
    } else {
      setBestScore(0);
    }
  }, [mode]);

  // ========================================================
  // 음악 정지
  // ========================================================

  const stopMusic = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  // ========================================================
  // 음악 재생
  // ========================================================

  const playMusic = (song: Song | undefined) => {
    /*
     * 존재하지 않는 노래가 전달되면
     * 재생하지 않고 종료한다.
     */
    if (!song) return;

    // 이전 문제가 재생 중이라면 먼저 정지한다.
    stopMusic();

    /*
     * DB의 audioPath에는
     *
     * /music/kpop/good-day.mp3
     *
     * 같은 상대 경로가 저장되어 있다.
     *
     * 실제 MP3 파일은 Spring Boot 서버가 제공하므로
     * 백엔드 주소와 합쳐 실제 재생 URL을 만든다.
     */
    const audio = new Audio(
      `http://localhost:8080${song.audioPath}`
    );

    audio.volume = 0.5;

    audioRef.current = audio;

    audio.play().catch((error) => {
      console.error("음악 재생 실패:", error);
    });
  };

  // ========================================================
  // 게임 시작
  // ========================================================

  const handleStartGame = () => {
    /*
     * 혹시 데이터가 없는 상태에서 호출되더라도
     * 게임이 시작되지 않도록 방어한다.
     */
    if (songs.length === 0) return;

    /*
     * React의 songs 상태를 직접 수정하면 안 되기 때문에
     * spread 문법으로 새로운 배열을 만든다.
     */
    const shuffledSongs = [...songs];

    /*
     * Fisher-Yates Shuffle
     *
     * 배열 뒤쪽부터 하나씩 확인하면서
     * 앞쪽의 무작위 위치와 값을 교환한다.
     *
     * 원본 데이터는 유지하면서
     * 이번 게임의 문제 순서만 랜덤으로 만든다.
     *
     * 배열 자체에 같은 곡이 한 번씩만 존재하므로
     * 한 게임에서 같은 노래가 중복 출제되지 않는다.
     */
    for (let i = shuffledSongs.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(
        Math.random() * (i + 1)
      );

      [shuffledSongs[i], shuffledSongs[randomIndex]] = [
        shuffledSongs[randomIndex],
        shuffledSongs[i],
      ];
    }

    /*
     * 랜덤으로 정해진 순서를
     * 이번 게임 문제 목록으로 저장한다.
     */
    setGameSongs(shuffledSongs);

    // 게임 상태 초기화
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

    /*
     * setGameSongs()는 React 상태 업데이트이기 때문에
     * 바로 gameSongs[0]을 읽으면 이전 값이 사용될 수 있다.
     *
     * 따라서 방금 만든 shuffledSongs의 첫 번째 곡을
     * 직접 재생한다.
     */
    playMusic(shuffledSongs[0]);
  };

  // ========================================================
  // 게임 종료
  // ========================================================

  const finishGame = () => {
    stopMusic();

    setResultType(null);
    setIsStarted(false);
    setIsGameOver(true);

    /*
     * 현재 점수가 기존 최고 점수보다 높으면
     * 새로운 최고 점수로 저장한다.
     */
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

  // ========================================================
  // 다음 문제
  // ========================================================

  const goToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;

    /*
     * 다음 index가 문제 개수 이상이라면
     * 모든 문제를 푼 것이므로 게임을 종료한다.
     */
    if (nextIndex >= gameSongs.length) {
      finishGame();
      return;
    }

    // 이전 결과와 입력값 초기화
    setResultType(null);
    setAnswer("");

    // 다음 문제로 이동
    setCurrentQuestionIndex(nextIndex);
    setTimeLeft(5);

    // 다음 문제의 음악 재생
    playMusic(gameSongs[nextIndex]);
  };

  // ========================================================
  // 시간 초과
  // ========================================================

  const handleTimeout = () => {
    stopMusic();

    setLives((prev) => {
      const nextLives = prev - 1;

      /*
       * 마지막 목숨까지 소진했다면
       * 즉시 게임을 종료한다.
       */
      if (nextLives <= 0) {
        finishGame();
        return 0;
      }

      return nextLives;
    });

    /*
     * 목숨이 남아 있다면
     * 시간초과 결과 화면을 표시한다.
     */
    if (lives > 1) {
      setResultType("timeout");
    }
  };

  // ========================================================
  // 타이머
  // ========================================================

  useEffect(() => {
    /*
     * 게임 시작 전,
     * 게임오버 상태,
     * 결과 화면이 표시되는 동안에는
     * 타이머를 진행하지 않는다.
     */
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

  // ========================================================
  // 시간 초과 감지
  // ========================================================

  useEffect(() => {
    /*
     * timeLeft가 실제로 0이 되었을 때만
     * 시간초과 처리를 실행한다.
     */
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

  // ========================================================
  // 페이지를 벗어날 때 음악 정리
  // ========================================================

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  // ========================================================
  // 정답 제출
  // ========================================================

  const handleSubmit = () => {
    /*
     * 다음 상황에서는 정답 처리를 하지 않는다.
     *
     * - 입력값 없음
     * - 게임 시작 전
     * - 게임오버
     * - 이미 결과 화면 표시 중
     * - 현재 문제가 존재하지 않음
     */
    if (
      !answer.trim() ||
      !isStarted ||
      isGameOver ||
      resultType !== null ||
      !currentSong
    ) {
      return;
    }

    const userAnswer = answer.trim();

    // ======================================================
    // 정답
    // ======================================================

    if (userAnswer === currentSong.title) {
      /*
       * 기본 점수 + 남은 시간 보너스.
       *
       * 현재 테스트 시간은 5초이므로
       * timeLeft * 10만큼 보너스를 준다.
       */
      const baseScore = 100;
      const timeBonus = timeLeft * 10;
      const earnedScore = baseScore + timeBonus;

      setScore((prev) => prev + earnedScore);
      setCombo((prev) => prev + 1);

      // 맞힌 문제 수 증가
      setCorrectCount((prev) => prev + 1);

      // 정답 결과 화면 표시
      setResultType("correct");

      stopMusic();
    }

    // ======================================================
    // 오답
    // ======================================================

    else {
      /*
       * 현재 게임 규칙에서는 오답 시
       * 목숨을 차감하지 않는다.
       *
       * 오답 화면만 표시하고
       * 사용자가 다시 입력할 수 있게 한다.
       */
      setResultType("wrong");
    }

    setAnswer("");
  };

  // ========================================================
  // 다시 도전
  // ========================================================

  const handleRetry = () => {
    /*
     * 다시 시작하면 handleStartGame에서
     * songs를 다시 랜덤으로 섞기 때문에
     * 이전 게임과 다른 순서가 만들어질 수 있다.
     */
    handleStartGame();
  };

  // ========================================================
  // 게임 종료 후 모드 선택 화면으로 이동
  // ========================================================

  const handleExit = () => {
    stopMusic();

    router.push("/game/mode");
  };

  // ========================================================
  // 노래 데이터 로딩 화면
  // ========================================================

  if (isLoadingSongs) {
    return (
      <>
        <GameHeader />

        <main className={styles.playPage}>
          <p>노래 데이터를 불러오는 중입니다...</p>
        </main>
      </>
    );
  }

  // ========================================================
  // 해당 모드에 등록된 노래가 없는 경우
  // ========================================================

  /*
   * 여기서는 gameSongs가 아니라 songs를 검사해야 한다.
   *
   * gameSongs는 START를 누르기 전에는 원래 빈 배열이기 때문이다.
   *
   * songs가 비어 있다는 것은
   * 백엔드에서 해당 장르의 노래를 받지 못했다는 뜻이다.
   */
  if (songs.length === 0) {
    return (
      <>
        <GameHeader />

        <main className={styles.playPage}>
          <p>현재 이 모드에 등록된 노래가 없습니다.</p>

          <button onClick={() => router.push("/game/mode")}>
            모드 선택으로 돌아가기
          </button>
        </main>
      </>
    );
  }

  // ========================================================
  // 게임오버 화면
  // ========================================================

  if (isGameOver) {
    return (
      <GameOver
        mode={mode}
        correctCount={correctCount}
        totalQuestions={gameSongs.length}
        score={score}
        bestScore={Math.max(score, bestScore)}
        grade="-"
        isNewRecord={isNewRecord}
        onRetry={handleRetry}
        onExit={handleExit}
      />
    );
  }

  // ========================================================
  // 게임 플레이 화면
  // ========================================================

  return (
    <>
      <GameHeader />

      <main className={styles.playPage}>

        {/* ==============================
            게임 HUD
        ============================== */}
        <section className={styles.gameHud}>

          {/* 모드 / 문제 번호 */}
          <div className={styles.modeInfo}>
            <span className={styles.modeName}>
              {mode}
            </span>

            <span className={styles.question}>
              QUESTION{" "}
              {isStarted ? currentQuestionIndex + 1 : 0} /{" "}
              {isStarted ? gameSongs.length : songs.length}
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

        {/* ==============================
            음악 비주얼 영역
        ============================== */}
        <section className={styles.visualArea}>

          {/* 왼쪽 Waveform */}
          <div
            className={`${styles.waveform} ${styles.waveformLeft}`}
          >
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
          <div
            className={`${styles.waveform} ${styles.waveformRight}`}
          >
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

        {/* ==============================
            게임 시작 영역
        ==============================

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

        {/* ==============================
            정답 결과
        ============================== */}
        {resultType === "correct" && currentSong && (
          <CorrectResult
            score={score}
            songTitle={currentSong.title}
            onNext={goToNextQuestion}
          />
        )}

        {/* ==============================
            오답 결과
        ============================== */}
        {resultType === "wrong" && (
          <WrongResult
            onClose={() => setResultType(null)}
          />
        )}

        {/* ==============================
            시간초과 결과
        ============================== */}
        {resultType === "timeout" && currentSong && (
          <TimeoutResult
            songTitle={currentSong.title}
            onNext={goToNextQuestion}
          />
        )}

        {/* ==============================
            정답 입력
        ============================== */}
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
            disabled={
              !isStarted ||
              isGameOver ||
              resultType !== null ||
              !currentSong
            }
          />

          <p className={styles.answerGuide}>
            정확한 노래 제목을 입력해야 정답으로 인정됩니다.
          </p>

          {/* 개발 중에만 사용하는 테스트용 정답 */}
          {isStarted && currentSong && (
            <p>
              테스트 정답: {currentSong.title}
            </p>
          )}

        </section>

      </main>
    </>
  );
}