// 시간 초과 시 현재 게임 화면 위에 표시되는 시간 초과 결과 화면
"use client";

import styles from "../styles/TimeoutResult.module.scss";

type TimeoutResultProps = {
  songTitle: string;
  onNext: () => void;
};

export default function TimeoutResult({
  songTitle,
  onNext,
}: TimeoutResultProps) {
  return (
    <div className={styles.result}>
      <div className={styles.icon}>⌛</div>

      <h2>시간 초과!</h2>

      <p>목숨 -1</p>

      <div className={styles.answer}>
        정답: {songTitle}
      </div>

      <button
        type="button"
        onClick={onNext}
      >
        다음 문제로 →
      </button>
    </div>
  );
}