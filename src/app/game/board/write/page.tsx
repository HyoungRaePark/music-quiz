"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import GameSidebar from "@/components/GameSidebar";
import styles from "@/styles/BoardWrite.module.scss";

type WriteCategory = "FREE" | "REQUEST";

export default function BoardWritePage() {

  // 게시글 내용 저장
  // textarea에 입력할 때마다 content 값이 변경된다.
  const [content, setContent] = useState("");

    // 페이지 이동에 사용
  const router = useRouter();

  // 게시글 제목 저장
  const [title, setTitle] = useState("");

  // 등록하기 버튼 클릭 시 입력값 검사
// 등록하기 버튼 클릭 시 입력값 검사
const handleSubmit = () => {
  // 제목이 비어있거나 공백만 입력된 경우
  if (!title.trim()) {
    alert("제목을 입력해주세요.");
    return;
  }

  // 내용이 비어있거나 공백만 입력된 경우
  if (!content.trim()) {
    alert("내용을 입력해주세요.");
    return;
  }

  /*
    나중에 백엔드 API로 보낼 게시글 데이터

    현재는 DB/API 연결 전이므로
    console에서 데이터 형태만 확인한다.
  */
  const postData = {
    category,
    title: title.trim(),
    content: content.trim(),
  };

  console.log("게시글 등록 데이터:", postData);

  alert("게시글 등록 준비 완료!");
};

  // 선택한 게시판 카테고리 저장
  const [category, setCategory] = useState<WriteCategory>("FREE");

  return (
    <div className={styles.writePage}>
      {/* ========================================
          공통 사이드바

          게시판 메인과 동일한 GameSidebar 사용
          /game/board/write에서도 BOARD가 active 상태로 표시됨
      ======================================== */}
      <GameSidebar />

      {/* ========================================
          글쓰기 페이지 전체 콘텐츠

          Sidebar가 왼쪽에 고정되어 있기 때문에
          실제 왼쪽 여백은 SCSS의 margin-left에서 처리
      ======================================== */}
      <main className={styles.writeContainer}>

        {/* ======================================
            글쓰기 페이지 제목 영역
        ====================================== */}
        <header className={styles.writeHeader}>
          <h1>글쓰기</h1>
          <p>게시판에 새로운 글을 작성해보세요.</p>
        </header>

        {/* ======================================
            글 작성 폼 영역

            아직 실제 등록 기능은 연결하지 않고
            화면 UI부터 구현
        ====================================== */}
        <section className={styles.writeCard}>

          {/* 카테고리 선택 */}
          <div className={styles.formGroup}>
            <label htmlFor="category">
              카테고리
            </label>

            {/*
              일반 사용자가 작성할 수 있는 게시판만 표시

              NOTICE / EVENT는 추후 관리자 권한에서 처리
            */}
            <select
              id="category"

              // 현재 선택된 카테고리
              value={category}

              // select는 문자열로 값을 가져오기 때문에
              // WriteCategory 타입으로 변환해서 저장
              onChange={(e) =>
                setCategory(e.target.value as WriteCategory)
              }
            >
              <option value="FREE">
                자유게시판
              </option>

              <option value="REQUEST">
                노래 요청 / 건의
              </option>
            </select>
          </div>

          {/* 제목 입력 */}
          <div className={styles.formGroup}>
            <label htmlFor="title">
              제목
            </label>

            <input
              id="title"
              type="text"
              placeholder="제목을 입력해주세요"

              // 제목은 최대 100자까지만 입력 가능
              maxLength={100}

              value={title}

              // 입력할 때마다 제목 상태 변경
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 내용 입력 */}
          <div className={styles.formGroup}>
            <label htmlFor="content">
              내용
            </label>

            <textarea
              id="content"
              maxLength={2000}
              placeholder="내용을 입력해주세요"

              // textarea에 현재 content 값을 표시
              value={content}

              // 사용자가 입력할 때마다 content를 새로운 값으로 변경
              onChange={(e) => setContent(e.target.value)}
            />

            {/*
              현재는 UI만 표시

              다음 단계에서 useState를 사용해서
              실제 입력한 글자 수가 표시되도록 구현
            */}
            <div className={styles.textCount}>
              {/* 현재 입력한 글자 수 / 최대 글자 수 */}
              {content.length} / 2000
            </div>
          </div>

          {/* ====================================
              하단 버튼 영역

              취소:
              추후 BOARD 목록으로 이동

              등록하기:
              추후 API 연결 후 게시글 등록
          ==================================== */}
          <div className={styles.buttonArea}>
            <button
              type="button"
              className={styles.cancelButton}

              // 취소 버튼을 누르면 게시판 메인으로 이동
              onClick={() => router.push("/game/board")}
            >
              취소
            </button>

            <button
              type="button"
              className={styles.submitButton}

              // 제목 / 내용 입력 여부 검사
              onClick={handleSubmit}
            >
              등록하기
            </button>
          </div>

        </section>
      </main>
    </div>
  );
}