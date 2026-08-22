"use client";

import { useRef, useState } from "react";

// 공용 게임 사이드바
import GameSidebar from "@/components/GameSidebar";

// 랭킹 페이지 전용 스타일
import styles from "@/styles/Ranking.module.scss";

/*
  현재는 백엔드 / DB 연결 전이므로
  화면 확인용 mock 데이터를 사용한다.

  추후에는 선택된 모드에 따라
  API에서 실제 랭킹 데이터를 받아오게 된다.
*/
const rankingData = {
  "K-POP": [
    { rank: 1, nickname: "KPOPMASTER", score: 13520, correct: 29, date: "2026.08.22 17:32" },
    { rank: 2, nickname: "NewJeans", score: 12140, correct: 27, date: "2026.08.22 16:20" },
    { rank: 3, nickname: "SeoulBeat", score: 10980, correct: 26, date: "2026.08.22 15:14" },
    { rank: 4, nickname: "HypeBoy", score: 9730, correct: 24, date: "2026.08.21 22:40" },
    { rank: 5, nickname: "KMusic", score: 9140, correct: 23, date: "2026.08.21 20:15" },
    { rank: 6, nickname: "IUfan", score: 8650, correct: 22, date: "2026.08.21 18:32" },
    { rank: 7, nickname: "KoreaBeat", score: 8120, correct: 21, date: "2026.08.20 22:11" },
    { rank: 8, nickname: "IdolLove", score: 7680, correct: 20, date: "2026.08.20 19:43" },
    { rank: 9, nickname: "MusicKing", score: 7210, correct: 19, date: "2026.08.19 21:20" },
    { rank: 10, nickname: "KPOPLOVE", score: 6890, correct: 18, date: "2026.08.19 18:10" },
  ],

  "J-POP": [
    { rank: 1, nickname: "MUSICMAN", score: 12840, correct: 28, date: "2026.08.22 13:10" },
    { rank: 2, nickname: "Melody", score: 11320, correct: 26, date: "2026.08.22 12:44" },
    { rank: 3, nickname: "NightStar", score: 10560, correct: 25, date: "2026.08.21 23:05" },
    { rank: 4, nickname: "Yuki", score: 9840, correct: 24, date: "2026.08.21 20:33" },
    { rank: 5, nickname: "Haru", score: 9210, correct: 22, date: "2026.08.21 18:18" },
    { rank: 6, nickname: "MusicLove", score: 8760, correct: 22, date: "2026.08.20 18:42" },
    { rank: 7, nickname: "Rin ♪", score: 8310, correct: 21, date: "2026.08.20 16:07" },
    { rank: 8, nickname: "Luna☆", score: 7920, correct: 20, date: "2026.08.19 21:55" },
    { rank: 9, nickname: "Kana", score: 7410, correct: 19, date: "2026.08.19 19:30" },
    { rank: 10, nickname: "MikuLove", score: 7050, correct: 19, date: "2026.08.19 17:46" },
  ],

  POP: [
    { rank: 1, nickname: "POPSTAR", score: 13100, correct: 29, date: "2026.08.22 18:01" },
    { rank: 2, nickname: "Billboard", score: 11890, correct: 27, date: "2026.08.22 15:44" },
    { rank: 3, nickname: "MoonLight", score: 10720, correct: 25, date: "2026.08.22 14:02" },
    { rank: 4, nickname: "TaylorFan", score: 9610, correct: 24, date: "2026.08.21 23:13" },
    { rank: 5, nickname: "PopMusic", score: 9030, correct: 23, date: "2026.08.21 19:48" },
    { rank: 6, nickname: "StarBoy", score: 8520, correct: 21, date: "2026.08.21 17:21" },
    { rank: 7, nickname: "Radio", score: 8010, correct: 21, date: "2026.08.20 20:10" },
    { rank: 8, nickname: "Weekend", score: 7540, correct: 20, date: "2026.08.20 18:05" },
    { rank: 9, nickname: "PopCat", score: 7100, correct: 19, date: "2026.08.19 20:42" },
    { rank: 10, nickname: "MusicPop", score: 6720, correct: 18, date: "2026.08.19 16:28" },
  ],
   HARD: [
    { rank: 1, nickname: "FINALBOSS", score: 18240, correct: 30, date: "2026.08.22 20:10" },
    { rank: 2, nickname: "ALLROUND", score: 17420, correct: 29, date: "2026.08.22 18:44" },
    { rank: 3, nickname: "MUSICGOD", score: 16880, correct: 28, date: "2026.08.22 17:31" },

    // mock이니까 나머지 4~10위도 나중에 채워도 됨
  ],
};

// ==================================================
// 내 랭킹 mock 데이터
// 추후 로그인 사용자 기록 API로 교체
// ==================================================

const myRankingData = {
  "K-POP": {
    rank: 18,
    nickname: "MUSICMAN",
    score: 6120,
    correct: 17,
    date: "2026.08.22 14:22",
  },

  "J-POP": {
    rank: 23,
    nickname: "MUSICMAN",
    score: 5380,
    correct: 15,
    date: "2026.08.22 14:22",
  },

  POP: {
    rank: 31,
    nickname: "MUSICMAN",
    score: 4210,
    correct: 13,
    date: "2026.08.21 19:40",
  },

  // HARD 모드 내 순위 mock 데이터
  HARD: {
    rank: 42,
    nickname: "MUSICMAN",
    score: 3580,
    correct: 11,
    date: "2026.08.20 21:30",
  },
};

export default function RankingPage() {
    const [selectedMode, setSelectedMode] = useState<
    "K-POP" | "J-POP" | "POP" | "HARD"
    >("J-POP");

    // 현재 선택된 모드의 내 기록
    const myRanking = myRankingData[selectedMode];

    // 내 순위 영역 위치
    const myRankingRef = useRef<HTMLDivElement>(null);

    // 내 순위 강조 애니메이션
    const [highlightMyRank, setHighlightMyRank] = useState(false);

    // 내 순위 보기 버튼
    const handleMyRankClick = () => {
    myRankingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
    });

    setHighlightMyRank(true);

    window.setTimeout(() => {
        setHighlightMyRank(false);
    }, 1200);
    };
  return (
    <main className={styles.rankingPage}>
      {/* 게임 공용 사이드바 */}
      <GameSidebar />

      {/* 랭킹 페이지 전체 콘텐츠 영역 */}
      <section className={styles.rankingContainer}>
        {/* =========================
            상단 제목 영역
        ========================== */}
        <div className={styles.titleArea}>
          <div className={styles.titleText}>
            <h1>RANKING</h1>

            <p>
              모드별 최고 점수를 확인해보세요!
            </p>
          </div>

          {/* 로그인 사용자 전용 기능 예정 */}
            <button
            className={styles.myRankButton}
            type="button"
            onClick={handleMyRankClick}
            >
            ♛ 내 순위 보기
            </button>
        </div>

        {/* =========================
            게임 모드 선택 탭
        ========================== */}
        <div className={styles.modeTabs}>
        <button
            className={`${styles.modeButton} ${styles.kpop} ${
            selectedMode === "K-POP" ? styles.selected : ""
            }`}
            onClick={() => setSelectedMode("K-POP")}
        >
            ♫ K-POP
        </button>

        <button
            className={`${styles.modeButton} ${styles.jpop} ${
            selectedMode === "J-POP" ? styles.selected : ""
            }`}
            onClick={() => setSelectedMode("J-POP")}
        >
            ♫ J-POP
        </button>

        <button
            className={`${styles.modeButton} ${styles.pop} ${
            selectedMode === "POP" ? styles.selected : ""
            }`}
            onClick={() => setSelectedMode("POP")}
        >
            ☆ POP
        </button>

        <button
            className={`${styles.modeButton} ${styles.hard} ${
            selectedMode === "HARD" ? styles.selected : ""
            }`}
            onClick={() => setSelectedMode("HARD")}
            disabled
        >
            🔒 HARD
        </button>
        </div>

        {/* =========================
            랭킹 테이블
        ========================== */}
        <div className={styles.rankingTable}>
          {/* 테이블 제목 */}
          <div className={styles.tableHeader}>
            <span>순위</span>
            <span>닉네임</span>
            <span>SCORE</span>
            <span>맞힌 문제 수</span>
            <span>플레이 날짜</span>
          </div>

          {/* 랭킹 목록 */}
          <div className={styles.tableBody}>
          {rankingData[selectedMode].map((user) => (
              <div
                className={styles.tableRow}
                key={user.rank}
              >
                {/* 순위 */}
                <span
                  className={`${styles.rank} ${
                    user.rank <= 3
                      ? styles[`rank${user.rank}`]
                      : ""
                  }`}
                >
                  {/* 1~3위만 왕관 표시 */}
                  {user.rank <= 3 && (
                    <span className={styles.crown}>
                      ♛
                    </span>
                  )}

                  <span>{user.rank}</span>
                </span>

                {/* 닉네임 / 임시 프로필 */}
                <span className={styles.nickname}>
                  <span
                    className={styles.profile}
                  />

                  {user.nickname}
                </span>

                {/* 점수 */}
                <span className={styles.score}>
                  {user.score.toLocaleString()}
                </span>

                {/* 맞힌 문제 수 */}
                <span>
                  {user.correct} / 30
                </span>

                {/* 플레이 날짜 */}
                <span className={styles.date}>
                  {user.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================
            현재 사용자의 모드별 최고 기록
        ================================================== */}

        <div
        ref={myRankingRef}
        className={`${styles.myRanking} ${
            highlightMyRank ? styles.myRankingHighlight : ""
        }`}
        >
        <div className={styles.myRankLabel}>
            <span className={styles.star}>★</span>
            <span>내 순위</span>
        </div>

        <strong className={styles.myRankNumber}>
            {myRanking.rank}
        </strong>

        <div className={styles.myProfile}>
            <span className={styles.profile} />

            <strong>
            {myRanking.nickname}
            </strong>
        </div>

        <strong className={styles.myScore}>
            {myRanking.score.toLocaleString()}
        </strong>

        <span className={styles.myCorrect}>
            {myRanking.correct} / 30
        </span>

        <span className={styles.myDate}>
            {myRanking.date}
        </span>
        </div>

        {/* 랭킹 집계 안내 */}
        <p className={styles.rankingInfo}>
          ⓘ 랭킹은 각 모드별 개인 최고 점수를 기준으로 집계됩니다.
        </p>
      </section>
    </main>
  );
}