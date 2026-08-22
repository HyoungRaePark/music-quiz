"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import GameSidebar from "@/components/GameSidebar";
import styles from "@/styles/BoardDetail.module.scss";

import {
  boardData,
  type BoardPost,
  type BoardType,
} from "@/data/boardData";

/* ==================================================
   댓글 타입
================================================== */

type Comment = {
  id: number;
  author: string;
  date: string;
  time: string;
  content: string;
};


/* ==================================================
   댓글 정렬 타입

   latest = 최신순
   oldest = 등록순
================================================== */

type CommentSort = "latest" | "oldest";


/* ==================================================
   임시 댓글 데이터

   아직 DB와 연결하지 않았기 때문에
   화면 테스트용 mock 데이터를 사용한다.
================================================== */

const mockComments: Comment[] = [
  {
    id: 1,
    author: "MusicKing",
    date: "2025.08.22",
    time: "14:40",
    content:
      "와 대박! 저는 아직 15,000점도 안 넘었는데 존경합니다 ㅎㅎ",
  },
  {
    id: 2,
    author: "SoundWave",
    date: "2025.08.22",
    time: "14:42",
    content:
      "저는 처음 10초 안에 최대한 많이 맞추는 연습을 했어요! 파이팅입니다! 🔥",
  },
  {
    id: 3,
    author: "RhythmStar",
    date: "2025.08.22",
    time: "14:45",
    content:
      "저도 HARD 모드 도전 중인데 진짜 어렵네요 ㅠㅠ",
  },
];


export default function BoardDetailPage() {
  const router = useRouter();
  const params = useParams();

// URL의 [id] 값을 가져온다.
// 예: /game/board/401 → id는 "401"
  const postId = params.id as string;

  /* ==================================================
   URL의 id에 해당하는 게시글 찾기

   boardData는 NOTICE / EVENT / REQUEST / FREE로
   나뉘어 있으므로 모든 게시판을 순회하면서
   현재 postId와 같은 게시글을 찾는다.
================================================== */

let currentPost: BoardPost | undefined;
let currentBoardType: BoardType | undefined;

for (const boardType of Object.keys(boardData) as BoardType[]) {
  const foundPost = boardData[boardType].find(
    (post) => post.id === Number(postId)
  );

  if (foundPost) {
    currentPost = foundPost;
    currentBoardType = boardType;
    break;
  }
}

/* ==================================================
   존재하지 않는 게시글 처리

   URL에 없는 게시글 id가 들어온 경우
   상세 화면 대신 안내 화면을 보여준다.
================================================== */

if (!currentPost || !currentBoardType) {
  return (
    <div className={styles.detailPage}>
      <GameSidebar />

      <main className={styles.detailContainer}>
        <h1>존재하지 않는 게시글입니다.</h1>

        <button
          type="button"
          className={styles.listButton}
          onClick={() => router.push("/game/board")}
        >
          ← 목록으로
        </button>
      </main>
    </div>
  );
}

  /* ==================================================
     게시글 상태
  ================================================== */

  // 현재 게시글 제목
// boardData에서 찾은 실제 게시글 제목
const [postTitle, setPostTitle] =
useState(currentPost.title);

// boardData에서 찾은 실제 게시글 내용
const [postContent, setPostContent] =
useState(currentPost.content);


  /* ==================================================
     게시글 수정 상태
  ================================================== */

  // 현재 게시글이 수정 모드인지 확인
  const [isEditingPost, setIsEditingPost] =
    useState(false);

  // 수정 중인 게시글 제목
  const [editingPostTitle, setEditingPostTitle] =
    useState("");

  // 수정 중인 게시글 내용
  const [editingPostContent, setEditingPostContent] =
    useState("");


  /* ==================================================
     댓글 상태
  ================================================== */

  // 현재 화면에 표시되는 댓글 목록
  const [comments, setComments] =
    useState<Comment[]>(mockComments);

  // 댓글 입력창의 내용
  const [commentInput, setCommentInput] =
    useState("");

  // 댓글 정렬 기준
  const [commentSort, setCommentSort] =
    useState<CommentSort>("latest");


  /* ==================================================
     댓글 메뉴 상태

     어떤 댓글의 ⋮ 메뉴가 열려 있는지 저장한다.
     null이면 열린 메뉴가 없는 상태이다.
  ================================================== */

  const [openCommentMenu, setOpenCommentMenu] =
    useState<number | null>(null);


  /* ==================================================
     댓글 수정 상태
  ================================================== */

  // 현재 수정 중인 댓글 id
  const [editingCommentId, setEditingCommentId] =
    useState<number | null>(null);

  // 수정 중인 댓글 내용
  const [
    editingCommentContent,
    setEditingCommentContent,
  ] = useState("");


  /* ==================================================
     게시글 수정 시작
  ================================================== */

  const handlePostEditStart = () => {
    // 현재 게시글 내용을 수정용 상태에 복사
    setEditingPostTitle(postTitle);
    setEditingPostContent(postContent);

    // 수정 모드 활성화
    setIsEditingPost(true);
  };


  /* ==================================================
     게시글 수정 취소
  ================================================== */

  const handlePostEditCancel = () => {
    setIsEditingPost(false);

    // 수정용 임시 상태 초기화
    setEditingPostTitle("");
    setEditingPostContent("");
  };


  /* ==================================================
     게시글 수정 저장
  ================================================== */

  const handlePostEditSave = () => {
    // 제목이 없거나 공백만 입력된 경우
    if (!editingPostTitle.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    // 내용이 없거나 공백만 입력된 경우
    if (!editingPostContent.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    // 실제 게시글에 수정된 내용 반영
    setPostTitle(editingPostTitle.trim());
    setPostContent(editingPostContent.trim());

    // 수정 모드 종료
    setIsEditingPost(false);

    alert("게시글이 수정되었습니다.");
  };


  /* ==================================================
     게시글 삭제

     아직 DB 연결 전이므로
     실제 삭제 대신 게시판 메인으로 이동한다.
  ================================================== */

  const handlePostDelete = () => {
    const confirmed = window.confirm(
      "게시글을 삭제하시겠습니까?"
    );

    if (!confirmed) {
      return;
    }

    alert("게시글이 삭제되었습니다.");

    router.push("/game/board");
  };


  /* ==================================================
     댓글 등록
  ================================================== */

  const handleCommentSubmit = () => {
    // 공백만 입력한 댓글은 등록하지 않음
    if (!commentInput.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }

    // 댓글 등록 시점의 날짜 / 시간
    const now = new Date();

    // YYYY.MM.DD 형태
    const date = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join(".");

    // HH:MM 형태
    const time = [
      String(now.getHours()).padStart(2, "0"),
      String(now.getMinutes()).padStart(2, "0"),
    ].join(":");

    /*
      아직 로그인 / DB 연결 전이므로
      MUSICMAN을 임시 사용자로 사용한다.
    */
    const newComment: Comment = {
      // DB의 comment_id 대신 임시 고유값 사용
      id: Date.now(),

      author: "MUSICMAN",

      date,
      time,

      content: commentInput.trim(),
    };

    // 기존 댓글에 새 댓글 추가
    setComments((prevComments) => [
      ...prevComments,
      newComment,
    ]);

    // 등록 후 입력창 초기화
    setCommentInput("");
  };


  /* ==================================================
     댓글 삭제
  ================================================== */

  const handleCommentDelete = (
    commentId: number
  ) => {
    const confirmed = window.confirm(
      "댓글을 삭제하시겠습니까?"
    );

    if (!confirmed) {
      return;
    }

    // 선택한 댓글을 제외한 댓글만 다시 저장
    setComments((prevComments) =>
      prevComments.filter(
        (comment) => comment.id !== commentId
      )
    );

    // 메뉴 닫기
    setOpenCommentMenu(null);

    /*
      만약 수정 중인 댓글을 삭제한 경우를 대비해
      수정 상태도 초기화한다.
    */
    if (editingCommentId === commentId) {
      setEditingCommentId(null);
      setEditingCommentContent("");
    }
  };


  /* ==================================================
     댓글 수정 시작
  ================================================== */

  const handleCommentEditStart = (
    comment: Comment
  ) => {
    // 수정할 댓글 id 저장
    setEditingCommentId(comment.id);

    // 기존 댓글 내용을 수정 input에 표시
    setEditingCommentContent(comment.content);

    // ⋮ 메뉴 닫기
    setOpenCommentMenu(null);
  };


  /* ==================================================
     댓글 수정 취소
  ================================================== */

  const handleCommentEditCancel = () => {
    setEditingCommentId(null);
    setEditingCommentContent("");
  };


  /* ==================================================
     댓글 수정 저장
  ================================================== */

  const handleCommentEditSave = (
    commentId: number
  ) => {
    if (!editingCommentContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    // 해당 id의 댓글 내용만 변경
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              content:
                editingCommentContent.trim(),
            }
          : comment
      )
    );

    // 수정 상태 초기화
    setEditingCommentId(null);
    setEditingCommentContent("");
  };


  /* ==================================================
     댓글 정렬

     state 원본을 직접 sort하면 안 되므로
     복사본을 만든 뒤 정렬한다.
  ================================================== */

  const sortedComments = [...comments].sort(
    (a, b) => {
      // 최신순
      if (commentSort === "latest") {
        return b.id - a.id;
      }

      // 등록순
      return a.id - b.id;
    }
  );

  /* ==================================================
   게시판 타입을 화면에 표시할 한글 이름으로 변환
================================================== */

const boardTypeName: Record<BoardType, string> = {
  NOTICE: "공지사항",
  EVENT: "이벤트",
  REQUEST: "노래 요청 / 건의",
  FREE: "자유게시판",
};


  return (
    <div className={styles.detailPage}>
      {/* ========================================
          공통 Sidebar
      ======================================== */}
      <GameSidebar />


      {/* ========================================
          게시글 상세 메인 영역
      ======================================== */}
      <main className={styles.detailContainer}>

        {/* ======================================
            상단 제목 / breadcrumb / 목록 버튼
        ====================================== */}
        <header className={styles.detailHeader}>
          <div>
            <h1>게시글 상세</h1>

            <div className={styles.breadcrumb}>
              <span>⌂</span>
              <span>›</span>
              <span>BOARD</span>
              <span>›</span>
              <span>자유게시판</span>
              <span>›</span>
              <span>게시글 상세</span>
            </div>
          </div>

          {/* 게시판 목록으로 이동 */}
          <button
            type="button"
            className={styles.listButton}
            onClick={() =>
              router.push("/game/board")
            }
          >
            ← 목록으로
          </button>
        </header>


        {/* ======================================
            게시글 본문 카드
        ====================================== */}
        <section className={styles.postCard}>

          {/* 게시판 카테고리 */}
        <span className={styles.categoryBadge}>
        {boardTypeName[currentBoardType]}
        </span>


          {/* ====================================
              게시글 제목

              수정 중일 경우 input 표시
          ==================================== */}
          {isEditingPost ? (
            <input
              type="text"
              className={styles.postTitleInput}
              maxLength={100}
              value={editingPostTitle}
              onChange={(e) =>
                setEditingPostTitle(
                  e.target.value
                )
              }
            />
          ) : (
            <h2 className={styles.postTitle}>
              {postTitle}
            </h2>
          )}


          {/* ====================================
              작성자 / 날짜 / 조회수 / 댓글 수
          ==================================== */}
          <div className={styles.postInfo}>
            <div className={styles.authorInfo}>
              {/* 임시 프로필 */}
              <div
                className={styles.profileImage}
              />

              <strong>{currentPost.author}</strong>

              <span>{currentPost.date}</span>
              <span>14:35</span>
            </div>

            <div className={styles.postStats}>
              <span>◉ {currentPost.views.toLocaleString()}</span>

              {/* 실제 현재 댓글 개수 표시 */}
              <span>♧ {comments.length}</span>
            </div>
          </div>


          {/* 본문 구분선 */}
          <div className={styles.divider} />


          {/* ====================================
              게시글 내용

              수정 중이면 textarea,
              일반 상태면 본문을 표시한다.
          ==================================== */}
          {isEditingPost ? (
            <textarea
              className={
                styles.postContentTextarea
              }
              maxLength={2000}
              value={editingPostContent}
              onChange={(e) =>
                setEditingPostContent(
                  e.target.value
                )
              }
            />
          ) : (
            <div className={styles.postContent}>
              {/*
                줄바꿈 기준으로 분리해서
                문단 형태로 출력한다.
              */}
              {postContent
                .split("\n")
                .map((line, index) => (
                  <p key={index}>
                    {line || "\u00A0"}
                  </p>
                ))}
            </div>
          )}


          {/* ====================================
              게시글 버튼 영역

              수정 상태:
              취소 / 저장

              일반 상태:
              수정 / 삭제
          ==================================== */}
          <div className={styles.actionButtons}>
            {isEditingPost ? (
              <>
                <button
                  type="button"
                  className={styles.editButton}
                  onClick={
                    handlePostEditCancel
                  }
                >
                  취소
                </button>

                <button
                  type="button"
                  className={styles.saveButton}
                  onClick={handlePostEditSave}
                >
                  저장
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.editButton}
                  onClick={
                    handlePostEditStart
                  }
                >
                  ✎ 수정
                </button>

                <button
                  type="button"
                  className={
                    styles.deleteButton
                  }
                  onClick={handlePostDelete}
                >
                  삭제
                </button>
              </>
            )}
          </div>
        </section>


        {/* ========================================
            댓글 영역
        ======================================== */}
        <section className={styles.commentCard}>

          {/* ======================================
              댓글 상단

              댓글 개수 / 정렬
          ====================================== */}
          <div className={styles.commentHeader}>
            <h2>
              댓글 {comments.length}
            </h2>

            <select
              className={styles.commentSort}
              value={commentSort}
              onChange={(e) =>
                setCommentSort(
                  e.target.value as CommentSort
                )
              }
            >
              <option value="latest">
                최신순
              </option>

              <option value="oldest">
                등록순
              </option>
            </select>
          </div>


          {/* ======================================
              댓글 목록
          ====================================== */}
          <div className={styles.commentList}>
            {sortedComments.map((comment) => (
              <div
                className={styles.commentItem}
                key={comment.id}
              >
                {/* 임시 프로필 이미지 */}
                <div
                  className={
                    styles.commentProfile
                  }
                />


                {/* 댓글 본문 */}
                <div
                  className={styles.commentBody}
                >
                  {/* 작성자 / 날짜 / 시간 */}
                  <div
                    className={
                      styles.commentMeta
                    }
                  >
                    <strong>
                      {comment.author}
                    </strong>

                    <span>
                      {comment.date}
                    </span>

                    <span>
                      {comment.time}
                    </span>
                  </div>


                  {/* =================================
                      댓글 수정 영역

                      수정 중이면 input,
                      아니면 일반 댓글 출력
                  ================================= */}
                  {editingCommentId ===
                  comment.id ? (
                    <div
                      className={
                        styles.commentEditArea
                      }
                    >
                      <input
                        type="text"
                        value={
                          editingCommentContent
                        }
                        onChange={(e) =>
                          setEditingCommentContent(
                            e.target.value
                          )
                        }
                      />

                      <div
                        className={
                          styles.commentEditButtons
                        }
                      >
                        <button
                          type="button"
                          className={
                            styles.commentEditCancel
                          }
                          onClick={
                            handleCommentEditCancel
                          }
                        >
                          취소
                        </button>

                        <button
                          type="button"
                          className={
                            styles.commentEditSave
                          }
                          onClick={() =>
                            handleCommentEditSave(
                              comment.id
                            )
                          }
                        >
                          저장
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>{comment.content}</p>
                  )}
                </div>


                {/* =================================
                    댓글 ⋮ 메뉴
                ================================= */}
                <div
                  className={
                    styles.commentMenuArea
                  }
                >
                  <button
                    type="button"
                    className={
                      styles.commentMenu
                    }
                    aria-label="댓글 메뉴"
                    onClick={() =>
                      setOpenCommentMenu(
                        (prev) =>
                          prev === comment.id
                            ? null
                            : comment.id
                      )
                    }
                  >
                    ⋮
                  </button>


                  {/* 현재 댓글 메뉴만 표시 */}
                  {openCommentMenu ===
                    comment.id && (
                    <div
                      className={
                        styles.commentMenuPopup
                      }
                    >
                      <button
                        type="button"
                        onClick={() =>
                          handleCommentEditStart(
                            comment
                          )
                        }
                      >
                        수정
                      </button>

                      <button
                        type="button"
                        className={
                          styles.commentDeleteButton
                        }
                        onClick={() =>
                          handleCommentDelete(
                            comment.id
                          )
                        }
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>


          {/* ======================================
              댓글 작성 영역
          ====================================== */}
          <div className={styles.commentWrite}>
            <input
              type="text"
              placeholder="댓글을 입력하세요..."
              value={commentInput}
              onChange={(e) =>
                setCommentInput(
                  e.target.value
                )
              }
            />

            <button
              type="button"
              onClick={handleCommentSubmit}
            >
              댓글 등록
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}