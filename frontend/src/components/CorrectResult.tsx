// 정답 입력 시 현재 게임 화면 위에 표시되는 정답 결과 화면
// 획득 점수와 곡 정보를 보여주며 다음 문제로 이동할 수 있습니다.

"use client";

import styles from "../styles/CorrectResult.module.scss";

type CorrectResultProps = {
  score: number;
  songTitle: string;
  onNext: () => void;
};

export default function CorrectResult({
  score,
  songTitle,
  onNext,
}: CorrectResultProps) {
  return (
    <div className={styles.result}>
      <div className={styles.icon}>♪</div>

      <h2>정답!</h2>

      <div className={styles.score}>
        +{score} <span>POINT</span>
      </div>

      <div className={styles.songTitle}>
        {songTitle}
      </div>

      <div className={styles.bonus}>
        <div>
          <span>기본 점수</span>
          <strong>+100</strong>
        </div>

        <div>
          <span>시간 보너스</span>
          <strong>+0</strong>
        </div>

        <div>
          <span>콤보 보너스</span>
          <strong>+0</strong>
        </div>
      </div>

      <button
        type="button"
        className={styles.nextButton}
        onClick={onNext}
      >
        다음 문제로
        <span>→</span>
      </button>
    </div>
  );
}