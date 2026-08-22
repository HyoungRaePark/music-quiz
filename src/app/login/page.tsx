"use client";

import { useRouter } from "next/navigation";

import styles from "@/styles/Login.module.scss";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className={styles.loginPage}>
      {/* ========================================
          로그인 페이지 상단 Header

          로그인 화면에서는 Sidebar를 사용하지 않고
          상단 메뉴를 사용한다.
      ======================================== */}
      <header className={styles.loginHeader}>
        {/* 로고 */}
        <button
          type="button"
          className={styles.logoArea}
          onClick={() => router.push("/")}
        >
          <div className={styles.logoTitle}>
            <span>♫</span>
            <span>SONG QUIZ</span>
          </div>

          <span className={styles.logoSubtitle}>
            MUSIC IS THE ANSWER
          </span>
        </button>

        {/* 메인 메뉴 */}
        <nav className={styles.nav}>
          <button
            type="button"
            onClick={() => router.push("/game/mode")}
          >
            GAME
          </button>

          <button
            type="button"
            onClick={() => router.push("/game/ranking")}
          >
            RANKING
          </button>

          <button
            type="button"
            onClick={() => router.push("/game/board")}
          >
            BOARD
          </button>
        </nav>

        {/* 홈으로 */}
        <button
          type="button"
          className={styles.homeButton}
          onClick={() => router.push("/")}
        >
          ⌂ 홈으로
        </button>
      </header>

      {/* ========================================
          로그인 메인 영역
      ======================================== */}
      <main className={styles.loginContainer}>
        {/* 페이지 제목 */}
        <div className={styles.loginTitle}>
          <h1>LOGIN</h1>

          <p>
            계정으로 로그인하여 더 많은 기능을 이용해보세요!
          </p>
        </div>

        {/* ======================================
            로그인 카드
        ====================================== */}
        <section className={styles.loginCard}>
          {/* 아이디 */}
          <div className={styles.formGroup}>
            <label htmlFor="userId">
              아이디
            </label>

            <input
              id="userId"
              type="text"
              placeholder="아이디를 입력하세요"
            />
          </div>

          {/* 비밀번호 */}
          <div className={styles.formGroup}>
            <label htmlFor="password">
              비밀번호
            </label>

            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {/* 아이디 저장 / 비밀번호 찾기 */}
          <div className={styles.loginOptions}>
            <label className={styles.saveId}>
              <input type="checkbox" />
              <span>아이디 저장</span>
            </label>

            <button
              type="button"
              className={styles.findPassword}
            >
              비밀번호 찾기 ›
            </button>
          </div>

          {/* 로그인 */}
          <button
            type="button"
            className={styles.loginButton}
          >
            로그인
          </button>

          {/* 또는 */}
          <div className={styles.divider}>
            <span />
            <p>또는</p>
            <span />
          </div>

          {/* 회원가입 */}
          <button
            type="button"
            className={styles.signupButton}
            onClick={() => router.push("/signup")}
          >
            회원가입
          </button>
        </section>

        {/* 하단 안내 */}
        <p className={styles.loginGuide}>
          로그인하면 <strong>SONG QUIZ</strong>의 모든 서비스를
          이용하실 수 있습니다.
        </p>
      </main>
    </div>
  );
}