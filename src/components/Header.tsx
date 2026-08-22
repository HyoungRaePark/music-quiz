"use client";

import Link from "next/link";

import { useBgm } from "@/components/BgmProvider";
import styles from "@/styles/Header.module.scss";

export default function Header() {
  const { isPlaying, toggleBgm } = useBgm();

  return (
    <header className={styles.header}>
      {/* BGM ON / OFF */}
      <button
        type="button"
        className={styles.bgmButton}
        onClick={toggleBgm}
      >
        {isPlaying ? "🔊 BGM ON" : "🔇 BGM OFF"}
      </button>

      {/* 헤더 메뉴 */}
      <nav className={styles.nav}>
        {/* 랭킹 페이지 */}
        <Link href="/game/ranking">
          RANKING
        </Link>

        {/* 게시판 페이지 */}
        <Link href="/game/board">
          BOARD
        </Link>

        {/* 로그인 페이지 */}
        <Link href="/login">
          LOGIN
        </Link>
      </nav>
    </header>
  );
}