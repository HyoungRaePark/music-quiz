"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import GameSidebar from "@/components/GameSidebar";
import styles from "@/styles/MyPageEdit.module.scss";

export default function MyPageEditPage() {
  const router = useRouter();

  /* ==================================================
     회원정보

     현재는 백엔드 연결 전이므로
     mock 데이터를 사용한다.
  ================================================== */

  const [nickname, setNickname] = useState("형래");
  const [email, setEmail] = useState(
    "qkrgus123@example.com"
  );

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] =
    useState("");

  /* ==================================================
     비밀번호 표시 여부
  ================================================== */

  const [showPassword, setShowPassword] =
    useState(false);

  const [showPasswordCheck, setShowPasswordCheck] =
    useState(false);

  /* ==================================================
     회원정보 저장
  ================================================== */

  const handleSave = () => {
    // 닉네임 검사
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    // 이메일 검사
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      alert("이메일 형식을 확인해주세요.");
      return;
    }

    /*
      새 비밀번호는 선택 입력이다.

      비밀번호를 변경하지 않는 경우
      빈 상태로 저장할 수 있다.
    */
    if (newPassword || newPasswordCheck) {
      const passwordPattern =
        /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

      if (!passwordPattern.test(newPassword)) {
        alert(
          "비밀번호는 8자 이상이며 영문과 숫자를 포함해야 합니다."
        );
        return;
      }

      if (newPassword !== newPasswordCheck) {
        alert("새 비밀번호가 일치하지 않습니다.");
        return;
      }
    }

    /*
      추후 백엔드 회원정보 수정 API에
      전달할 데이터
    */
    const updateData = {
      nickname: nickname.trim(),
      email: email.trim(),
      newPassword:
        newPassword || undefined,
    };

    console.log(
      "회원정보 수정:",
      updateData
    );

    alert("회원정보가 수정되었습니다.");

    router.push("/game/mypage");
  };

  /* ==================================================
     회원 탈퇴

     실제 DB 연결 후에는 바로 삭제하지 않고
     비밀번호 재확인 등의 절차를 추가할 예정
  ================================================== */

  const handleWithdraw = () => {
    const confirmed = window.confirm(
      "정말 회원탈퇴 하시겠습니까?\n탈퇴한 데이터는 복구할 수 없습니다."
    );

    if (!confirmed) {
      return;
    }

    /*
      추후 회원탈퇴 API 연결
    */

    alert("회원탈퇴 기능은 추후 연결됩니다.");
  };

  return (
    <div className={styles.editPage}>
      {/* ========================================
          공통 Sidebar
      ======================================== */}
      <GameSidebar />

      {/* ========================================
          회원정보 수정 메인
      ======================================== */}
      <main className={styles.editContainer}>

        {/* ======================================
            페이지 상단
        ====================================== */}
        <header className={styles.editHeader}>
          <div>
            <h1>회원정보 수정</h1>

            <p>
              회원정보를 확인하고 변경할 수 있습니다. ♫
            </p>
          </div>

          <button
            type="button"
            className={styles.backButton}
            onClick={() =>
              router.push("/game/mypage")
            }
          >
            ↪ 마이페이지로 돌아가기
          </button>
        </header>

        {/* ======================================
            회원정보 카드
        ====================================== */}
        <section className={styles.editCard}>

          {/* ====================================
              프로필
          ==================================== */}
          <div className={styles.profileArea}>
            <div className={styles.profileImage}>
              ♫
            </div>

            <div className={styles.profileInfo}>
              <div className={styles.profileName}>
                <h2>형래</h2>

                <span>Lv.12</span>
              </div>

              <p>음악 퀴즈 마스터</p>
            </div>
          </div>

          <div className={styles.divider} />

          {/* ====================================
              기본 정보
          ==================================== */}
          <div className={styles.settingSection}>
            <h3>
              <span>♙</span>
              기본 정보
            </h3>

            {/* 아이디 */}
            <div className={styles.formRow}>
              <label htmlFor="userId">
                아이디
              </label>

              <input
                id="userId"
                type="text"
                value="qkrgus123"
                disabled
              />

              <p className={styles.inputGuide}>
                🔒 아이디는 변경할 수 없습니다.
              </p>
            </div>

            {/* 닉네임 */}
            <div className={styles.formRow}>
              <label htmlFor="nickname">
                닉네임
              </label>

              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) =>
                  setNickname(e.target.value)
                }
              />

              <span />
            </div>

            {/* 이메일 */}
            <div className={styles.formRow}>
              <label htmlFor="email">
                이메일
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <span />
            </div>
          </div>

          <div className={styles.divider} />

          {/* ====================================
              보안 설정
          ==================================== */}
          <div className={styles.settingSection}>
            <h3>
              <span>♙</span>
              보안 설정
            </h3>

            {/* 새 비밀번호 */}
            <div className={styles.formRow}>
              <label htmlFor="newPassword">
                새 비밀번호
              </label>

              <div
                className={
                  styles.passwordInputArea
                }
              >
                <input
                  id="newPassword"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="변경할 경우에만 입력하세요"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  className={
                    styles.passwordToggle
                  }
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
                  {showPassword
                    ? "◉"
                    : "⊘"}
                </button>
              </div>

              <p className={styles.inputGuide}>
                8자 이상, 영문과 숫자를 포함해주세요.
              </p>
            </div>

            {/* 새 비밀번호 확인 */}
            <div className={styles.formRow}>
              <label htmlFor="newPasswordCheck">
                새 비밀번호 확인
              </label>

              <div
                className={
                  styles.passwordInputArea
                }
              >
                <input
                  id="newPasswordCheck"
                  type={
                    showPasswordCheck
                      ? "text"
                      : "password"
                  }
                  placeholder="새 비밀번호를 다시 입력하세요"
                  value={newPasswordCheck}
                  onChange={(e) =>
                    setNewPasswordCheck(
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  className={
                    styles.passwordToggle
                  }
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
                  {showPasswordCheck
                    ? "◉"
                    : "⊘"}
                </button>
              </div>

              <span />
            </div>
          </div>

          {/* ====================================
              저장 / 취소
          ==================================== */}
          <div className={styles.actionArea}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() =>
                router.push("/game/mypage")
              }
            >
              취소
            </button>

            <button
              type="button"
              className={styles.saveButton}
              onClick={handleSave}
            >
              저장하기
            </button>
          </div>

          {/* ====================================
              회원탈퇴
          ==================================== */}
          <div className={styles.withdrawArea}>
            <div>
              <strong>⚠ 회원 탈퇴</strong>

              <p>
                회원 탈퇴 시 모든 데이터가 삭제되며
                복구할 수 없습니다.
              </p>
            </div>

            <button
              type="button"
              onClick={handleWithdraw}
            >
              회원탈퇴
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}