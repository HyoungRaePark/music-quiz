"use client";

/*
 * 사용자가 노래 제목을 틀렸을 때 잠시 표시되는 결과 컴포넌트입니다.
 *
 * 오답을 알려준 뒤 잠시 유지되었다가
 * 사라지면서 다시 노래 제목을 입력할 수 있도록 합니다.
 */

import { useEffect, useState } from "react";
import styles from "@/styles/WrongResult.module.scss";

type WrongResultProps = {
  onClose: () => void;
};

export default function WrongResult({
  onClose,
}: WrongResultProps) {
  // 사라지는 애니메이션을 시작할지 여부
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // 오답 화면을 잠시 보여준 뒤
    // 사라지는 애니메이션 시작
    const closeTimer = setTimeout(() => {
      setIsClosing(true);
    }, 800);

    return () => {
      clearTimeout(closeTimer);
    };
  }, []);

  return (
    <div
      className={`${styles.wrongResult} ${
        isClosing ? styles.closing : ""
      }`}
      onAnimationEnd={() => {
        // 사라지는 애니메이션이 끝나면
        // 부모의 resultType을 null로 변경
        if (isClosing) {
          onClose();
        }
      }}
    >
      <div className={styles.icon}>
        ✕
      </div>

      <strong>오답!</strong>

      <span>
        다시 한번 생각해보세요.
      </span>
    </div>
  );
}