"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import GameSidebar from "@/components/GameSidebar";
import styles from "@/styles/MyPage.module.scss";

type MyPost = {
  id: number;
  title: string;
  category: "FREE" | "REQUEST";
  date: string;
  views: number;
};

const mockMyPosts: MyPost[] = [
  {
    id: 400,
    title: "오늘 K-POP 모드 신기록 달성했어요!",
    category: "FREE",
    date: "2025.08.22",
    views: 128,
  },
  {
    id: 300,
    title: "이 노래 제목이 뭐예요? ㅠㅠ",
    category: "REQUEST",
    date: "2025.08.20",
    views: 45,
  },
  {
    id: 399,
    title: "J-POP 추천곡 리스트 공유합니다!",
    category: "FREE",
    date: "2025.08.18",
    views: 68,
  },
  {
    id: 397,
    title: "HARD 모드 너무 어려운 것 같아요...",
    category: "FREE",
    date: "2025.08.16",
    views: 92,
  },
  {
    id: 298,
    title: "신곡 업데이트 요청드립니다!",
    category: "REQUEST",
    date: "2025.08.15",
    views: 33,
  },

  // 2페이지 확인용
  {
    id: 396,
    title: "요즘 듣는 노래 추천해주세요",
    category: "FREE",
    date: "2025.08.14",
    views: 105,
  },
  {
    id: 297,
    title: "정답 판정 관련해서 질문 있습니다",
    category: "REQUEST",
    date: "2025.08.13",
    views: 74,
  },
];


export default function MyPage() {
  const router = useRouter();

  /* ==================================================
    로그아웃

    현재는 실제 인증 기능 연결 전이므로
    확인창 이후 로그인 페이지로 이동한다.
    ================================================== */

    const handleLogout = () => {
    const confirmed = window.confirm(
        "로그아웃 하시겠습니까?"
    );

    if (!confirmed) {
        return;
    }

    /*
        추후 로그인 Context / 토큰 / 세션을
        여기서 초기화한다.
    */

    router.push("/login");
    };

    /* ==================================================
    내가 쓴 글 페이지네이션
    ================================================== */

    // 현재 페이지
    const [currentPostPage, setCurrentPostPage] =
    useState(1);

    // 한 페이지에 보여줄 글 개수
    const postsPerPage = 5;

    // 현재 페이지 시작 위치
    const startIndex =
    (currentPostPage - 1) * postsPerPage;

    // 현재 페이지에 보여줄 게시글
    const visibleMyPosts = mockMyPosts.slice(
    startIndex,
    startIndex + postsPerPage
    );

    // 전체 페이지 수
    const totalPostPages = Math.ceil(
    mockMyPosts.length / postsPerPage
    );

  return (
    <div className={styles.myPage}>
      {/* ========================================
          공통 Sidebar
      ======================================== */}
      <GameSidebar />

      {/* ========================================
          MY PAGE 메인 영역
      ======================================== */}
      <main className={styles.myPageContainer}>

        {/* ======================================
            상단 제목 / 회원정보 수정 / 로그아웃
        ====================================== */}
        <header className={styles.pageHeader}>
          <div>
            <h1>마이페이지</h1>

            <p>
              형래님, 오늘도 좋은 하루 보내세요! ♫
            </p>
          </div>

          <div className={styles.headerButtons}>
            <button
              type="button"
              className={styles.profileEditButton}
              onClick={() =>
                router.push("/game/mypage/edit")
                }
            >
              ⚙ 회원정보 수정
            </button>

            <button
            type="button"
            className={styles.logoutButton}

            // 로그아웃 처리
            onClick={handleLogout}
            >
            ↪ 로그아웃
            </button>
          </div>
        </header>

        {/* ======================================
            프로필 + 전체 기록 요약
        ====================================== */}
        <section className={styles.profileCard}>

          {/* 왼쪽 프로필 */}
          <div className={styles.profileArea}>
            <div className={styles.profileImage}>
              ♫
            </div>

            <div className={styles.profileInfo}>
              <h2>형래</h2>

              <div className={styles.levelArea}>
                <span className={styles.levelBadge}>
                  Lv.12
                </span>

                <span>
                  음악 퀴즈 마스터
                </span>
              </div>

              <p>
                ✉ qkrgus123@example.com
              </p>

              <p>
                ▣ 가입일 2025.08.10
              </p>
            </div>
          </div>

          {/* 오른쪽 기록 요약 */}
          <div className={styles.summaryArea}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryIcon}>
                ☆
              </span>

              <p>총 플레이</p>

              <strong>
                56 <small>회</small>
              </strong>
            </div>

            <div className={styles.summaryItem}>
              <span className={styles.summaryIcon}>
                ♜
              </span>

              <p>최고 점수</p>

              <strong>
                12,450 <small>점</small>
              </strong>
            </div>

            <div className={styles.summaryItem}>
              <span className={styles.summaryIcon}>
                ♨
              </span>

              <p>최대 콤보</p>

              <strong>
                38 <small>콤보</small>
              </strong>
            </div>
          </div>
        </section>


        {/* ======================================
            아래 2열 영역
        ====================================== */}
        <div className={styles.contentGrid}>

          {/* ====================================
              모드별 최고 기록
          ==================================== */}
          <section className={styles.modeRecordCard}>
            <div className={styles.cardHeader}>
              <h2>▥ 모드별 최고 기록</h2>
                <button
                type="button"
                onClick={() =>
                    router.push("/game/mypage/records")
                }
                >
                전체 기록 보기 ›
                </button>
            </div>

            <div className={styles.modeList}>
              <div className={styles.modeRow}>
                <div className={styles.modeName}>
                  <span className={styles.modeIcon}>
                    ◉
                  </span>

                  <div>
                    <strong>K-POP</strong>
                    <p>케이팝 모드</p>
                  </div>
                </div>

                <div className={styles.modeStat}>
                  <span>최고 점수</span>
                  <strong>9,850점</strong>
                </div>

                <div className={styles.modeStat}>
                  <span>최고 콤보</span>
                  <strong>32콤보</strong>
                </div>
              </div>

              <div className={styles.modeRow}>
                <div className={styles.modeName}>
                  <span className={styles.modeIcon}>
                    ◉
                  </span>

                  <div>
                    <strong>J-POP</strong>
                    <p>제이팝 모드</p>
                  </div>
                </div>

                <div className={styles.modeStat}>
                  <span>최고 점수</span>
                  <strong>8,260점</strong>
                </div>

                <div className={styles.modeStat}>
                  <span>최고 콤보</span>
                  <strong>27콤보</strong>
                </div>
              </div>

              <div className={styles.modeRow}>
                <div className={styles.modeName}>
                  <span className={styles.modeIcon}>
                    ◉
                  </span>

                  <div>
                    <strong>POP</strong>
                    <p>팝 모드</p>
                  </div>
                </div>

                <div className={styles.modeStat}>
                  <span>최고 점수</span>
                  <strong>7,420점</strong>
                </div>

                <div className={styles.modeStat}>
                  <span>최고 콤보</span>
                  <strong>25콤보</strong>
                </div>
              </div>

              <div className={styles.modeRow}>
                <div className={styles.modeName}>
                  <span className={styles.modeIcon}>
                    ◉
                  </span>

                  <div>
                    <strong>HARD</strong>
                    <p>하드 모드</p>
                  </div>
                </div>

                <div className={styles.modeStat}>
                  <span>최고 점수</span>
                  <strong>12,450점</strong>
                </div>

                <div className={styles.modeStat}>
                  <span>최고 콤보</span>
                  <strong>38콤보</strong>
                </div>
              </div>
            </div>

            <div className={styles.modeSummary}>
              <div>
                <span>🏅</span>

                <div>
                  <p>전체 최고 점수 합계</p>
                  <strong>37,980점</strong>
                </div>
              </div>

              <div>
                <span>◎</span>

                <div>
                  <p>평균 정답률</p>
                  <strong>87.3%</strong>
                </div>
              </div>
            </div>
          </section>


          {/* ====================================
              내가 쓴 글
          ==================================== */}
          <section className={styles.myPostCard}>
            <div className={styles.cardHeader}>
              <h2>▱ 내가 쓴 글</h2>

              <button
                type="button"
                onClick={() =>
                  router.push("/game/board")
                }
              >
                전체 보기 ›
              </button>
            </div>

            <div className={styles.postHeader}>
              <span>제목</span>
              <span>카테고리</span>
              <span>작성일</span>
              <span>조회수</span>
            </div>

            {/* ====================================
                내가 쓴 게시글 목록
            ==================================== */}

            {visibleMyPosts.map((post) => (
            <button
                type="button"
                className={styles.postRow}
                key={post.id}

                // 게시글 상세 페이지로 이동
                onClick={() =>
                router.push(`/game/board/${post.id}`)
                }
            >
                <span>{post.title}</span>

                <span
                className={
                    post.category === "FREE"
                    ? styles.freeBadge
                    : styles.requestBadge
                }
                >
                {post.category === "FREE"
                    ? "자유게시판"
                    : "노래 요청/건의"}
                </span>

                <span>{post.date}</span>

                <span>
                {post.views.toLocaleString()}
                </span>
            </button>
            ))}

            {/* 페이지네이션 */}
            <div className={styles.pagination}>
            {/* 이전 페이지 */}
            <button
                type="button"
                disabled={currentPostPage === 1}
                onClick={() =>
                setCurrentPostPage((prev) =>
                    Math.max(prev - 1, 1)
                )
                }
            >
                ‹
            </button>

            {/* 페이지 번호 */}
            {Array.from(
                { length: totalPostPages },
                (_, index) => {
                const pageNumber = index + 1;

                return (
                    <button
                    type="button"
                    key={pageNumber}
                    className={
                        currentPostPage === pageNumber
                        ? styles.activePage
                        : ""
                    }
                    onClick={() =>
                        setCurrentPostPage(pageNumber)
                    }
                    >
                    {pageNumber}
                    </button>
                );
                }
            )}

            {/* 다음 페이지 */}
            <button
                type="button"
                disabled={
                currentPostPage === totalPostPages
                }
                onClick={() =>
                setCurrentPostPage((prev) =>
                    Math.min(
                    prev + 1,
                    totalPostPages
                    )
                )
                }
            >
                ›
            </button>
            </div>
          </section>
        </div>


        {/* ======================================
            하단 안내사항
        ====================================== */}
        <section className={styles.guideCard}>
          <strong>ⓘ 안내사항</strong>

          <p>
            기록은 각 모드별로 가장 높은 점수가 반영됩니다.
          </p>
        </section>

      </main>
    </div>
  );
}