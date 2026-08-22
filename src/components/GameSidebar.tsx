"use client";

import { usePathname, useRouter } from "next/navigation";

import styles from "@/styles/GameSidebar.module.scss";
import { useBgm } from "@/components/BgmProvider";

export default function GameSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isPlaying, toggleBgm } = useBgm();

  /*
    현재는 실제 로그인 기능이 아직 없기 때문에
    임시 값으로 테스트한다.

    false = 게스트
    true  = 로그인한 회원

    추후 로그인 Context 또는 전역 상태로 교체한다.
  */
  const isLoggedIn = false;

  return (
    <aside className={styles.sidebar}>
      {/* =========================
          로고 영역
      ========================== */}
      <button
        className={styles.logoArea}
        type="button"
        onClick={() => router.push("/")}
      >
        <div className={styles.logoTitle}>
          <span className={styles.logoIcon}>♫</span>

          <span>SONG QUIZ</span>
        </div>

        <span className={styles.logoSubtitle}>
          MUSIC IS THE ANSWER
        </span>
      </button>

      {/* =========================
          메인 메뉴
      ========================== */}
      <nav className={styles.menu}>
        {/* 게임 시작 */}
        <button
        type="button"
        className={`${styles.gameStartButton} ${
            pathname === "/game/mode" ? styles.gameStartActive : ""
        }`}
        onClick={() => router.push("/game/mode")}
        >
        <span className={styles.menuIcon}>⌂</span>
        <span>GAME START</span>
        </button>

        {/* 랭킹 */}
        <button
          type="button"
          className={
            pathname === "/game/ranking"
              ? styles.active
              : ""
          }
          onClick={() =>
            router.push("/game/ranking")
          }
        >
          <span className={styles.menuIcon}>
            ♛
          </span>

          <span>RANKING</span>
        </button>

        {/* 게시판 */}
        <button
          type="button"
          className={
            pathname === "/game/board"
              ? styles.active
              : ""
          }
          onClick={() =>
            router.push("/game/board")
          }
        >
          <span className={styles.menuIcon}>
            ▣
          </span>

          <span>BOARD</span>
        </button>

        {/* 로그인한 회원에게만 MY PAGE 표시 */}
        {isLoggedIn && (
          <button
            type="button"
            className={
              pathname === "/game/mypage"
                ? styles.active
                : ""
            }
            onClick={() =>
              router.push("/game/mypage")
            }
          >
            <span className={styles.menuIcon}>
              ♙
            </span>

            <span>MY PAGE</span>
          </button>
        )}
      </nav>

      {/* =========================
          로그인 / 로그아웃 영역
      ========================== */}
      <div className={styles.accountArea}>
        {isLoggedIn ? (
          <button
            type="button"
            className={styles.accountButton}
          >
            <span className={styles.menuIcon}>
              ↪
            </span>

            <span>LOGOUT</span>
          </button>
        ) : (
          <button
            type="button"
            className={styles.accountButton}
          >
            <span className={styles.menuIcon}>
              ↪
            </span>

            <span>LOGIN</span>
          </button>
        )}
      </div>

      {/* =========================
          BGM 영역
          실제 BgmProvider 연결은 다음 단계
      ========================== */}
        <div
        className={`${styles.bgmArea} ${
            isPlaying ? styles.bgmAreaOn : ""
        }`}
        >
        <span className={styles.bgmLabel}>
            BGM
        </span>

        <button
            type="button"
            className={`${styles.bgmToggle} ${
            isPlaying ? styles.bgmOn : styles.bgmOff
            }`}
            onClick={toggleBgm}
        >
            {isPlaying ? "ON" : "OFF"}
        </button>
        </div>
    </aside>
  );
}