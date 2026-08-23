-- ==================================================
-- SONG QUIZ DATABASE SCHEMA
--
-- SONG QUIZ 프로젝트에서 사용하는 데이터베이스와
-- 테이블, 외래키, 인덱스를 생성한다.
--
-- 주의:
-- 실행 시 기존 song_quiz 데이터베이스를 삭제하고
-- 처음부터 다시 생성한다.
-- 개발 / 테스트 환경에서만 사용한다.
-- ==================================================


-- ==================================================
-- DATABASE 초기화
-- ==================================================

-- 기존 데이터베이스가 존재하면 삭제한다.
-- 기존 테이블과 데이터도 모두 삭제된다.
DROP DATABASE IF EXISTS song_quiz;


-- SONG QUIZ 전용 데이터베이스 생성
-- 한글, 일본어 등 다양한 문자를 저장하기 위해
-- utf8mb4 문자셋을 사용한다.
CREATE DATABASE song_quiz
    DEFAULT CHARACTER SET utf8mb4
    COLLATE utf8mb4_0900_ai_ci;


-- 앞으로 실행되는 SQL이
-- song_quiz 데이터베이스를 사용하도록 지정한다.
USE song_quiz;


-- ==================================================
-- USERS
-- 회원 정보를 저장하는 테이블
-- ==================================================

CREATE TABLE users (

    -- 회원 고유 번호
    -- 내부적으로 회원을 구분하기 위한 PK
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,

    -- 로그인할 때 사용하는 아이디
    -- 같은 아이디로 가입할 수 없도록 UNIQUE 설정
    login_id VARCHAR(50)
        NOT NULL
        UNIQUE,

    -- 회원 비밀번호
    -- 실제 서비스에서는 평문이 아닌
    -- 백엔드에서 암호화된 비밀번호를 저장한다.
    password VARCHAR(255)
        NOT NULL,

    -- 게시판, 댓글 등에 표시되는 닉네임
    -- 닉네임 중복을 허용하지 않는다.
    nickname VARCHAR(50)
        NOT NULL
        UNIQUE,

    -- 이메일
    -- 선택 입력이므로 NULL을 허용한다.
    -- 입력된 이메일끼리는 중복되지 않도록 UNIQUE 설정
    email VARCHAR(100)
        UNIQUE,

    -- 회원 권한
    -- USER  : 일반 회원
    -- ADMIN : 관리자
    role ENUM(
        'USER',
        'ADMIN'
    )
        NOT NULL
        DEFAULT 'USER',

    -- 회원 가입 시간
    created_at DATETIME
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    -- 회원정보 마지막 수정 시간
    -- 회원정보가 UPDATE되면 자동으로 현재 시간으로 변경된다.
    updated_at DATETIME
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- ==================================================
-- SONG
-- 게임에 출제되는 음악 정보를 저장하는 테이블
-- ==================================================

CREATE TABLE song (

    -- 노래 고유 번호
    song_id BIGINT AUTO_INCREMENT PRIMARY KEY,

    -- 노래 제목
    -- 커버곡 등 동일한 제목이 존재할 수 있으므로
    -- UNIQUE는 사용하지 않는다.
    title VARCHAR(200)
        NOT NULL,

    -- 가수명
    artist VARCHAR(200)
        NOT NULL,

    -- 노래 장르
    --
    -- KPOP : 한국 음악
    -- JPOP : 일본 음악
    -- POP  : 해외 POP
    --
    -- HARD는 노래의 장르가 아니라
    -- 여러 장르가 출제되는 게임 모드이므로 포함하지 않는다.
    category ENUM(
        'KPOP',
        'JPOP',
        'POP'
    )
        NOT NULL,

    -- 서버에 저장된 실제 음원 파일의 경로
    audio_path VARCHAR(500)
        NOT NULL,

    -- 게임 출제 가능 여부
    --
    -- TRUE  : 출제 가능
    -- FALSE : 출제하지 않음
    --
    -- 노래 데이터를 삭제하지 않고
    -- 게임에서만 제외할 수 있도록 사용한다.
    is_active BOOLEAN
        NOT NULL
        DEFAULT TRUE,

    -- 노래가 등록된 시간
    created_at DATETIME
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
);


-- ==================================================
-- GAME_RECORD
-- 회원의 게임 플레이 결과를 저장하는 테이블
-- ==================================================

CREATE TABLE game_record (

    -- 게임 기록 고유 번호
    record_id BIGINT AUTO_INCREMENT PRIMARY KEY,

    -- 게임을 플레이한 회원
    user_id BIGINT
        NOT NULL,

    -- 플레이한 게임 모드
    --
    -- KPOP / JPOP / POP : 장르별 게임
    -- HARD              : 전체 장르 혼합 게임
    mode ENUM(
        'KPOP',
        'JPOP',
        'POP',
        'HARD'
    )
        NOT NULL,

    -- 게임 최종 점수
    score INT
        NOT NULL
        DEFAULT 0,

    -- 맞힌 문제 수
    correct_count INT
        NOT NULL
        DEFAULT 0,

    -- 해당 게임에서 출제된 전체 문제 수
    total_questions INT
        NOT NULL,

    -- 해당 게임에서 달성한 최대 콤보
    max_combo INT
        NOT NULL
        DEFAULT 0,

    -- 게임 플레이 시간
    -- 초 단위로 저장한다.
    --
    -- 예:
    -- 252초 → 화면에서는 04:12로 변환
    play_time_seconds INT
        NOT NULL,

    -- 게임 플레이 완료 시간
    played_at DATETIME
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    -- GAME_RECORD의 user_id와
    -- USERS의 user_id를 연결한다.
    --
    -- 회원이 삭제되면 해당 회원의
    -- 게임 기록도 함께 삭제된다.
    CONSTRAINT fk_game_record_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);


-- 회원별 / 모드별 최고 점수를 빠르게 조회하기 위한 인덱스
--
-- 마이페이지 및 랭킹 조회 등에 사용한다.
CREATE INDEX idx_game_record_user_mode_score
ON game_record (
    user_id,
    mode,
    score DESC
);


-- ==================================================
-- POST
-- 일반 게시판 게시글을 저장하는 테이블
-- ==================================================

CREATE TABLE post (

    -- 게시글 고유 번호
    post_id BIGINT AUTO_INCREMENT PRIMARY KEY,

    -- 게시글 작성 회원
    user_id BIGINT
        NOT NULL,

    -- 게시판 종류
    --
    -- NOTICE : 공지사항
    -- EVENT  : 이벤트
    -- FREE   : 자유게시판
    --
    -- 노래 요청 / 문의는 REQUEST 테이블에서
    -- 별도로 관리한다.
    board_type ENUM(
        'NOTICE',
        'EVENT',
        'FREE'
    )
        NOT NULL,

    -- 게시글 제목
    title VARCHAR(200)
        NOT NULL,

    -- 게시글 본문
    content TEXT
        NOT NULL,

    -- 게시글 조회수
    view_count INT
        NOT NULL
        DEFAULT 0,

    -- 게시글 작성 시간
    created_at DATETIME
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    -- 게시글 마지막 수정 시간
    updated_at DATETIME
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    -- POST의 user_id와
    -- USERS의 user_id를 연결한다.
    --
    -- 회원이 삭제되면 해당 회원이 작성한
    -- 게시글도 함께 삭제된다.
    CONSTRAINT fk_post_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);


-- 게시판 종류별 게시글을
-- 최신순으로 조회하기 위한 인덱스
CREATE INDEX idx_post_board_created
ON post (
    board_type,
    created_at DESC
);


-- ==================================================
-- COMMENT
-- 게시글에 작성된 댓글을 저장하는 테이블
-- ==================================================

CREATE TABLE comment (

    -- 댓글 고유 번호
    comment_id BIGINT AUTO_INCREMENT PRIMARY KEY,

    -- 댓글이 작성된 게시글
    post_id BIGINT
        NOT NULL,

    -- 댓글 작성 회원
    user_id BIGINT
        NOT NULL,

    -- 댓글 내용
    content VARCHAR(1000)
        NOT NULL,

    -- 댓글 작성 시간
    created_at DATETIME
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    -- 댓글 마지막 수정 시간
    updated_at DATETIME
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    -- COMMENT의 post_id와
    -- POST의 post_id를 연결한다.
    --
    -- 게시글이 삭제되면
    -- 해당 게시글의 댓글도 함께 삭제된다.
    CONSTRAINT fk_comment_post
        FOREIGN KEY (post_id)
        REFERENCES post(post_id)
        ON DELETE CASCADE,

    -- COMMENT의 user_id와
    -- USERS의 user_id를 연결한다.
    --
    -- 회원이 삭제되면
    -- 해당 회원의 댓글도 함께 삭제된다.
    CONSTRAINT fk_comment_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);


-- 특정 게시글의 댓글을
-- 작성시간 순으로 조회하기 위한 인덱스
CREATE INDEX idx_comment_post_created
ON comment (
    post_id,
    created_at
);


-- ==================================================
-- REQUEST
-- 노래 요청 / 기술 문의 / 기타 건의를 저장하는 테이블
-- ==================================================

CREATE TABLE request (

    -- 요청 고유 번호
    request_id BIGINT AUTO_INCREMENT PRIMARY KEY,

    -- 요청 작성 회원
    user_id BIGINT
        NOT NULL,

    -- 요청 종류
    --
    -- SONG_REQUEST : 노래 추가 요청
    -- TECHNICAL    : 기술 / 게임 관련 문의
    -- ETC          : 기타 건의
    request_type ENUM(
        'SONG_REQUEST',
        'TECHNICAL',
        'ETC'
    )
        NOT NULL,

    -- 요청 제목
    title VARCHAR(200)
        NOT NULL,

    -- 요청 내용
    content TEXT
        NOT NULL,

    -- 요청 처리 상태
    --
    -- PENDING     : 처리 대기
    -- IN_PROGRESS : 처리 중
    -- COMPLETED   : 처리 완료
    -- REJECTED    : 반려
    status ENUM(
        'PENDING',
        'IN_PROGRESS',
        'COMPLETED',
        'REJECTED'
    )
        NOT NULL
        DEFAULT 'PENDING',

    -- 요청 작성 시간
    created_at DATETIME
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    -- 요청 내용 수정 또는
    -- 처리 상태가 변경된 마지막 시간
    updated_at DATETIME
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    -- REQUEST의 user_id와
    -- USERS의 user_id를 연결한다.
    --
    -- 회원이 삭제되면
    -- 해당 회원의 요청도 함께 삭제된다.
    CONSTRAINT fk_request_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);


-- 요청 종류 / 처리 상태별 데이터를
-- 최신순으로 조회하기 위한 인덱스
CREATE INDEX idx_request_type_status_created
ON request (
    request_type,
    status,
    created_at DESC
);


-- ==================================================
-- SCHEMA 생성 완료
-- ==================================================