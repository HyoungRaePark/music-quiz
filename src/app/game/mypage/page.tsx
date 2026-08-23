"use client";

import { useRouter } from "next/navigation";

import GameSidebar from "@/components/GameSidebar";
import styles from "@/styles/MyPage.module.scss";

export default function MyPage() {
  const router = useRouter();

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

              <button type="button">
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

            <button
              type="button"
              className={styles.postRow}
              onClick={() =>
                router.push("/game/board/400")
              }
            >
              <span>
                오늘 K-POP 모드 신기록 달성했어요!
              </span>

              <span className={styles.freeBadge}>
                자유게시판
              </span>

              <span>2025.08.22</span>
              <span>128</span>
            </button>

            <button
              type="button"
              className={styles.postRow}
              onClick={() =>
                router.push("/game/board/300")
              }
            >
              <span>
                이 노래 제목이 뭐예요? ㅠㅠ
              </span>

              <span className={styles.requestBadge}>
                노래 요청/건의
              </span>

              <span>2025.08.20</span>
              <span>45</span>
            </button>

            <button
              type="button"
              className={styles.postRow}
            >
              <span>
                J-POP 추천곡 리스트 공유합니다!
              </span>

              <span className={styles.freeBadge}>
                자유게시판
              </span>

              <span>2025.08.18</span>
              <span>68</span>
            </button>

            <button
              type="button"
              className={styles.postRow}
            >
              <span>
                HARD 모드 너무 어려운 것 같아요...
              </span>

              <span className={styles.freeBadge}>
                자유게시판
              </span>

              <span>2025.08.16</span>
              <span>92</span>
            </button>

            <button
              type="button"
              className={styles.postRow}
            >
              <span>
                신곡 업데이트 요청드립니다!
              </span>

              <span className={styles.requestBadge}>
                노래 요청/건의
              </span>

              <span>2025.08.15</span>
              <span>33</span>
            </button>

            {/* 페이지네이션 */}
            <div className={styles.pagination}>
              <button type="button">‹</button>

              <button
                type="button"
                className={styles.activePage}
              >
                1
              </button>

              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button">›</button>
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