# SONG QUIZ - DATABASE MASTER CONTEXT

> SONG QUIZ 프로젝트 DB 최신 인수인계 문서.
> 새 채팅에서는 DB 관련 작업 시 이 문서를 기준으로 이어서 작업한다.
> 과거 DB 설계와 충돌하면 이 문서의 최신 상태를 우선한다.
> 프론트엔드 상세 구현 상태는 FRONTEND MASTER CONTEXT에서 별도로 관리한다.

---

# 1. 현재 DB 진행 상태

MySQL을 사용한다.

현재 DB 이름:

```text
song_quiz

DB 초기 구축 완료.

현재 완료된 작업:

DB 설계
↓
schema.sql 작성
↓
MySQL song_quiz 생성
↓
6개 테이블 생성
↓
PK / FK 설정
↓
INDEX 설정
↓
seed.sql 작성
↓
테스트 데이터 INSERT
↓
SELECT 테스트
↓
JOIN 테스트

DBeaver에서 실제 생성 및 조회까지 확인했다.

2. DB 파일 구조

프로젝트 내부에 별도의 database 폴더를 사용한다.

database/
├─ schema.sql
└─ seed.sql

역할:

schema.sql
→ DB / TABLE / FK / INDEX 생성

seed.sql
→ 개발용 테스트 데이터 생성

현재 두 파일은 다음 순서로 실행한다.

1. schema.sql
2. seed.sql
3. schema.sql 실행 정책

현재 개발 단계에서는 schema.sql 실행 시 기존 DB를 완전히 초기화한다.

맨 위에:

DROP DATABASE IF EXISTS song_quiz;

가 존재한다.

따라서:

기존 song_quiz 삭제
↓
새 song_quiz 생성
↓
테이블 생성
↓
FK 생성
↓
INDEX 생성

순서로 동작한다.

주의:

schema.sql을 실행하면 기존 데이터는 전부 삭제된다.

현재는 개발/테스트 단계이므로 의도된 동작이다.

실제 운영 환경에서는 이 방식으로 DB를 초기화하면 안 된다.

4. seed.sql 실행 정책

seed.sql은 빈 song_quiz DB에 테스트 데이터를 생성한다.

따라서 개발 중 DB 전체 초기화는:

schema.sql → Alt + X
seed.sql   → Alt + X

순서로 실행한다.

seed.sql만 반복 실행하면:

UNIQUE 충돌
테스트 데이터 중복

등이 발생할 수 있다.

따라서 현재 규칙은:

DB를 다시 초기화하고 싶다
→ schema.sql 실행
→ seed.sql 실행

이다.

5. DBeaver 실행 방법

여러 SQL문이 들어 있는 파일 전체 실행:

Alt + X

현재 SQL문 하나 실행:

Ctrl + Enter

초기에 Ctrl + Enter로 여러 CREATE TABLE 문을 한꺼번에 실행하려다 SQL 1064 오류가 발생했다.

schema.sql처럼 여러 SQL문으로 이루어진 파일은 Alt + X로 실행한다.

6. 현재 테이블

현재 총 6개 테이블.

users
song
game_record
post
comment
request

관계 개념:

USERS
 ├─ GAME_RECORD
 ├─ POST
 │    └─ COMMENT
 ├─ COMMENT
 └─ REQUEST

SONG
 └─ 현재 게임 출제용 독립 데이터
7. USERS

회원 정보를 저장한다.

테이블:

users

중요:

초기 설계에서는 user였지만 최종적으로 users로 변경했다.

주요 필드:

user_id
login_id
password
nickname
email
role
created_at
updated_at

구조 개념:

user_id
→ BIGINT
→ PK
→ AUTO_INCREMENT

login_id
→ UNIQUE
→ NOT NULL

password
→ VARCHAR(255)
→ NOT NULL

nickname
→ UNIQUE
→ NOT NULL

email
→ 선택 입력
→ NULL 허용
→ 입력된 값은 UNIQUE

role
→ USER / ADMIN
→ 기본 USER

회원 권한:

USER
ADMIN

게스트는 USERS 테이블에 저장하지 않는다.

게스트:

게임 플레이 가능
게임 기록 저장 X
랭킹 등록 X

회원:

게임 플레이 가능
게임 기록 저장
랭킹 등록 가능
8. 비밀번호 정책

현재 seed.sql에는 테스트 편의를 위해 평문 비밀번호가 들어 있다.

예:

test1234
admin1234

이것은 DB 테스트 전용.

실제 회원가입 구현 시 평문 비밀번호를 저장하면 안 된다.

최종 흐름:

사용자 비밀번호
↓
Backend
↓
Password Hash
↓
users.password

백엔드 구현 시 BCrypt 등의 password hashing 적용 필요.

9. SONG

게임에 출제되는 노래 정보.

주요 필드:

song_id
title
artist
category
audio_path
is_active
created_at

category:

KPOP
JPOP
POP

중요:

HARD는 SONG category가 아니다.

HARD는:

KPOP + JPOP + POP

전체 곡에서 출제되는 게임 모드다.

따라서 HARD는 game_record.mode에는 존재하지만 song.category에는 존재하지 않는다.

10. SONG.title UNIQUE 정책

title은 UNIQUE가 아니다.

이유:

같은 제목의 다른 곡이 존재할 수 있음
커버곡이 존재할 수 있음
가수가 다른 동일 제목 곡이 존재할 수 있음

따라서:

song_id

를 실제 식별자로 사용한다.

11. 음원 저장 정책

외부 음악 API는 현재 사용하지 않기로 결정했다.

시간 부족으로 인해 음악을 직접 등록한다.

노래 등록 시 필요한 정보를 직접 입력한다.

예:

제목
가수
장르
음원 파일

음원 자체를 DB BLOB으로 저장하지 않는다.

DB에는:

audio_path

만 저장한다.

예:

/music/kpop/test1.mp3

추후 실제 서버의 파일 저장 구조에 맞춰 변경한다.

향후 관리자용 음악 등록 페이지가 필요하다.

12. SONG 활성화 상태

필드:

is_active

목적:

노래 데이터를 실제로 삭제하지 않고 게임 출제 여부만 제어한다.

TRUE
→ 게임 출제 가능

FALSE
→ 게임 출제 제외
13. GAME_RECORD

회원의 한 게임 플레이 결과를 저장한다.

주요 필드:

record_id
user_id
mode
score
correct_count
total_questions
max_combo
play_time_seconds
played_at

mode:

KPOP
JPOP
POP
HARD

게임이 끝날 때마다 한 행을 저장하는 구조.

예:

회원 게임 시작
↓
게임 플레이
↓
게임 종료
↓
프론트에서 결과 생성
↓
Backend API
↓
GAME_RECORD INSERT

프론트에서 전달할 결과 예:

{
  "mode": "KPOP",
  "score": 12450,
  "correctCount": 23,
  "totalQuestions": 25,
  "maxCombo": 38,
  "playTimeSeconds": 252
}

user_id는 클라이언트가 임의로 결정하도록 두지 않고 추후 인증된 회원 정보를 기준으로 백엔드에서 처리하는 방향.

14. GAME_RECORD와 마이페이지

마이페이지에서 필요한 값은 GAME_RECORD를 집계해서 계산한다.

예:

총 플레이
최고 점수
평균 점수
평균 정답률
최대 콤보

테스트한 SQL 형태:

SELECT
    COUNT(*) AS total_play,
    MAX(score) AS best_score,
    ROUND(AVG(score)) AS average_score,
    ROUND(
        AVG(correct_count / total_questions * 100),
        1
    ) AS average_accuracy,
    MAX(max_combo) AS best_combo
FROM game_record
WHERE user_id = 1;

따라서 마이페이지 통계값을 별도 컬럼으로 USERS에 저장하지 않는다.

GAME_RECORD에서 계산한다.

15. 랭킹 정책

랭킹 전용 테이블은 만들지 않는다.

랭킹은 GAME_RECORD에서 계산한다.

기본 방향:

회원
+
게임 모드
+
최고 score

를 조회하여 순위를 만든다.

회원별 / 모드별 최고 점수 조회를 위해 인덱스 존재:

idx_game_record_user_mode_score

대상:

user_id
mode
score DESC
16. POST

게시판 게시글.

주요 필드:

post_id
user_id
board_type
title
content
view_count
created_at
updated_at

board_type:

NOTICE
EVENT
FREE

즉 게시판 종류마다 테이블을 따로 만들지 않는다.

하나의 POST 테이블에서:

board_type

으로 구분한다.

노래 요청 / 기술 문의는 POST에 넣지 않고 REQUEST에서 관리한다.

17. POST 작성자

POST에는 닉네임 문자열을 직접 저장하지 않는다.

저장:

user_id

조회 시:

POST.user_id
↓
USERS.user_id
↓
nickname

JOIN한다.

실제 JOIN 조회 테스트까지 완료.

예:

SELECT
    p.post_id,
    p.board_type,
    p.title,
    u.nickname AS author,
    p.view_count,
    p.created_at
FROM post p
JOIN users u
    ON p.user_id = u.user_id
ORDER BY p.created_at DESC;
18. POST INDEX

게시판 종류별 최신 글 조회를 위해:

idx_post_board_created

사용.

대상:

board_type
created_at DESC
19. COMMENT

게시글 댓글.

주요 필드:

comment_id
post_id
user_id
content
created_at
updated_at

관계:

POST 1 : N COMMENT

USERS 1 : N COMMENT

게시글 삭제 시:

ON DELETE CASCADE

로 댓글도 함께 삭제한다.

현재 회원 삭제 시에도 해당 회원 댓글을 CASCADE 삭제하는 설계다.

20. COMMENT 조회

게시글별 댓글 조회용 인덱스:

idx_comment_post_created

대상:

post_id
created_at

댓글 작성자 닉네임은 USERS와 JOIN한다.

테스트한 형태:

SELECT
    c.comment_id,
    c.post_id,
    u.nickname AS author,
    c.content,
    c.created_at,
    c.updated_at
FROM comment c
JOIN users u
    ON c.user_id = u.user_id
WHERE c.post_id = 3
ORDER BY c.created_at ASC;

실제 조회 테스트 완료.

21. REQUEST

노래 요청 / 기술 문의 / 기타 건의 관리.

POST와 별도 테이블로 관리한다.

주요 필드:

request_id
user_id
request_type
title
content
status
created_at
updated_at

request_type:

SONG_REQUEST
TECHNICAL
ETC

status:

PENDING
IN_PROGRESS
COMPLETED
REJECTED

의미:

PENDING
→ 처리 대기

IN_PROGRESS
→ 처리 중

COMPLETED
→ 처리 완료

REJECTED
→ 반려

기본값:

PENDING
22. REQUEST INDEX

요청 종류 / 처리 상태 / 최신순 조회용:

idx_request_type_status_created

대상:

request_type
status
created_at DESC

REQUEST와 USERS JOIN 조회 테스트 완료.

23. FK 정책

현재 주요 관계:

GAME_RECORD.user_id
→ USERS.user_id

POST.user_id
→ USERS.user_id

COMMENT.user_id
→ USERS.user_id

COMMENT.post_id
→ POST.post_id

REQUEST.user_id
→ USERS.user_id

현재 모두 필요한 위치에 FK 설정 완료.

삭제 정책은 현재 ON DELETE CASCADE 중심.

24. 현재 테스트 데이터

seed.sql 기준 초기 테스트 데이터:

USERS
2명

SONG
3곡

GAME_RECORD
5개

POST
4개

COMMENT
2개

REQUEST
2개

회원:

user_id 1
testuser
MUSICMAN
USER

user_id 2
admin
관리자
ADMIN

schema.sql 실행 후 AUTO_INCREMENT가 초기화되므로 seed.sql에서는 위 ID를 기준으로 FK 테스트 데이터를 생성한다.

25. 테스트 SONG

현재 테스트용:

테스트 KPOP 1
테스트 JPOP 1
테스트 POP 1

각각:

KPOP
JPOP
POP

category 테스트에 사용.

실제 서비스 곡은 추후 직접 등록한다.

26. DB 검증 완료 항목

DBeaver에서 다음 작업을 실제로 확인했다.

CREATE DATABASE
CREATE TABLE
CREATE INDEX

INSERT USERS
INSERT SONG
INSERT GAME_RECORD
INSERT POST
INSERT COMMENT
INSERT REQUEST

SELECT
JOIN

DESCRIBE users를 통해:

PK
AUTO_INCREMENT
UNIQUE
NULL
DEFAULT
ENUM
DATETIME

등이 의도대로 생성된 것도 확인했다.

27. 초기 발생했던 DBeaver 문제

초기에 다음 오류 발생:

Access denied for user 'db0811'@'localhost'

기존 SQL 공부용 연결/계정을 사용해서 발생.

현재는 MySQL root 연결을 사용하여 DB 생성 작업 진행.

또한:

No database selected

오류가 발생했었다.

해결:

USE song_quiz;

실행 후:

SELECT DATABASE();

결과가:

song_quiz

인 것을 확인.

28. SQL 1064 문제

여러 SQL문을 DBeaver에서 잘못 실행하면서:

SQL Error [1064]

가 발생했다.

원인은 schema 설계 자체가 아니라 DBeaver 실행 방식.

현재 규칙:

Ctrl + Enter
→ 현재 SQL문 실행

Alt + X
→ SQL Script 전체 실행

schema.sql, seed.sql 전체 실행은 Alt + X.

29. 아직 하지 않은 것

현재 DB 구조는 만들어졌지만 애플리케이션과 연결하지 않았다.

아직 미구현:

Backend MySQL 연결

실제 회원가입 INSERT

실제 로그인 조회

실제 SONG 조회

게임 종료 GAME_RECORD INSERT

실제 랭킹 조회

실제 마이페이지 통계 조회

POST CRUD

COMMENT CRUD

REQUEST CRUD

관리자 음악 등록

실제 음원 파일 관리
30. 향후 마이그레이션

현재 개발 초기에는:

DROP DATABASE
→ CREATE DATABASE

방식으로 전체 초기화한다.

프로젝트가 진행되어 실제 데이터 보존이 필요해지면 이 방식을 중단한다.

그 이후에는:

database/
├─ schema.sql
├─ seed.sql
└─ migrations/

형태를 검토한다.

예:

001_initial.sql
002_add_song_column.sql
003_change_game_record.sql

현재 단계에서는 migrations를 만들지 않는다.

31. DB 설계 핵심 결정 요약

반드시 유지할 현재 결정:

게스트는 USERS에 저장하지 않는다.

SONG.title은 UNIQUE가 아니다.

HARD는 SONG.category가 아니다.

HARD는 GAME_RECORD.mode에는 존재한다.

음원은 DB에 직접 저장하지 않는다.
audio_path만 저장한다.

GAME_RECORD는 한 게임의 최종 결과를 저장한다.

랭킹 테이블은 만들지 않는다.

랭킹은 GAME_RECORD 최고 점수로 계산한다.

POST는 NOTICE / EVENT / FREE를 하나의 테이블로 관리한다.

COMMENT는 POST와 USERS를 FK로 참조한다.

REQUEST는 POST와 분리한다.

마이페이지 통계는 GAME_RECORD를 집계해서 계산한다.
32. 다음 작업 시작점

DB 1차 구축 완료.

현재 흐름:

프론트 주요 화면 구현
↓
DB 설계
↓
schema.sql 완료
↓
seed.sql 완료
↓
DB 생성/INSERT/JOIN 검증 완료
↓
★ BACKEND 시작

다음 작업:

backend 프로젝트 생성
↓
MySQL song_quiz 연결
↓
간단한 조회 API 생성
↓
DB ↔ Backend 연결 확인
↓
Frontend ↔ Backend 통신 확인

처음부터 모든 API를 만들지 않는다.

첫 목표는:

백엔드에서 MySQL song_quiz에 정상적으로 접속하고 실제 데이터를 하나 조회하는 것.

이것이 성공한 후 회원가입/로그인 등 실제 기능 구현으로 진행한다.