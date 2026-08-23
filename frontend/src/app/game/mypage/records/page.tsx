"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import GameSidebar from "@/components/GameSidebar";
import styles from "@/styles/MyRecords.module.scss";


/* ==================================================
   게임 모드
================================================== */

type GameMode =
  | "ALL"
  | "K-POP"
  | "J-POP"
  | "POP"
  | "HARD";


/* ==================================================
   게임 기록 타입

   현재는 화면 테스트용 구조이며
   추후 GAME_RECORD DB/API 데이터와 연결한다.
================================================== */

type GameRecord = {
  id: number;
  date: string;
  mode: Exclude<GameMode, "ALL">;

  score: number;

  correctAnswers: number;
  totalQuestions: number;

  accuracy: number;

  maxCombo: number;

  playTime: string;
};


/* ==================================================
   Mock 게임 기록
================================================== */

const mockRecords: GameRecord[] = [
  {
    id: 1,
    date: "2026.08.22 14:32",
    mode: "K-POP",
    score: 12450,
    correctAnswers: 23,
    totalQuestions: 25,
    accuracy: 92,
    maxCombo: 38,
    playTime: "04:12",
  },

  {
    id: 2,
    date: "2026.08.20 19:15",
    mode: "J-POP",
    score: 8260,
    correctAnswers: 18,
    totalQuestions: 25,
    accuracy: 72,
    maxCombo: 27,
    playTime: "04:05",
  },

  {
    id: 3,
    date: "2026.08.18 16:47",
    mode: "POP",
    score: 7420,
    correctAnswers: 17,
    totalQuestions: 25,
    accuracy: 68,
    maxCombo: 25,
    playTime: "04:18",
  },

  {
    id: 4,
    date: "2026.08.16 13:21",
    mode: "HARD",
    score: 9880,
    correctAnswers: 22,
    totalQuestions: 25,
    accuracy: 88,
    maxCombo: 35,
    playTime: "04:30",
  },

  {
    id: 5,
    date: "2026.08.15 11:02",
    mode: "K-POP",
    score: 10230,
    correctAnswers: 20,
    totalQuestions: 25,
    accuracy: 80,
    maxCombo: 31,
    playTime: "04:22",
  },

  {
    id: 6,
    date: "2026.08.14 20:33",
    mode: "POP",
    score: 6540,
    correctAnswers: 15,
    totalQuestions: 25,
    accuracy: 60,
    maxCombo: 21,
    playTime: "04:01",
  },

  {
    id: 7,
    date: "2026.08.13 18:10",
    mode: "J-POP",
    score: 5830,
    correctAnswers: 14,
    totalQuestions: 25,
    accuracy: 56,
    maxCombo: 19,
    playTime: "04:08",
  },

  // 페이지네이션 테스트용
  {
    id: 8,
    date: "2026.08.12 21:14",
    mode: "K-POP",
    score: 9450,
    correctAnswers: 19,
    totalQuestions: 25,
    accuracy: 76,
    maxCombo: 29,
    playTime: "04:16",
  },

  {
    id: 9,
    date: "2026.08.11 17:45",
    mode: "HARD",
    score: 8650,
    correctAnswers: 18,
    totalQuestions: 25,
    accuracy: 72,
    maxCombo: 26,
    playTime: "04:28",
  },
];


export default function MyRecordsPage() {
  const router = useRouter();

  /* ==================================================
     선택된 게임 모드
  ================================================== */

  const [selectedMode, setSelectedMode] =
    useState<GameMode>("ALL");


  /* ==================================================
     페이지네이션
  ================================================== */

  const [currentPage, setCurrentPage] =
    useState(1);

  const recordsPerPage = 7;


  /* ==================================================
     모드 필터링
  ================================================== */

  const filteredRecords =
    selectedMode === "ALL"
      ? mockRecords
      : mockRecords.filter(
          (record) =>
            record.mode === selectedMode
        );

        /* ==================================================
   선택된 모드 통계 계산

   전체 선택 시 전체 기록,
   특정 모드 선택 시 해당 모드 기록만 계산한다.
================================================== */

// 총 플레이 횟수
const totalPlayCount = filteredRecords.length;

// 최고 점수
const highestScore =
  filteredRecords.length > 0
    ? Math.max(
        ...filteredRecords.map(
          (record) => record.score
        )
      )
    : 0;

// 평균 점수
const averageScore =
  filteredRecords.length > 0
    ? Math.round(
        filteredRecords.reduce(
          (sum, record) =>
            sum + record.score,
          0
        ) / filteredRecords.length
      )
    : 0;

// 평균 정답률
const averageAccuracy =
  filteredRecords.length > 0
    ? filteredRecords.reduce(
        (sum, record) =>
          sum + record.accuracy,
        0
      ) / filteredRecords.length
    : 0;

// 최대 콤보
const highestCombo =
  filteredRecords.length > 0
    ? Math.max(
        ...filteredRecords.map(
          (record) => record.maxCombo
        )
      )
    : 0;

  /* ==================================================
     페이지 계산
  ================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredRecords.length /
        recordsPerPage
    )
  );

  const startIndex =
    (currentPage - 1) * recordsPerPage;

  const visibleRecords =
    filteredRecords.slice(
      startIndex,
      startIndex + recordsPerPage
    );


  /* ==================================================
     모드 변경

     필터 변경 시 1페이지로 돌아간다.
  ================================================== */

  const handleModeChange = (
    mode: GameMode
  ) => {
    setSelectedMode(mode);
    setCurrentPage(1);
  };


  return (
    <div className={styles.recordsPage}>
      <GameSidebar />

      <main className={styles.recordsContainer}>

        {/* ======================================
            페이지 상단
        ====================================== */}

        <header className={styles.pageHeader}>
          <div>
            <h1>
              모드별 전체 기록
              <span> ♫</span>
            </h1>

            <p>
              모드별 모든 플레이 기록을
              확인할 수 있습니다.
            </p>
          </div>

          <button
            type="button"
            className={styles.backButton}
            onClick={() =>
              router.push("/game/mypage")
            }
          >
            ← 마이페이지로 돌아가기
          </button>
        </header>


        {/* ======================================
            모드 필터
        ====================================== */}

        <div className={styles.modeFilter}>
          {(
            [
              "ALL",
              "K-POP",
              "J-POP",
              "POP",
              "HARD",
            ] as GameMode[]
          ).map((mode) => (
            <button
              type="button"
              key={mode}
              className={
                selectedMode === mode
                  ? styles.activeMode
                  : ""
              }
              onClick={() =>
                handleModeChange(mode)
              }
            >
              {mode === "ALL"
                ? "전체"
                : mode}
            </button>
          ))}
        </div>


        {/* ======================================
            기록 요약

            선택된 모드의 기록을 기준으로
            통계를 계산해서 보여준다.
        ====================================== */}

        <section className={styles.summaryGrid}>
        {/* 총 플레이 */}
        <div className={styles.summaryCard}>
            <span>▷</span>

            <div>
            <p>총 플레이</p>

            <strong>
                {totalPlayCount}
                <small> 회</small>
            </strong>
            </div>
        </div>


        {/* 최고 점수 */}
        <div className={styles.summaryCard}>
            <span>☆</span>

            <div>
            <p>최고 점수</p>

            <strong>
                {highestScore.toLocaleString()}
                <small> 점</small>
            </strong>
            </div>
        </div>


        {/* 평균 점수 */}
        <div className={styles.summaryCard}>
            <span>▥</span>

            <div>
            <p>평균 점수</p>

            <strong>
                {averageScore.toLocaleString()}
                <small> 점</small>
            </strong>
            </div>
        </div>


        {/* 평균 정답률 */}
        <div className={styles.summaryCard}>
            <span>◎</span>

            <div>
            <p>평균 정답률</p>

            <strong>
                {averageAccuracy.toFixed(1)}
                <small>%</small>
            </strong>
            </div>
        </div>


        {/* 최대 콤보 */}
        <div className={styles.summaryCard}>
            <span>♨</span>

            <div>
            <p>최대 콤보</p>

            <strong>
                {highestCombo}
                <small> 콤보</small>
            </strong>
            </div>
        </div>
        </section>


        {/* ======================================
            플레이 기록
        ====================================== */}

        <section className={styles.recordCard}>
          <div className={styles.recordTitle}>
            <h2>☷ 플레이 기록</h2>
          </div>

          {/* 테이블 제목 */}
          <div className={styles.recordHeader}>
            <span>날짜</span>
            <span>모드</span>
            <span>점수</span>
            <span>정답 수 / 문제 수</span>
            <span>정답률</span>
            <span>최대 콤보</span>
            <span>플레이 시간</span>
          </div>


          {/* 기록 목록 */}
          <div className={styles.recordList}>
            {visibleRecords.map(
              (record) => (
                <div
                  className={
                    styles.recordRow
                  }
                  key={record.id}
                >
                  <span>
                    {record.date}
                  </span>

                  <span
                    className={`${styles.modeBadge} ${
                      styles[
                        `mode${record.mode.replace(
                          "-",
                          ""
                        )}`
                      ]
                    }`}
                  >
                    ● {record.mode}
                  </span>

                  <strong>
                    {record.score.toLocaleString()}
                  </strong>

                  <span>
                    {record.correctAnswers} /{" "}
                    {record.totalQuestions}
                  </span>

                  <span>
                    {record.accuracy.toFixed(
                      1
                    )}
                    %
                  </span>

                  <span>
                    {record.maxCombo}
                  </span>

                  <span>
                    {record.playTime}
                  </span>
                </div>
              )
            )}
          </div>


          {/* ====================================
              페이지네이션
          ==================================== */}

          <div className={styles.pagination}>
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.max(prev - 1, 1)
                )
              }
            >
              ‹
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => {
                const pageNumber =
                  index + 1;

                return (
                  <button
                    type="button"
                    key={pageNumber}
                    className={
                      currentPage ===
                      pageNumber
                        ? styles.activePage
                        : ""
                    }
                    onClick={() =>
                      setCurrentPage(
                        pageNumber
                      )
                    }
                  >
                    {pageNumber}
                  </button>
                );
              }
            )}

            <button
              type="button"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    totalPages
                  )
                )
              }
            >
              ›
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}