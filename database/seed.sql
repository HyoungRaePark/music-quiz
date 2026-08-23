-- ==================================================
-- SONG QUIZ DATABASE SEED
--
-- 개발 및 테스트에 사용할 임시 데이터를 생성한다.
--
-- 실행 순서:
-- 1. schema.sql 실행
-- 2. seed.sql 실행
--
-- schema.sql 실행 시 기존 DB가 초기화되므로
-- 항상 schema.sql 실행 후 seed.sql을 실행한다.
-- ==================================================


-- ==================================================
-- DATABASE 선택
-- ==================================================

USE song_quiz;


-- ==================================================
-- USERS 테스트 데이터
-- ==================================================

-- 일반 사용자
-- 게임 기록 / 자유게시판 / 댓글 / 요청 테스트에 사용한다.
--
-- 주의:
-- 현재 비밀번호는 DB 테스트를 위한 임시 평문 데이터다.
-- 실제 회원가입 기능에서는 백엔드에서
-- 암호화한 비밀번호를 저장해야 한다.

INSERT INTO users (
    login_id,
    password,
    nickname,
    email,
    role
)
VALUES
(
    'testuser',
    'test1234',
    'MUSICMAN',
    'test@example.com',
    'USER'
);


-- 관리자
-- 공지사항 / 이벤트 게시글 작성 테스트에 사용한다.

INSERT INTO users (
    login_id,
    password,
    nickname,
    email,
    role
)
VALUES
(
    'admin',
    'admin1234',
    '관리자',
    'admin@example.com',
    'ADMIN'
);


-- ==================================================
-- SONG 테스트 데이터
-- ==================================================

-- 실제 음원 등록 기능을 만들기 전까지 사용하는
-- 임시 음악 데이터다.
--
-- audio_path는 추후 서버에 저장된
-- 실제 음원 파일 경로로 변경한다.

INSERT INTO song (
    title,
    artist,
    category,
    audio_path
)
VALUES
(
    '테스트 KPOP 1',
    '테스트 가수 1',
    'KPOP',
    '/music/kpop/test1.mp3'
),
(
    '테스트 JPOP 1',
    '테스트 가수 2',
    'JPOP',
    '/music/jpop/test1.mp3'
),
(
    '테스트 POP 1',
    '테스트 가수 3',
    'POP',
    '/music/pop/test1.mp3'
);


-- ==================================================
-- GAME_RECORD 테스트 데이터
-- ==================================================

-- testuser(user_id = 1)의 게임 기록
--
-- 실제 서비스에서는 게임 종료 시
-- 프론트에서 게임 결과를 백엔드로 전달하고
-- 백엔드가 GAME_RECORD에 자동으로 저장한다.

INSERT INTO game_record (
    user_id,
    mode,
    score,
    correct_count,
    total_questions,
    max_combo,
    play_time_seconds
)
VALUES
(
    1,
    'KPOP',
    12450,
    23,
    25,
    38,
    252
),
(
    1,
    'JPOP',
    8260,
    18,
    25,
    27,
    245
),
(
    1,
    'POP',
    7420,
    17,
    25,
    25,
    258
),
(
    1,
    'HARD',
    9880,
    22,
    25,
    35,
    270
),
(
    1,
    'KPOP',
    10230,
    20,
    25,
    31,
    262
);


-- ==================================================
-- POST 테스트 데이터
-- ==================================================

-- admin(user_id = 2)
-- 공지사항 작성

INSERT INTO post (
    user_id,
    board_type,
    title,
    content
)
VALUES
(
    2,
    'NOTICE',
    'SONG QUIZ 이용 안내',
    'SONG QUIZ 이용 안내 테스트 게시글입니다.'
);


-- admin(user_id = 2)
-- 이벤트 게시글 작성

INSERT INTO post (
    user_id,
    board_type,
    title,
    content
)
VALUES
(
    2,
    'EVENT',
    'SONG QUIZ 오픈 이벤트',
    '이벤트 테스트 게시글입니다.'
);


-- testuser(user_id = 1)
-- 자유게시판 게시글 작성

INSERT INTO post (
    user_id,
    board_type,
    title,
    content
)
VALUES
(
    1,
    'FREE',
    '게임 너무 어렵네요',
    'HARD 모드가 생각보다 어렵네요.'
),
(
    1,
    'FREE',
    '다들 어떤 모드 하시나요?',
    '저는 KPOP 모드를 가장 많이 플레이하고 있습니다.'
);


-- ==================================================
-- COMMENT 테스트 데이터
-- ==================================================

-- post_id = 3
-- "게임 너무 어렵네요" 게시글에 작성된 댓글

INSERT INTO comment (
    post_id,
    user_id,
    content
)
VALUES
(
    3,
    2,
    'HARD 모드는 원래 난이도가 높습니다!'
),
(
    3,
    1,
    '그래도 계속 도전해봐야겠네요.'
);


-- ==================================================
-- REQUEST 테스트 데이터
-- ==================================================

-- 노래 추가 요청

INSERT INTO request (
    user_id,
    request_type,
    title,
    content
)
VALUES
(
    1,
    'SONG_REQUEST',
    '노래 추가 요청합니다',
    '게임에 새로운 KPOP 노래를 추가해주세요.'
);


-- 기술 문의

INSERT INTO request (
    user_id,
    request_type,
    title,
    content
)
VALUES
(
    1,
    'TECHNICAL',
    '게임 관련 문의',
    '게임 플레이 중 발생한 문제에 대한 테스트 문의입니다.'
);


-- ==================================================
-- SEED 데이터 생성 완료
-- ==================================================


-- ==================================================
-- 데이터 확인
-- ==================================================

-- 회원 확인
SELECT * FROM users;

-- 음악 확인
SELECT * FROM song;

-- 게임 기록 확인
SELECT * FROM game_record;

-- 게시글 확인
SELECT * FROM post;

-- 댓글 확인
SELECT * FROM comment;

-- 요청 확인
SELECT * FROM request;