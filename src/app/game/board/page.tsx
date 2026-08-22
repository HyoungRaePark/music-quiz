"use client";

import { useState } from "react";

import GameSidebar from "@/components/GameSidebar";
import styles from "@/styles/Board.module.scss";
import { useRouter } from "next/navigation";

type BoardType = "NOTICE" | "EVENT" | "REQUEST" | "FREE";

type BoardPost = {
  number: string;
  title: string;
  author: string;
  date: string;
  views: number;
};

const boardData: Record<BoardType, BoardPost[]> = {
  NOTICE: [
    {
      number: "공지",
      title: "6월 1일 (토) 서버 점검 안내",
      author: "관리자",
      date: "2026.08.22",
      views: 1245,
    },
    {
      number: "공지",
      title: "SONG QUIZ 이용 안내",
      author: "관리자",
      date: "2026.08.21",
      views: 930,
    },
    {
      number: "공지",
      title: "노래 데이터 업데이트 안내",
      author: "관리자",
      date: "2026.08.20",
      views: 812,
    },
    {
      number: "101",
      title: "서비스 이용 관련 질문이 있습니다",
      author: "MUSICMAN",
      date: "2026.08.19",
      views: 86,
    },
    {
      number: "100",
      title: "게임 플레이 중 오류가 발생했어요",
      author: "Melody",
      date: "2026.08.19",
      views: 112,
    },
    {
      number: "99",
      title: "랭킹 갱신 기준이 궁금합니다",
      author: "NightStar",
      date: "2026.08.18",
      views: 203,
    },
    {
      number: "98",
      title: "로그인 관련 문의드립니다",
      author: "Yuki",
      date: "2026.08.18",
      views: 71,
    },
    {
      number: "97",
      title: "페이지 이용 중 궁금한 점이 있어요",
      author: "Haru",
      date: "2026.08.17",
      views: 145,
    },
    {
      number: "96",
      title: "게임 기록 저장 관련 문의",
      author: "MusicFan",
      date: "2026.08.17",
      views: 99,
    },
    {
      number: "95",
      title: "사이트 이용 후기 남겨봅니다",
      author: "PopStar",
      date: "2026.08.16",
      views: 176,
    },
  ],

  EVENT: [
    {
      number: "공지",
      title: "8월 플레이 챌린지 이벤트 안내",
      author: "관리자",
      date: "2026.08.22",
      views: 2301,
    },
    {
      number: "공지",
      title: "주말 특별 점수 이벤트",
      author: "관리자",
      date: "2026.08.21",
      views: 1844,
    },
    {
      number: "201",
      title: "이번 이벤트 참여 방법이 궁금해요",
      author: "MUSICMAN",
      date: "2026.08.20",
      views: 133,
    },
    {
      number: "200",
      title: "이벤트 보상은 언제 지급되나요?",
      author: "Melody",
      date: "2026.08.20",
      views: 97,
    },
    {
      number: "199",
      title: "이번 챌린지 꽤 어렵네요 ㅋㅋ",
      author: "Rin",
      date: "2026.08.19",
      views: 245,
    },
    {
      number: "198",
      title: "이벤트 기록도 랭킹에 포함되나요?",
      author: "Luna",
      date: "2026.08.19",
      views: 88,
    },
    {
      number: "197",
      title: "다음 이벤트도 기대됩니다",
      author: "Haru",
      date: "2026.08.18",
      views: 76,
    },
    {
      number: "196",
      title: "이벤트 보상 뭐가 제일 좋나요?",
      author: "MusicFan",
      date: "2026.08.18",
      views: 143,
    },
    {
      number: "195",
      title: "챌린지 완료했습니다!",
      author: "PopStar",
      date: "2026.08.17",
      views: 211,
    },
    {
      number: "194",
      title: "이벤트 기간 연장되나요?",
      author: "NightStar",
      date: "2026.08.17",
      views: 120,
    },
  ],

  REQUEST: [
    {
      number: "301",
      title: "J-POP 추천곡 추가 요청해요!",
      author: "Yuki",
      date: "2026.08.22",
      views: 112,
    },
    {
      number: "300",
      title: "노래 제목 오타 제보합니다",
      author: "MUSICMAN",
      date: "2026.08.22",
      views: 86,
    },
    {
      number: "299",
      title: "POP 모드에 이 곡도 추가해주세요",
      author: "PopStar",
      date: "2026.08.21",
      views: 176,
    },
    {
      number: "298",
      title: "K-POP 신곡 추가 요청드립니다",
      author: "KMusic",
      date: "2026.08.21",
      views: 194,
    },
    {
      number: "297",
      title: "정답 판정이 이상한 것 같아요",
      author: "Melody",
      date: "2026.08.20",
      views: 203,
    },
    {
      number: "296",
      title: "곡 재생 구간을 조금 늘려주세요",
      author: "MusicFan",
      date: "2026.08.20",
      views: 156,
    },
    {
      number: "295",
      title: "하드 모드 곡 관련 건의입니다",
      author: "Challenge",
      date: "2026.08.19",
      views: 189,
    },
    {
      number: "294",
      title: "이 곡도 꼭 추가됐으면 좋겠어요",
      author: "Luna",
      date: "2026.08.19",
      views: 121,
    },
    {
      number: "293",
      title: "노래 정보 수정 요청드립니다",
      author: "Haru",
      date: "2026.08.18",
      views: 94,
    },
    {
      number: "292",
      title: "새로운 장르 추가 계획 있나요?",
      author: "NightStar",
      date: "2026.08.18",
      views: 167,
    },
  ],

  FREE: [
    {
      number: "401",
      title: "오늘 처음 해봤는데 재밌네요 ㅎㅎ",
      author: "Luna",
      date: "2026.08.22",
      views: 65,
    },
    {
      number: "400",
      title: "다들 어떤 모드 제일 많이 하세요?",
      author: "MUSICMAN",
      date: "2026.08.22",
      views: 132,
    },
    {
      number: "399",
      title: "J-POP 좋아하는 사람 있나요",
      author: "Yuki",
      date: "2026.08.21",
      views: 201,
    },
    {
      number: "398",
      title: "오늘 랭킹 10위 안에 들었습니다!",
      author: "Melody",
      date: "2026.08.21",
      views: 257,
    },
    {
      number: "397",
      title: "하드 모드 빨리 해보고 싶네요",
      author: "Challenge",
      date: "2026.08.20",
      views: 145,
    },
    {
      number: "396",
      title: "요즘 듣는 노래 추천해주세요",
      author: "MusicFan",
      date: "2026.08.20",
      views: 310,
    },
    {
      number: "395",
      title: "이 게임 은근 중독성 있네요",
      author: "Haru",
      date: "2026.08.19",
      views: 187,
    },
    {
      number: "394",
      title: "POP 모드 고수분들 대단합니다",
      author: "PopStar",
      date: "2026.08.19",
      views: 221,
    },
    {
      number: "393",
      title: "다들 최고 점수 몇 점인가요?",
      author: "NightStar",
      date: "2026.08.18",
      views: 276,
    },
    {
      number: "392",
      title: "다음 업데이트 기대됩니다",
      author: "Rin",
      date: "2026.08.18",
      views: 108,
    },
  ],
};

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
                key={`${selectedBoard}-${post.number}-${index}`}
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