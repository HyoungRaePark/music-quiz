"use client";

/*
 * 게임이 종료되었을 때 표시되는 최종 결과 화면입니다.
 *
 * 플레이 중 표시되는 결과 화면과 달리
 * 게임 전체 결과와 개인 최고 기록을 보여줍니다.
 */

import styles from "@/styles/GameOver.module.scss";

type GameOverProps = {
  mode: string;
  correctCount: number;
  totalQuestions: number;
  score: number;
  bestScore: number;
  grade: string;
  isNewRecord: boolean;
  onRetry: () => void;
  onExit: () => void;
};

export default function GameOver({
  mode,
  correctCount,
  totalQuestions,
  score,
  bestScore,
  grade,
  isNewRecord,
  onRetry,
  onExit,
}: GameOverProps) {
  return (
    <main className={styles.gameOver}>

      {/* 게임 종료 제목 */}
      <section className={styles.titleArea}>
        <div className={styles.crown}>♛</div>

        <h1>GAME OVER</h1>

        <p>
          수고했어! 다음엔 더 높은 점수에 도전해보자!
        </p>
      </section>

      {/* 게임 결과 */}
      <section className={styles.resultArea}>

        {/* 왼쪽 게임 결과 */}
        <div className={styles.resultPanel}>

          <h2>
            <span>♫</span>
            {mode} MODE
          </h2>

          <div className={styles.resultRow}>
            <div className={styles.resultLabel}>
              <span className={styles.resultIcon}>◎</span>
              <span>맞힌 문제 수</span>
            </div>

            <strong>
              <em>{correctCount}</em> / {totalQuestions}
            </strong>
          </div>

          <div className={styles.resultRow}>
            <div className={styles.resultLabel}>
              <span className={styles.resultIcon}>♜</span>
              <span>최종 SCORE</span>
            </div>

            <strong className={styles.highlightScore}>
              {score.toLocaleString()}
            </strong>
          </div>

          <div className={styles.resultRow}>
            <div className={styles.resultLabel}>
              <span className={styles.resultIcon}>♕</span>
              <span>개인 BEST SCORE</span>
            </div>

            <strong>
              {bestScore.toLocaleString()}
            </strong>
          </div>

          <div className={styles.resultRow}>
            <div className={styles.resultLabel}>
              <span className={styles.resultIcon}>☆</span>
              <span>등급</span>
            </div>

            <strong className={styles.grade}>
              {grade}
            </strong>
          </div>

        </div>

        {/* 오른쪽 최고 기록 */}
        <div className={styles.recordPanel}>

          {isNewRecord ? (
            <>
              <div className={styles.recordBadge}>
                NEW RECORD!
              </div>

              <h2>신기록 달성!</h2>

              <p>BEST SCORE를 갱신했어!</p>

              <strong className={styles.recordScore}>
                {score.toLocaleString()}
              </strong>
            </>
          ) : (
            <>
              <div className={styles.recordBadge}>
                BEST SCORE
              </div>

              <h2>최고 기록</h2>

              <p>현재 개인 최고 점수</p>

              <strong className={styles.recordScore}>
                {bestScore.toLocaleString()}
              </strong>
            </>
          )}

        </div>

      </section>

      {/* 하단 버튼 */}
      <section className={styles.buttonArea}>

        <button
          type="button"
          className={styles.retryButton}
          onClick={onRetry}
        >
          <span className={styles.buttonIcon}>↻</span>

          <div>
            <strong>다시 도전</strong>
            <small>같은 모드로 다시 시작</small>
          </div>
        </button>

        <button
          type="button"
          className={styles.exitButton}
          onClick={onExit}
        >
          <span className={styles.buttonIcon}>⌂</span>

          <div>
            <strong>나가기</strong>
            <small>메인 화면으로 이동</small>
          </div>
        </button>

      </section>

      {/* 하단 TIP */}
      <p className={styles.tip}>
        <span>ⓘ</span>
        빠를수록 더 높은 점수를 얻을 수 있어! 다음엔 더 빠르게 맞혀보자!
      </p>

    </main>
  );
}