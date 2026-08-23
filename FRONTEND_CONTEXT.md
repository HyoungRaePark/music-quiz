# SONG QUIZ - FRONTEND CONTEXT

> SONG QUIZ 프로젝트 프론트엔드 작업 인수인계 문서
> 프론트엔드의 현재 구현 상태와 다음 작업을 기록한다.
> DB / 백엔드 상세 내용은 별도 문서에서 관리한다.

---

## 1. 프로젝트 개요

음악을 듣고 제목을 맞히는 웹 게임 `SONG QUIZ`.

현재 프론트엔드 주요 화면 구현은 거의 완료된 상태이며,
mock / 하드코딩 데이터를 사용하고 있다.

다음 단계부터 백엔드 API와 실제 데이터를 연결한다.

---

## 2. 기술 스택

- Next.js (App Router)
- React
- TypeScript
- SCSS
- SCSS Module
- Web Audio API
- Canvas API

스타일은 주로 `src/styles`에서 관리한다.

---

## 3. 현재 페이지 구조

```text
/
│
└─ /game
   │
   ├─ /game/mode
   │    └─ /game/play?mode=K-POP
   │
   ├─ /game/ranking
   │
   ├─ /game/board
   │    └─ 게시글 상세
   │
   └─ 회원 관련 화면
        ├─ 로그인
        ├─ 회원가입
        └─ 마이페이지
             └─ 모드별 전체 기록
4. 메인 화면

상태: 완료

구현:

SONG QUIZ 타이틀
GAME START
RANKING
메인 배경
BGM ON/OFF
AudioVisualizer
LED / EDM 스타일 파형
좌우 원근감
바닥 반사 효과
기본 반응형

GAME START:

/ → /game
5. 취향 선택 /game

상태: 완료

구현:

클럽 배경
고양이 마스코트
대사창
J-POP / K-POP / POP 선택
추천 장르 결정
선택 카드 애니메이션
결과 문구
뒤로가기 / 건너뛰기

선택한 장르는 모드 선택 화면에서 추천 모드를 표시하는 데 사용한다.

6. 모드 선택 /game/mode

상태: 완료

모드:

K-POP
J-POP
POP
HARD

구현:

장르별 카드
LP 디자인
장르 이미지
PLAY 버튼
추천 모드 표시
hover 미리듣기
네온 애니메이션
HARD 잠금 UI

HARD는 SONG의 장르가 아니다.

KPOP + JPOP + POP 전체에서 출제되는 고난도 게임 모드

현재 실제 해금 판정은 구현하지 않았다.

7. 게임 플레이 /game/play

상태: 핵심 기능 완료

주소:

/game/play?mode=K-POP
/game/play?mode=J-POP
/game/play?mode=POP

구현:

모드 표시
음악 재생
정답 입력
제한시간
목숨
점수
콤보
정답 처리
오답 처리
시간초과 처리
다음 문제
게임오버

게임 규칙:

목숨: 3

정답
→ 점수 증가
→ combo 증가

오답
→ 목숨 감소 없음
→ 시간 계속 진행

시간초과
→ 목숨 -1

목숨 0
→ GAME OVER

시간초과 이후 정답 입력이 가능했던 문제는 수정 완료.

현재 테스트 곡 / 음원은 mock 데이터 사용.

8. 게임 결과 화면

상태: 완료

구현:

GAME OVER
맞힌 문제 수
최종 점수
BEST SCORE
등급
신기록 표시
다시 도전
나가기
TIP

나가기:

/game/mode

실제 개인 BEST SCORE는 추후 서버 기록과 연결한다.

9. 랭킹 /game/ranking

상태: UI 구현 완료

현재 mock 데이터를 사용한다.

구현:

전체 랭킹
모드별 랭킹
순위
닉네임
점수
기록 정보
기존 SONG QUIZ 디자인 유지

실제 랭킹 데이터는 추후 API로 교체한다.

10. 게시판 /game/board

상태: UI / 기본 동작 구현 완료

게시판 종류:

NOTICE
EVENT
FREE

구현:

게시글 목록
공지 포함 페이지네이션
페이지당 10개 표시
게시글 상세 이동
게시글 작성 관련 UI
기존 사이드바 사용
게시글 개수가 적어져도 레이아웃 높이가 크게 변하지 않도록 처리

페이지네이션은 게시글 개수에 따라 위로 올라오지 않도록
카드 영역의 높이를 고정/보정했다.

11. 게시글 상세 / 댓글

상태: UI 구현 완료

구현:

게시글 제목
작성자
작성일
조회수
본문
댓글 목록
댓글 입력
수정 / 삭제 관련 UI

현재 실제 서버 데이터가 아닌 mock 데이터를 사용한다.

12. 회원 기능

상태: 프론트 UI 구현 완료

구현:

로그인
회원가입
Guest 상태
회원 상태에 따른 화면
로그아웃 UI

실제 인증은 아직 연결하지 않았다.

현재 Guest / 사용자 정보는 임시 상태값을 사용한다.

13. 마이페이지

상태: UI 구현 완료

기존 SONG QUIZ 사이드바 디자인을 활용한다.

구현:

회원 정보
게임 통계
모드별 기록
작성 게시글
로그아웃
안내 영역

게임 통계 예:

총 플레이
최고 점수
평균 점수
평균 정답률
최대 콤보

현재 숫자는 mock 데이터다.

14. 모드별 전체 기록

상태: UI 구현 완료

구현:

모드 필터
플레이 기록 목록
점수
정답 수
최대 콤보
플레이 시간
플레이 날짜
상세보기
페이지네이션

불필요하다고 판단하여 제외:

기록 삭제
시간대별 점수 추이 그래프

페이지네이션 위치가 데이터 개수에 따라 움직이지 않도록
기록 카드 영역 높이를 보정했다.

15. GameHeader

공용 게임 헤더.

구성:

[Equalizer] SONG QUIZ    GAME RANKING BOARD    [Profile] Guest ⚙

라우팅:

SONG QUIZ → /
GAME      → /game/mode
RANKING   → /game/ranking
BOARD     → /game/board

사용자 영역은 추후 실제 로그인 정보와 연결한다.

16. BGM

BgmProvider.tsx에서 전역 관리.

주요 기능:

페이지별 BGM
BGM ON/OFF
장르 카드 preview
preview 종료 후 기존 BGM 재개
AbortError 처리

현재 새로고침 시 BGM 상태는 초기화된다.

17. 현재 프론트 데이터 상태

현재 대부분의 데이터는 mock / 하드코딩이다.

예:

사용자
노래
게임 기록
랭킹
게시글
댓글
마이페이지 통계

이것은 임시 상태이며 추후 API 응답으로 교체한다.

예:

현재

const mockRecords = [...]

↓

추후

fetch(...)
→ Backend API
→ 실제 데이터
18. 반응형

일부 화면은 반응형 처리가 되어 있다.

현재 원칙:

기능 완성
↓
API 연결
↓
전체 화면 확인
↓
마지막에 반응형/QHD 정리

기능 구현 중 불필요한 미세 디자인 수정은 최소화한다.

19. 프론트엔드 현재 상태
메인                 완료
취향 선택             완료
모드 선택             완료
게임 플레이           완료
정답/오답/시간초과     완료
게임오버              완료

랭킹                  완료
게시판                완료
게시글 상세 / 댓글      완료
로그인 / 회원가입       완료
마이페이지             완료
모드별 전체 기록        완료

공통 Header 라우팅      완료
주요 화면 이동          완료

프론트 주요 화면은 사실상 1차 구현 완료 상태.

20. 앞으로 수정될 부분

백엔드 연결 후 현재 mock 데이터를 실제 데이터로 교체한다.

게임 플레이
→ 실제 SONG 데이터

게임 종료
→ 게임 기록 저장

랭킹
→ 실제 회원 최고 기록 조회

게시판
→ 실제 게시글 조회 / 작성 / 수정 / 삭제

댓글
→ 실제 댓글 조회 / 작성 / 수정 / 삭제

로그인
→ 실제 인증

마이페이지
→ 실제 회원 정보 / 게임 기록 조회
21. 개발 진행 원칙
나 한테 줄 필요없어 어차피 다음의 너가 읽을꺼라서 
너가 읽기 편하게 정리해서 md 형태로줘

응. 그러면 사람한테 보여주기 위한 예쁜 문서보다 다음 채팅의 내가 프로젝트 상태를 빠르게 복구할 수 있는 인수인계용 MD로 만드는 게 맞아.

기존 파일은 초반 내용이 많이 남아 있어서, 지금 시점 기준으로는 특히 랭킹/게시판이 다음 작업이라고 되어 있는 부분 등이 이미 오래됐어.

다음처럼 정리해서 저장하면 돼.

# SONG QUIZ - FRONTEND MASTER CONTEXT

> SONG QUIZ 프론트엔드 최신 인수인계 문서.
> 새 채팅에서는 이 문서를 현재 상태의 기준으로 사용한다.
> 과거 대화/문서와 충돌하면 이 문서의 내용을 우선한다.
> DB 관련 상세 내용은 별도의 DB 인수인계 MD에서 관리한다.

---

# 1. 프로젝트 개요

음악을 듣고 제목을 맞히는 웹 게임 `SONG QUIZ`.

프론트엔드의 주요 화면과 게임 흐름은 대부분 구현 완료된 상태다.

기술 스택:

- Next.js App Router
- React
- TypeScript
- SCSS
- SCSS Module
- Web Audio API
- Canvas API

스타일 파일은 주로 `src/styles`에서 관리한다.

디자인 컨셉:

- 네온 / EDM / 클럽
- 어두운 배경
- 파랑 / 보라 / 핑크 네온
- 음악에 반응하는 듯한 시각 효과

---

# 2. 주요 페이지

현재 주요 라우팅:

```text
/
└─ 메인

/game
└─ 취향 선택

/game/mode
└─ 게임 모드 선택

/game/play?mode=K-POP
└─ 실제 게임

/game/ranking
└─ 랭킹

/game/board
└─ 게시판

회원 관련 페이지
└─ 로그인 / 회원가입 / 마이페이지 등 구현

프론트의 핵심 화면 구현은 대부분 완료되었다.

3. 메인 화면

메인 화면은 완료 상태.

구현:

SONG QUIZ 로고
GAME START
RANKING
BGM ON/OFF
AudioVisualizer
LED / EDM Spectrum 효과
좌우 원근감
바닥 반사 효과
기본 반응형

메인 화면 디자인은 특별한 문제가 없다면 다시 크게 수정하지 않는다.

4. 취향 선택 /game

구현 완료.

기능:

마스코트
말풍선
대화 진행
취향 선택 패널
J-POP / K-POP / POP 선택
선택 변경 가능
추천 문구
카드 애니메이션
기본 반응형

선택한 취향은 모드 선택 화면의 추천 모드 표시에 사용한다.

5. 모드 선택 /game/mode

구현 완료.

모드:

K-POP
J-POP
POP
HARD

각 카드:

장르 이미지
LP
장르 아이콘
설명
곡 수
난이도
PLAY

현재 곡 수 등 일부 데이터는 mock/hardcoding 상태.

HARD:

일반 SONG category가 아님.
KPOP/JPOP/POP 전체에서 출제되는 고난도 게임 모드.
회원 기록 기반 해금 기능은 실제 데이터 연결 후 구현.

카드 hover 시 장르별 preview 음악 재생 기능 존재.

6. 게임 플레이 /game/play

핵심 게임 로직 구현 완료.

게임 규칙:

기본 제한시간 최종 목표: 문제당 30초
목숨 3개
정답 시 점수 획득
남은 시간 기반 보너스
정답 시 combo 증가
오답 입력 시 목숨 감소 없음
오답 중에도 시간은 계속 흐름
시간초과 시 목숨 -1
목숨 0 → GAME OVER
한 게임에서 같은 곡 중복 출제 방지

현재 테스트용 곡/음원 데이터를 사용한다.

중요 수정 완료:

시간초과 후 정답 입력이 가능했던 버그 수정
시간초과 후에는 입력/정답 처리가 되지 않도록 처리

결과 컴포넌트:

CorrectResult.tsx
WrongResult.tsx
TimeoutResult.tsx
GameOver 관련 컴포넌트

정답 / 오답 / 시간초과 UI는 분리되어 있다.

7. GAME OVER

게임 종료 화면 구현 완료.

표시 정보:

맞힌 문제 수
최종 점수
BEST SCORE
등급
신기록 여부
다시 도전
나가기
TIP

GameOver 컴포넌트는 onExit을 props로 받는다.

실제 페이지에서:

const handleExit = () => {
  stopMusic();
  router.push("/game/mode");
};

형태로 처리.

따라서 GAME OVER의 나가기는 메인 /이 아니라:

/game/mode

로 이동한다.

8. GameHeader

공용 게임 헤더 사용.

구성:

[Equalizer] SONG QUIZ     GAME RANKING BOARD     [프로필] Guest ⚙

Navigation:

GAME
→ /game/mode

RANKING
→ /game/ranking

BOARD
→ /game/board

SONG QUIZ 로고도 클릭 시 메인 화면으로 이동하도록 수정하는 방향으로 작업했다.

Guest/프로필 영역 역시 단순 장식 상태에서 실제 이동/동작이 가능하도록 수정 진행.

헤더 SCSS:

fixed
height 76px
네온 border
backdrop blur
navigation hover underline
Equalizer 로고
SONG / QUIZ 네온
프로필 영역
설정 버튼 hover
9. 랭킹 /game/ranking

화면 구현 완료.

현재 실제 DB 데이터가 아니라 mock 데이터를 사용한다.

향후 실제 GAME_RECORD 데이터와 연결한다.

랭킹은 별도 DB 테이블을 만들지 않고 회원별/모드별 최고 점수를 기준으로 구성하는 방향이다.

10. 게시판 /game/board

게시판 UI 구현 완료.

게시판 종류:

NOTICE
EVENT
FREE

노래 요청/문의는 일반 POST와 DB 구조를 분리하는 방향.

게시판 페이지에서 pagination 구현.

중요:

한 페이지에 공지를 포함하여 총 10개 정도가 보이도록 조정
React key 중복 문제(NOTICE-공지)가 있었으며 key가 고유하도록 수정
게시글 수가 적은 페이지에서 pagination 위치가 위로 올라가는 현상 수정

게시판 카드 영역은 게시글 수에 따라 높이가 크게 흔들리지 않도록 최소 높이를 사용한다.

예:

.myPostCard {
  min-height: ...;
}

페이지네이션이 게시글 개수에 따라 위아래로 움직이지 않는 것이 중요하다.

11. 게시글 상세 / 댓글

게시글 상세 화면 및 댓글 UI 구현.

지원하는 화면 기능:

게시글 내용 표시
작성자
작성일
조회수
댓글 목록
댓글 작성
댓글 수정/삭제 UI

현재 실제 DB/API 연결 전이므로 mock 데이터 중심.

12. 마이페이지

기존 공용 사이드바를 활용하여 마이페이지 관련 화면을 구성했다.

주요 영역:

프로필
게임 기록
내가 작성한 글
요청/문의 관련 영역

게임 기록 화면에는:

총 플레이
최고 점수
평균 점수
정답률
최대 콤보
모드별 기록

등을 표시하는 방향.

모드별 전체 기록 화면도 구현.

불필요하다고 판단하여 제외:

기록 삭제 기능
시간대별 점수 추이 그래프

모드별 기록 화면은 오른쪽의 빈 공간을 활용하도록 레이아웃을 수정했다.

pagination은 데이터 개수가 적더라도 위치가 크게 변하지 않도록 SCSS를 조정했다.

13. 사이드바

회원 관련 화면에서는 기존 사이드바 디자인을 공통으로 활용한다.

새로운 별도 디자인을 만드는 것보다 기존 UI의 일관성을 유지하는 방향.

페이지별 콘텐츠만 변경하고 사이드바 구조는 최대한 재사용한다.

14. BGM

BgmProvider.tsx에서 전역 BGM 관리.

주요 기능:

페이지별 BGM
BGM ON/OFF
장르 카드 hover preview
preview 종료 후 기존 BGM 이어서 재생

주요 Context:

type BgmContextType = {
  isPlaying: boolean;
  toggleBgm: () => void;
  analyser: AnalyserNode | null;
  playPreview: (src: string) => void;
  stopPreview: () => void;
};

BGM OFF 상태에서는 preview도 재생하지 않는다.

빠른 hover로 발생하는 AbortError는 정상적인 재생 취소 상황으로 처리.

15. AudioVisualizer

Web Audio API + Canvas API 사용.

메인 화면의 시각적 음악 효과 담당.

variant:

type AudioVisualizerProps = {
  variant: "top" | "left" | "right";
};

좌우 Visualizer는 perspective/rotateY를 사용하여 중앙으로 들어가는 클럽/터널 느낌을 만든다.

게임 플레이 화면 LP 양옆의 waveform은 별도의 SVG 기반 장식 애니메이션이다.

16. Mock 데이터 정책

현재 프론트에는 아직 mock/hardcoding 데이터가 남아 있다.

예:

노래
곡 수
랭킹
게임 기록
게시글
댓글
회원 정보

이것은 의도된 상태.

백엔드/API 연결 단계에서 하나씩 실제 데이터로 교체한다.

17. 실제 데이터 연결 시 게임 기록 흐름

최종 구조:

사용자 게임 플레이
↓
게임 종료
↓
프론트에서 결과 계산

mode
score
correctCount
totalQuestions
maxCombo
playTimeSeconds

↓
백엔드 API 전송
↓
DB GAME_RECORD 저장
↓
마이페이지 / 랭킹 조회

게스트는 게임 가능하지만 게임 기록/랭킹에는 등록하지 않는다.

회원만 기록을 저장한다.

18. 현재 DB 관련 상태

DB 상세 설계는 별도의 DB MD에서 관리한다.

현재 MySQL song_quiz 데이터베이스 구축까지 진행했다.

프론트 관점에서 알아둘 핵심 테이블:

users
song
game_record
post
comment
request

DB 스키마 및 seed 파일은 프로젝트의 database 폴더에서 관리한다.

database/
├─ schema.sql
└─ seed.sql

프론트 인수인계 문서에는 DB 상세 컬럼/SQL을 중복 작성하지 않는다.

19. 프론트 ↔ DB 연결 예정 영역

향후 mock 데이터를 실제 API로 교체해야 하는 주요 부분:

로그인 / 회원가입
↓
회원 정보

게임 플레이
↓
SONG 조회

게임 종료
↓
GAME_RECORD 저장

랭킹
↓
GAME_RECORD 조회

마이페이지
↓
회원별 GAME_RECORD 조회

게시판
↓
POST 조회/작성/수정/삭제

댓글
↓
COMMENT 조회/작성/수정/삭제

요청
↓
REQUEST 조회/작성
20. 현재 프론트 상태

큰 화면 기준으로 프론트엔드 구현은 대부분 완료된 상태.

완료/구현된 주요 영역:

메인
↓
취향 선택
↓
모드 선택
↓
게임 플레이
↓
정답/오답/시간초과
↓
GAME OVER
↓
랭킹
↓
게시판
↓
게시글 상세/댓글
↓
회원 관련 화면
↓
마이페이지
↓
게임 기록

현재 단계에서는 프론트 UI를 계속 추가하는 것보다 실제 데이터 연결 단계로 넘어가는 것이 우선이다.

21. 남은 프론트 작업

백엔드 연결 전/후 확인할 항목:

Header 전체 라우팅 최종 확인
SONG QUIZ 로고 → 메인 이동
Guest/회원 프로필 동작
실제 로그인 상태에 따른 Header 변경
mock 데이터 제거
실제 API 데이터 연결
에러/로딩 상태
전체 반응형 최종 점검
세세한 UI 버그 정리

반응형/QHD 미세조정은 기능 연결 후 한 번에 정리한다.

22. 개발 진행 원칙

이 프로젝트는 사용자가 직접 배우면서 구현한다.

진행 방식:

지금 할 것 하나
↓
적용
↓
결과 확인
↓
다음 작업

중요:

한 번에 너무 많은 파일을 수정하지 않는다.
무엇을 왜 수정하는지 설명한다.
정상 작동하는 코드를 불필요하게 갈아엎지 않는다.
디자인 수정과 기능 수정을 동시에 크게 하지 않는다.
현재 코드를 추측하지 않는다.
필요한 경우 사용자의 현재 코드를 먼저 확인한다.
전체 코드를 요청하면 복붙 가능한 전체 코드로 제공한다.
이미 완료된 UI를 계속 미세조정하기보다 다음 기능으로 진행한다.
큰 기능을 먼저 완성하고 자잘한 문제는 이후 정리한다.
23. 다음 작업 시작점

현재 프론트 주요 구현과 DB 초기 구축까지 진행했다.

다음 단계:

프론트 주요 화면 구현 완료
↓
DB schema / seed 구축
↓
★ 백엔드 프로젝트 생성
↓
MySQL 연결
↓
간단한 조회 API로 연결 확인
↓
로그인 / 회원가입
↓
프론트 mock 데이터 → API 데이터 교체
↓
게임 기록 저장
↓
랭킹 / 마이페이지 실제 데이터 연결
↓
게시판 / 댓글 / 요청 CRUD 연결

다음 채팅에서는 프론트 화면을 처음부터 다시 만들지 않는다.

가장 먼저 할 일:

backend 프로젝트를 생성하고 MySQL song_quiz 연결부터 시작한다.

DB의 정확한 최신 스키마/seed 내용은 별도의 DB 인수인계 MD를 기준으로 확인한다.
