"use client";

import { useState } from "react";

import GameSidebar from "@/components/GameSidebar";
import styles from "@/styles/Board.module.scss";
import { useRouter } from "next/navigation";

import {
  boardData,
  type BoardType,
  type BoardPost,
} from "@/data/boardData";


export default function BoardPage() {
    const [selectedBoard, setSelectedBoard] =
    useState<BoardType>("NOTICE");
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);

const postsPerPage = 10;
// 현재 게시판의 전체 게시글
const currentPosts = boardData[selectedBoard];

// 현재 페이지에서 보여줄 게시글 범위 계산
const startIndex = (currentPage - 1) * postsPerPage;
const endIndex = startIndex + postsPerPage;

// 공지 포함 한 페이지에 최대 10개
const visiblePosts = currentPosts.slice(startIndex, endIndex);

// 전체 페이지 수
const totalPages = Math.ceil(
  currentPosts.length / postsPerPage
);
  return (
    <div className={styles.boardPage}>
      {/* ========================================
          공통 사이드바
      ======================================== */}
      <GameSidebar />

      {/* ========================================
          BOARD 전체 콘텐츠
      ======================================== */}
      <main className={styles.boardContainer}>

        {/* ======================================
            상단 영역
            왼쪽 : BOARD 제목 / 설명
            오른쪽 : 알림 / 프로필
        ====================================== */}
        <header className={styles.boardHeader}>
          <div className={styles.titleArea}>
            <h1>BOARD</h1>

            <p>
              다양한 소식과 이야기를 확인하고 함께 소통해요!
            </p>
          </div>

          {/* 로그인 사용자 상태 영역 */}
          <div className={styles.userArea}>
            {/* 알림 버튼 */}
            <button
              type="button"
              className={styles.notificationButton}
              aria-label="알림"
            >
              ♧
            </button>

            {/* 프로필 */}
            <button
              type="button"
              className={styles.profileButton}
            >
              <span className={styles.profileImage} />

              <span className={styles.nickname}>
                MUSICMAN
              </span>

              <span className={styles.profileArrow}>
                ▾
              </span>
            </button>
          </div>
        </header>

        {/* ======================================
            게시판 카테고리 탭
        ====================================== */}
        <nav className={styles.boardTabs}>
        <button
            type="button"
            className={`${styles.tabButton} ${
            selectedBoard === "NOTICE" ? styles.activeTab : ""
            }`}
            onClick={() => {
  setSelectedBoard("NOTICE");
  setCurrentPage(1);
}}
        >
            📢 공지사항
        </button>

        <button
            type="button"
            className={`${styles.tabButton} ${
            selectedBoard === "EVENT" ? styles.activeTab : ""
            }`}
            onClick={() => {
  setSelectedBoard("EVENT");
  setCurrentPage(1);
}}
        >
            🎁 이벤트
        </button>

        <button
            type="button"
            className={`${styles.tabButton} ${
            selectedBoard === "REQUEST" ? styles.activeTab : ""
            }`}
            onClick={() => {
  setSelectedBoard("REQUEST");
  setCurrentPage(1);
}}
        >
            ✎ 노래 요청/건의
        </button>

        <button
            type="button"
            className={`${styles.tabButton} ${
            selectedBoard === "FREE" ? styles.activeTab : ""
            }`}
            onClick={() => {
  setSelectedBoard("FREE");
  setCurrentPage(1);
}}
        >
            💬 자유게시판
        </button>
        </nav>

        {/* ======================================
            게시판 본문 전체

            하나의 큰 덩어리 안에서
            왼쪽 게시판 / 오른쪽 보조패널로 분리
        ====================================== */}
        <section className={styles.boardBody}>

          {/* ====================================
              왼쪽 게시판 영역
          ==================================== */}
          <div className={styles.boardMain}>

            {/* 게시글 목록 */}
            <div className={styles.postList}>

              {/* 테이블 헤더 */}
              <div className={styles.postHeader}>
                <span>번호</span>
                <span>제목</span>
                <span>작성자</span>
                <span>날짜</span>
                <span>조회수</span>
              </div>

              {/* 임시 게시글 */}
              {visiblePosts.map((post, index) => (
                <div
                  className={styles.postRow}
                  key={post.id}

                  // 공지처럼 number가 문자열이어도
                  // 현재는 mock 테스트용으로 상세 페이지로 이동한다.
                  onClick={() =>
                    router.push(
                      `/game/board/${post.id}`
                    )
                  }
                >
                  <span>{post.number}</span>
                  <span>{post.title}</span>
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                  <span>{post.views.toLocaleString()}</span>
                </div>
              ))}
            </div>
           
            {/* ==================================
                페이지네이션

                boardMain 안에 있기 때문에
                게시글 목록 기준 중앙 정렬
            ================================== */}
            <div className={styles.pagination}>
              <button type="button">‹</button>

              <button
                type="button"
                className={styles.currentPage}
              >
                1
              </button>

              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button">4</button>
              <button type="button">5</button>

              <button type="button">›</button>
            </div>
          </div>

          {/* ====================================
              오른쪽 보조 패널
          ==================================== */}
          <aside className={styles.boardSide}>

            {/* 검색 */}
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
              />

              <button
                type="button"
                aria-label="검색"
              >
                ⌕
              </button>
            </div>

            {/* 글쓰기 */}
            <button
            type="button"
            className={styles.writeButton}
            onClick={() => router.push("/game/board/write")}
            >
            ✎ 글쓰기
            </button>

            {/* 카테고리 */}
            <div className={styles.sidePanel}>
              <h2>카테고리</h2>

                <button
                type="button"
                className={`${styles.categoryRow} ${
                    selectedBoard === "NOTICE" ? styles.categoryActive : ""
                }`}
                onClick={() => {
                    setSelectedBoard("NOTICE");
                    setCurrentPage(1);
                }}
                >
                <span>공지사항</span>
                <span>3</span>
                </button>

                <button
                type="button"
                className={`${styles.categoryRow} ${
                    selectedBoard === "EVENT" ? styles.categoryActive : ""
                }`}
                onClick={() => {
                    setSelectedBoard("EVENT");
                    setCurrentPage(1);
                }}
                >
                <span>이벤트</span>
                <span>2</span>
                </button>

                <button
                type="button"
                className={`${styles.categoryRow} ${
                    selectedBoard === "REQUEST" ? styles.categoryActive : ""
                }`}
                onClick={() => {
                    setSelectedBoard("REQUEST");
                    setCurrentPage(1);
                }}
                >
                <span>노래 요청/건의</span>
                <span>3</span>
                </button>

                <button
                type="button"
                className={`${styles.categoryRow} ${
                    selectedBoard === "FREE" ? styles.categoryActive : ""
                }`}
                onClick={() => {
                    setSelectedBoard("FREE");
                    setCurrentPage(1);
                }}
                >
                <span>자유게시판</span>
                <span>152</span>
                </button>
            </div>

            {/* 이용 안내 */}
            <div className={styles.guidePanel}>
              <h2>ⓘ 이용 안내</h2>

              <p>
                서로를 존중하는 게시판 문화를 만들어주세요.
              </p>

              <p>
                부적절한 게시글은 삭제될 수 있습니다.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}