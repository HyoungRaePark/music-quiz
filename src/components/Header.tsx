"use client";

import { useBgm } from "@/components/BgmProvider";
import styles from "@/styles/Header.module.scss";

export default function Header() {
  const { isPlaying, toggleBgm } = useBgm();

  return (
    <header className={styles.header}>
      <button
        className={styles.bgmButton}
        onClick={toggleBgm}
      >
        {isPlaying ? "🔊 BGM ON" : "🔇 BGM OFF"}
      </button>

      <nav className={styles.nav}>
        <button>RANKING</button>
        <button>BOARD</button>
        <button>LOGIN</button>
      </nav>
    </header>
  );
}