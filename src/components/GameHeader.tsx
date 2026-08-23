"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "@/styles/GameHeader.module.scss";

export default function GameHeader() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      {/* ========================================
          SONG QUIZ 로고

          클릭하면 메인 페이지로 이동
      ======================================== */}
      <button
        type="button"
        className={styles.logoArea}
        onClick={() => router.push("/")}
      >
        {/* 로고 이퀄라이저 */}
        <div className={styles.equalizer}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* SONG QUIZ */}
        <div className={styles.logo}>
          <span className={styles.songText}>
            SONG
          </span>

          <span className={styles.quizText}>
            QUIZ
          </span>
        </div>
      </button>

      {/* ========================================
          네비게이션
      ======================================== */}
      <nav className={styles.nav}>
        <button
          type="button"
          onClick={() =>
            router.push("/game/mode")
          }
        >
          GAME
        </button>

        <button
          type="button"
          onClick={() =>
            router.push("/game/ranking")
          }
        >
          RANKING
        </button>

        <button
          type="button"
          onClick={() =>
            router.push("/game/board")
          }
        >
          BOARD
        </button>
      </nav>

      {/* ========================================
          게스트 사용자 영역

          현재는 로그인 기능 연결 전이므로
          클릭하면 로그인 페이지로 이동
      ======================================== */}
      <button
        type="button"
        className={styles.userArea}
        onClick={() => router.push("/login")}
      >
        <Image
          src="/images/mode-mascot.png"
          alt="프로필"
          width={32}
          height={32}
          className={styles.userAvatar}
        />

        <span>Guest</span>

        <span className={styles.userArrow}>
          ›
        </span>
      </button>
    </header>
  );
}