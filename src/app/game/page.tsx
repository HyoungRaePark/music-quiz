"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/Game.module.scss";

export default function GamePage() {
  const [showMessage, setShowMessage] = useState(true);

  const [selectedGenre, setSelectedGenre] = useState<
    "J-POP" | "K-POP" | "POP" | null
  >(null);

  return (
    <section className={styles.game}>
      {/* 고양이 + 대사창 */}
      <div className={styles.guide}>
        <img
          src="/images/game-mascot.png"
          alt="음악 가이드 캐릭터"
          className={styles.mascot}
        />

        <button
          className={`${styles.guideMessage} ${
            !showMessage ? styles.guideMessageHidden : ""
          }`}
          onClick={() => setShowMessage(false)}
        >
          <p>
            처음 왔구나, 너!
            <br />
            네 취향을 알려주면
            <br />
            딱 맞는 음악을 추천해줄게.
          </p>

          <span className={styles.messageHint}>
            클릭해서 계속
            <span className={styles.clickArrow}>▼</span>
          </span>
        </button>
      </div>

      {/* 취향 선택 영역 */}
        <div
        className={`${styles.preferencePanel} ${
            !showMessage ? styles.preferencePanelVisible : ""
        } ${
            selectedGenre ? styles.preferencePanelSelected : ""
        }`}
        >
        <h1>어떤 음악을 좋아해?</h1>

        <p>평소 즐겨 듣는 분위기를 골라줘!</p>

        <div className={styles.preferenceOptions}>
          {/* J-POP */}
          <button
            className={`${styles.preferenceCard} ${styles.melodyCard}`}
            onClick={() => setSelectedGenre("J-POP")}
          >
            <span className={styles.cardIcon}>♡</span>

            <strong>감성 & 멜로디</strong>

            <p>
              서정적인 멜로디와
              <br />
              감성적인 분위기의 음악
            </p>

            <div className={styles.cardExamples}>
              <span>서정적</span>
              <span>밴드 사운드</span>
              <span>멜로디 중심</span>
            </div>
          </button>

          {/* K-POP */}
          <button
            className={`${styles.preferenceCard} ${styles.energyCard}`}
            onClick={() => setSelectedGenre("K-POP")}
          >
            <span className={styles.cardIcon}>☆</span>

            <strong>신나고 에너지 넘치는</strong>

            <p>
              비트가 강하고
              <br />
              신나는 분위기의 음악
            </p>

            <div className={styles.cardExamples}>
              <span>댄스</span>
              <span>강한 비트</span>
              <span>퍼포먼스</span>
            </div>
          </button>

          {/* POP */}
          <button
            className={`${styles.preferenceCard} ${styles.trendyCard}`}
            onClick={() => setSelectedGenre("POP")}
          >
            <span className={styles.cardIcon}>♫</span>

            <strong>트렌디 & 다양하게</strong>

            <p>
              한 장르에 얽매이지 않고
              <br />
              다양한 스타일의 음악
            </p>

            <div className={styles.cardExamples}>
              <span>R&B</span>
              <span>힙합</span>
              <span>팝</span>
            </div>
          </button>
        </div>

        {/* 추천 결과 */}
        {selectedGenre && (
          <div className={styles.recommendResult}>
            <p>
              음~ 너에게는{" "}
              <strong>{selectedGenre}</strong>이 어울리는구나! ♪
            </p>

            <Link
              href={
                selectedGenre
                  ? `/game/mode?genre=${encodeURIComponent(selectedGenre)}`
                  : "/game/mode"
              }
              className={styles.modeButton}
            >
              모드 선택으로 가기
            </Link>
          </div>
        )}
      </div>

      {/* 상단 버튼 */}
      <div className={styles.gameHeader}>
        <Link href="/" className={styles.backButton}>
          <span className={styles.backArrow}></span>
          <span>뒤로가기</span>
        </Link>

        <button className={styles.skipButton}>
          <span>건너뛰기</span>
          <span className={styles.skipIcon}>≫</span>
        </button>
      </div>
    </section>
  );
}