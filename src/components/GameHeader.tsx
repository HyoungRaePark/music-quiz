"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "@/styles/GameHeader.module.scss";

export default function GameHeader() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <div className={styles.equalizer}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={styles.logo}>
          <span className={styles.songText}>SONG</span>
          <span className={styles.quizText}>QUIZ</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <button onClick={() => router.push("/game/mode")}>
          GAME
        </button>

        <button onClick={() => router.push("/game/ranking")}>
          RANKING
        </button>

        <button onClick={() => router.push("/game/board")}>
          BOARD
        </button>
      </nav>

      <div className={styles.userArea}>
        <Image
          src="/images/mode-mascot.png"
          alt="프로필"
          width={32}
          height={32}
          className={styles.userAvatar}
        />

        <span>Guest</span>

        <button>⚙</button>
      </div>
    </header>
  );
}