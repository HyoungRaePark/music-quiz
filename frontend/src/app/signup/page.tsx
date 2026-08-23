"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import GameHeader from "@/components/GameHeader";
import styles from "@/styles/Signup.module.scss";

export default function SignupPage() {
  const router = useRouter();

  /* ==================================================
     회원가입 입력값
  ================================================== */

  // 아이디
  const [userId, setUserId] = useState("");

  // 닉네임
  const [nickname, setNickname] = useState("");

  // 이메일 - 선택 입력
  const [email, setEmail] = useState("");

  // 비밀번호
  const [password, setPassword] = useState("");

  // 비밀번호 확인
  const [passwordCheck, setPasswordCheck] = useState("");


  /* ==================================================
     비밀번호 표시 상태
  ================================================== */

  // 비밀번호 표시 여부
  const [showPassword, setShowPassword] =
    useState(false);

  // 비밀번호 확인 표시 여부
  const [showPasswordCheck, setShowPasswordCheck] =
    useState(false);


  /* ==================================================
     중복확인 상태
  ================================================== */

  // 아이디 중복확인 완료 여부
  const [isIdChecked, setIsIdChecked] =
    useState(false);

  // 닉네임 중복확인 완료 여부
  const [isNicknameChecked, setIsNicknameChecked] =
    useState(false);


  /* ==================================================
     아이디 중복확인

     아직 DB 연결 전이므로
     입력 여부만 확인한 뒤 사용 가능으로 처리한다.
  ================================================== */

  const handleIdCheck = () => {
    if (!userId.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }

    /*
      추후 백엔드 API에서
      실제 아이디 중복 여부를 확인한다.
    */
    alert("사용 가능한 아이디입니다.");

    setIsIdChecked(true);
  };


  /* ==================================================
     닉네임 중복확인
  ================================================== */

  const handleNicknameCheck = () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    /*
      추후 백엔드 API에서
      실제 닉네임 중복 여부를 확인한다.
    */
    alert("사용 가능한 닉네임입니다.");

    setIsNicknameChecked(true);
  };


  /* ==================================================
     회원가입 처리

     현재는 백엔드 연결 전이므로
     프론트에서 입력값 검증만 진행한다.
  ================================================== */

  const handleSignup = () => {
    // 아이디 검사
    if (!userId.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }

    // 아이디 중복확인 검사
    if (!isIdChecked) {
      alert("아이디 중복확인을 해주세요.");
      return;
    }

    // 닉네임 검사
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    // 닉네임 중복확인 검사
    if (!isNicknameChecked) {
      alert("닉네임 중복확인을 해주세요.");
      return;
    }

    // 이메일은 선택 항목이므로
    // 입력한 경우에만 형식을 검사한다.
    if (email.trim()) {
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email.trim())) {
        alert("이메일 형식을 확인해주세요.");
        return;
      }
    }

    // 비밀번호 검사
    if (!password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    /*
      비밀번호 규칙
      최소 8자 + 영문 + 숫자 포함
    */
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!passwordPattern.test(password)) {
      alert(
        "비밀번호는 8자 이상이며 영문과 숫자를 포함해야 합니다."
      );
      return;
    }

    // 비밀번호 확인 입력 검사
    if (!passwordCheck.trim()) {
      alert("비밀번호를 다시 입력해주세요.");
      return;
    }

    // 비밀번호 일치 검사
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    /*
      실제 회원가입 API는 추후 연결한다.
      현재는 콘솔에서 데이터 형태만 확인한다.
    */
    console.log("회원가입 정보:", {
      userId: userId.trim(),
      nickname: nickname.trim(),
      email: email.trim(),
      password,
    });

    /*
      현재는 API 연결 전이므로
      검증이 모두 통과하면 임시 성공 처리
    */
    alert("회원가입이 완료되었습니다.");

    // 회원가입 완료 후 로그인 페이지로 이동
    router.push("/login");
  };


  return (
    <div className={styles.signupPage}>
      {/* ========================================
          공통 Header
      ======================================== */}
      <GameHeader />


      {/* ========================================
          회원가입 메인 영역
      ======================================== */}
      <main className={styles.signupContainer}>

        {/* ======================================
            페이지 제목
        ====================================== */}
        <div className={styles.signupTitle}>
          <h1>SIGN UP</h1>

          <p>
            SONG QUIZ와 함께 음악 퀴즈를 즐겨보세요!
          </p>
        </div>


        {/* ======================================
            회원가입 카드
        ====================================== */}
        <section className={styles.signupCard}>

          {/* ====================================
              아이디
          ==================================== */}
          <div className={styles.formGroup}>
            <label htmlFor="userId">
              아이디
            </label>

            <div className={styles.checkInputArea}>
              <input
                id="userId"
                type="text"
                placeholder="아이디를 입력하세요"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);

                  /*
                    중복확인 이후 아이디를 수정하면
                    다시 확인하도록 초기화한다.
                  */
                  setIsIdChecked(false);
                }}
              />

              <button
                type="button"
                className={styles.checkButton}
                onClick={handleIdCheck}
              >
                중복확인
              </button>
            </div>

            {/* 중복확인 완료 안내 */}
            {isIdChecked && (
              <span className={styles.checkMessage}>
                사용 가능한 아이디입니다.
              </span>
            )}
          </div>


          {/* ====================================
              닉네임
          ==================================== */}
          <div className={styles.formGroup}>
            <label htmlFor="nickname">
              닉네임
            </label>

            <div className={styles.checkInputArea}>
              <input
                id="nickname"
                type="text"
                placeholder="닉네임을 입력하세요"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);

                  /*
                    중복확인 이후 닉네임을 수정하면
                    다시 확인하도록 초기화한다.
                  */
                  setIsNicknameChecked(false);
                }}
              />

              <button
                type="button"
                className={styles.checkButton}
                onClick={handleNicknameCheck}
              >
                중복확인
              </button>
            </div>

            {/* 중복확인 완료 안내 */}
            {isNicknameChecked && (
              <span className={styles.checkMessage}>
                사용 가능한 닉네임입니다.
              </span>
            )}
          </div>


          {/* ====================================
              이메일

              선택 입력 항목
          ==================================== */}
          <div className={styles.formGroup}>
            <label htmlFor="email">
              이메일{" "}
              <span className={styles.optional}>
                (선택)
              </span>
            </label>

            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>


          {/* ====================================
              비밀번호
          ==================================== */}
          <div className={styles.formGroup}>
            <label htmlFor="password">
              비밀번호
            </label>

            {/* input + 보기/숨기기 버튼 */}
            <div className={styles.passwordInputArea}>
              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
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

            {/* 비밀번호 작성 규칙 */}
            <span className={styles.passwordGuide}>
              8자 이상, 영문과 숫자를 포함해주세요.
            </span>
          </div>


          {/* ====================================
              비밀번호 확인
          ==================================== */}
          <div className={styles.formGroup}>
            <label htmlFor="passwordCheck">
              비밀번호 확인
            </label>

            <div className={styles.passwordInputArea}>
              <input
                id="passwordCheck"
                type={
                  showPasswordCheck
                    ? "text"
                    : "password"
                }
                placeholder="비밀번호를 다시 입력하세요"
                value={passwordCheck}
                onChange={(e) =>
                  setPasswordCheck(
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() =>
                  setShowPasswordCheck(
                    (prev) => !prev
                  )
                }
                aria-label={
                  showPasswordCheck
                    ? "비밀번호 숨기기"
                    : "비밀번호 보기"
                }
              >
                {showPasswordCheck ? "◉" : "⊘"}
              </button>
            </div>
          </div>


          {/* ====================================
              회원가입 버튼
          ==================================== */}
          <button
            type="button"
            className={styles.signupButton}
            onClick={handleSignup}
          >
            회원가입
          </button>


          {/* ====================================
              로그인 페이지 이동
          ==================================== */}
          <div className={styles.loginGuide}>
            <span>
              이미 계정이 있으신가요?
            </span>

            <button
              type="button"
              onClick={() =>
                router.push("/login")
              }
            >
              로그인
            </button>
          </div>

        </section>
      </main>
    </div>
  );
}