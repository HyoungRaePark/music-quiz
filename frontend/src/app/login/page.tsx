"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "@/styles/Login.module.scss";

import GameHeader from "@/components/GameHeader";

export default function LoginPage() {
  const router = useRouter();

    // 사용자가 입력한 아이디
  const [userId, setUserId] = useState("");

  // 사용자가 입력한 비밀번호
  const [password, setPassword] = useState("");

  // 로그인 버튼 클릭 시 입력값 검사
  const handleLogin = () => {
    // 아이디 검사
    if (!userId.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }

    // 비밀번호 검사
    if (!password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    // 아이디 저장 처리
    if (saveId) {
      localStorage.setItem(
        "savedUserId",
        userId.trim()
      );
    } else {
      localStorage.removeItem("savedUserId");
    }

    /*
      실제 로그인 API는 추후 연결한다.
    */
    console.log("로그인 시도:", {
      userId,
      password,
    });

    alert("로그인 준비 완료!");
  };
// 비밀번호 표시 여부
// false = ●●●● 형태로 숨김
// true = 실제 비밀번호 표시
const [showPassword, setShowPassword] = useState(false);

// 아이디 저장 체크 여부
const [saveId, setSaveId] = useState(false);


/* ==================================================
   저장된 아이디 불러오기

   로그인 페이지에 처음 들어왔을 때
   localStorage에 저장된 아이디가 있으면
   입력창에 자동으로 표시한다.
================================================== */

useEffect(() => {
  const savedUserId = localStorage.getItem("savedUserId");

  if (savedUserId) {
    setUserId(savedUserId);
    setSaveId(true);
  }
}, []);


  return (
    <div className={styles.loginPage}>
      {/* ========================================
          로그인 페이지 상단 Header

          로그인 화면에서는 Sidebar를 사용하지 않고
          상단 메뉴를 사용한다.
      ======================================== */}
      
      <GameHeader />

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

            // 현재 입력된 아이디
            value={userId}

            // 입력할 때마다 상태에 저장
            onChange={(e) => setUserId(e.target.value)}
          />
          </div>

          {/* ======================================
              비밀번호
          ====================================== */}
          <div className={styles.formGroup}>
            <label htmlFor="password">
              비밀번호
            </label>

            {/* 비밀번호 input과 보기 버튼을 묶는 영역 */}
            <div className={styles.passwordInputArea}>
              <input
                id="password"

                // 비밀번호 보기 상태에 따라
                // text / password 타입을 변경한다.
                type={showPassword ? "text" : "password"}

                placeholder="비밀번호를 입력하세요"

                value={password}

                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              {/* 비밀번호 보기 / 숨기기 */}
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                aria-label={
                  showPassword
                    ? "비밀번호 숨기기"
                    : "비밀번호 보기"
                }
              >
                {showPassword ? "◉" : "⊘"}
              </button>
            </div>
          </div>

          {/* 아이디 저장 / 비밀번호 찾기 */}
          <div className={styles.loginOptions}>
            <label className={styles.saveId}>
              <input
                type="checkbox"

                // 현재 아이디 저장 여부
                checked={saveId}

                // 체크 상태 변경
                onChange={(e) =>
                  setSaveId(e.target.checked)
                }
              />

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

            // 로그인 입력값 검사
            onClick={handleLogin}
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
          로그인하면{" "}
          <strong className={styles.song}>SONG</strong>{" "}
          <strong className={styles.quiz}>QUIZ</strong>
          의 모든 서비스를 이용하실 수 있습니다.
        </p>
      </main>
    </div>
  );
}