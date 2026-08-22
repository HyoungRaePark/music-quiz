# SONG QUIZ - MASTER PROJECT CONTEXT

> 이 문서는 SONG QUIZ 프로젝트의 최신 인수인계 문서입니다.
> 새 채팅에서는 과거 인수인계 파일 여러 개를 다시 읽기보다 이 파일 하나를 기준으로 이어서 작업합니다.
> 과거 내용과 현재 내용이 충돌하면 이 문서의 최신 상태를 우선합니다.

---

## 1. 프로젝트 개요

음악을 듣고 제목을 맞히는 웹 게임 `SONG QUIZ`를 개발 중입니다.

현재 프론트엔드부터 구현하고 있으며, 화면/게임 흐름을 먼저 완성한 뒤 API → 백엔드 → DB → 실제 곡 데이터 → 회원 기록/랭킹 순으로 연결할 예정입니다.

핵심 디자인 컨셉:
- 네온 / EDM / 클럽 분위기
- 음악 공간 안으로 들어가는 듯한 느낌
- 어두운 배경 + 파랑/보라/핑크 계열 네온
- 음악에 반응하는 시각 요소

---

## 2. 기술 스택

- Next.js (App Router)
- React
- TypeScript
- SCSS
- SCSS Module
- Web Audio API
- Canvas API

스타일은 컴포넌트와 분리하여 주로 `src/styles`에서 관리합니다.

---

## 3. 현재 페이지 흐름

```text
/                    메인 화면
↓ GAME START

/game                취향 선택 / 가이드
↓ 모드 선택으로 가기

/game/mode           게임 모드 선택
↓ PLAY

/game/play?mode=...  실제 게임 플레이  ← 다음 작업
```

추후 예정:
```text
/game/ranking
/game/board
```

현재 구현 진행점은 `/game/play`까지 완료되었으며, 게임 플레이 화면의 핵심 흐름과 결과 화면까지 연결된 상태입니다. 다음 작업은 랭킹/게시판/로그인 등 나머지 화면 구현입니다.

---

## 4. 메인 `/` 구현 상태

메인 화면은 완료 상태이며 불필요하게 다시 디자인하지 않습니다.

구현:
- SONG QUIZ 타이틀
- 설명 문구
- GAME START
- RANKING
- 메인 배경
- BGM ON/OFF
- TOP AudioVisualizer
- LEFT / RIGHT AudioVisualizer
- LED Segment 스타일
- EDM Spectrum 스타일 파형
- 좌우 원근감
- 바닥 반사 효과
- 반응형 처리
- GAME START → `/game`

### AudioVisualizer

`AudioVisualizer.tsx`는 하나의 컴포넌트에서 다음 variant를 처리합니다.

```ts
type AudioVisualizerProps = {
  variant: "top" | "left" | "right";
};
```

Web Audio API의 `AnalyserNode` 데이터를 Canvas API로 그립니다.

좌우 Visualizer는 평면 이퀄라이저가 아니라 중앙 소실점을 향하는 클럽/터널 느낌이며 CSS `perspective()` + `rotateY()`를 사용합니다.

Visualizer 본체의 glow를 과도하게 주면 LED가 흐려지는 문제가 있어 본체는 선명하게 유지하고 반사 쪽에 blur/opacity를 주는 방향입니다.

---

## 5. `/game` 취향 선택 화면

`/game` 화면도 거의 완료 상태이며 당분간 디자인을 크게 수정하지 않습니다.

구현:
- 클럽 배경
- 투명 PNG 고양이 마스코트
- 뒤로가기
- 건너뛰기
- 고양이 대사창
- 대사창 말풍선 꼬리
- `클릭해서 계속 ▼`
- 대사창 클릭 시 사라지는 애니메이션
- 대사창 종료 후 취향 선택 패널 등장
- 패널 오른쪽 → 왼쪽 슬라이드
- J-POP / K-POP / POP 취향 카드
- 자유롭게 다시 선택 가능
- 선택 결과에 따른 추천 문구
- 결과창 등장/hover 효과
- 반응형
- 고양이와 카드 겹침 문제 보정

### 주요 상태

`GamePage`는 Client Component입니다.

```tsx
const [showMessage, setShowMessage] = useState(true);

const [selectedGenre, setSelectedGenre] = useState<
  "J-POP" | "K-POP" | "POP" | null
>(null);
```

`selectedGenre`는 단순 게임 모드가 아니라 사용자의 음악 취향 선택값입니다.

이 값은 `/game/mode`에서 추천 모드를 표시하는 데 사용합니다.

취향 카드 선택 후 다른 카드를 다시 선택할 수 있어야 하므로 다른 카드를 잠그거나 비활성화하지 않습니다.

---

## 6. `/game/mode` 현재 구현 상태

모드 선택 화면은 거의 완성되었습니다.

모드:
- K-POP
- J-POP
- POP
- HARD

각 카드:
- 장르별 배경 이미지
- LP 디자인
- 장르 아이콘
- 장르명
- 설명
- 등록 곡 수
- 난이도
- PLAY 버튼

현재 곡 수는 하드코딩이며 추후 SONG 데이터와 연결합니다.

예:
- K-POP: 362곡
- J-POP: 414곡
- POP: 298곡
- HARD: 1,074곡+

### 추천 모드

앞 화면의 `selectedGenre`와 일치하는 카드에 `✦ 추천 모드` 배지를 표시합니다.

K-POP / J-POP / POP 모두 추천 모드가 될 수 있습니다.

추천 카드는 기본 네온 강조가 있지만 과도하게 확대하지 않습니다.

### 일반 카드 hover

K-POP / J-POP / POP 카드 hover 시:
- 카드가 살짝 위로 이동
- 카드 테두리 네온 강화
- PLAY 버튼 네온 강화
- LP 내부 네온 점등
- LP glow pulse

LP 네온은 안쪽에서부터 밝아졌다 어두워지는 느낌이며 약 1.8초 주기의 pulse 방향입니다.

### HARD

HARD는 잠금 상태입니다.

표시:
```text
🔒 잠김

K-POP / J-POP / POP
각 모드에서 일정 기록 달성 시 해금!
```

HARD 카드 자체는 hover 시 움직이지만 잠금 안내 부분은 빨간 네온이 천천히 점등합니다.

실제 해금 판정은 회원 기록/DB 연결 후 구현합니다.

중요: HARD는 SONG category가 아닙니다. K-POP + J-POP + POP 전체에서 문제가 출제되는 고난도 모드입니다.

---

## 7. `/game/mode` 마스코트 / 장식

상단 오른쪽에 마스코트와 말풍선이 있습니다.

구조:
```text
[마스코트] [말풍선]
```

마스코트는 카드보다 뒤쪽 레이어에 있으며 약간 투명하게 처리해 배경 장식처럼 보이게 합니다.

추천 장르에 따라 대사가 바뀝니다.

배경에는 CSS 텍스트 기반 네온 음표(`♪`, `♫`)가 있으며 핑크/파랑/보라 계열의 `text-shadow`, 회전 등을 사용합니다.

---

## 8. 모드 선택 제목 애니메이션

`플레이할 모드를 선택하세요!`는 정적인 제목이 아니라 네온 애니메이션이 적용되어 있습니다.

효과:
- 페이지 진입 시 아래에서 살짝 올라오며 fade-in
- 전체 제목의 약한 glow pulse
- `모드를` 부분에 핑크 → 보라 → 파랑 gradient 이동

사용 keyframes:
- `titleEnter`
- `titleGlow`
- `modeGradient`

---

## 9. GameHeader

게임 영역에서 반복 사용할 공용 헤더 방향으로 구현 중입니다.

예상 사용:
- `/game`
- `/game/mode`
- `/game/play`
- `/game/ranking`
- `/game/board`

구성:
```text
[Equalizer] SONG QUIZ     GAME RANKING BOARD       [프로필] Guest ⚙
```

### 로고

SONG QUIZ 앞에 CSS 이퀄라이저가 있습니다.

5개 span 막대로 구성하며 blue → purple → pink 계열입니다.

SONG과 QUIZ는 별도 span:
- SONG: 푸른색/흰색 네온
- QUIZ: 보라 → 핑크 gradient 네온

### Navigation

GAME / RANKING / BOARD 버튼.

hover:
- 글자 밝아짐
- 파란 네온 text-shadow
- 아래 파란 네온 줄이 중앙에서 양쪽으로 펼쳐짐

파란 줄은 현재 페이지 active 표시가 아니라 hover 효과입니다.

GAME은 `/game`으로 이동하도록 연결하는 방향입니다.

추후:
```text
GAME    → /game
RANKING → /game/ranking
BOARD   → /game/board
```

아직 없는 페이지는 성급하게 연결하지 않아도 됩니다.

### 사용자 영역

```text
[프로필 이미지] Guest ⚙
```

현재 Guest 이미지는 임시 이미지이며 회원 기능 구현 후 교체합니다.

톱니는 hover 시 네온 + 약간 회전합니다.
폰트 기준선 때문에 아래로 보이던 문제는 `line-height`, `padding`, `translateY` 등으로 보정했습니다.

---

## 10. `/game/mode` 이전으로

하단 `← 이전으로`는 `/game`으로 돌아갑니다.

Next.js `Link` 또는 `router.push("/game")` 방식으로 연결합니다.

---

## 11. BGM / Audio 구조 최신 상태

`BgmProvider.tsx`에서 전역 BGM을 관리합니다.

페이지별 기본 BGM:

```text
/game       → /audio/game-intro-bgm.wav
/game/mode  → /audio/mode-bgm.wav
기타        → /audio/main-bgm.wav
```

현재 주요 음원:

```text
main-bgm.wav
game-intro-bgm.wav
mode-bgm.wav
mode-kpop-preview.wav
mode-jpop-preview.wav
mode-pop-preview.wav
```

Context 주요 값:

```ts
type BgmContextType = {
  isPlaying: boolean;
  toggleBgm: () => void;
  analyser: AnalyserNode | null;
  playPreview: (src: string) => void;
  stopPreview: () => void;
};
```

기본 BGM용 `audioRef`와 카드 hover 미리듣기용 `previewAudioRef`를 별도로 사용합니다.

### 카드 hover 미리듣기

K-POP:
```text
/audio/mode-kpop-preview.wav
```

J-POP:
```text
/audio/mode-jpop-preview.wav
```

POP:
```text
/audio/mode-pop-preview.wav
```

HARD는 잠금 상태라 preview 없음.

동작:
```text
mode-bgm 재생
↓ 카드 hover
mode-bgm pause
해당 preview 재생
↓ hover 해제
preview 정지/currentTime=0
mode-bgm 멈췄던 위치에서 다시 재생
```

BGM OFF 상태에서는 hover preview도 재생하지 않습니다.

### 새로고침

현재 F5 시 BGM 상태는 초기화됩니다.

`useState(false)`가 다시 생성되고 브라우저 자동재생 정책도 있으므로 현재는 정상적인 동작으로 둡니다.

추후 필요하면 `localStorage`로 BGM 설정을 기억하는 방식을 검토할 수 있습니다.

### AbortError

빠르게 hover 진입/해제를 반복하면 `play()` 직후 `pause()`가 호출되어:

```text
The play() request was interrupted by a call to pause()
```

가 발생할 수 있습니다.

`AbortError`는 정상적인 재생 취소로 보고 별도 예외 처리하도록 수정했습니다.

세세한 오디오 버그는 핵심 화면 흐름 구현 후 한 번에 정리합니다.

---

## 12. 이미지 파일

주요 이미지:

```text
/images/main-background.png
/images/game-background.png
/images/game-mascot.png
/images/mode-kpop.png
/images/mode-jpop.png
/images/mode-pop.png
```

실제 파일명은 프로젝트 현재 상태를 우선 확인합니다.

배경과 마스코트를 분리한 이유는 해상도별 위치/크기를 독립적으로 조절하기 위해서입니다.

---

## 13. 반응형 정책

메인과 `/game`에는 일부 반응형 작업이 되어 있습니다.

`/game/mode`는 현재 브라우저 배율 약 90%에서 가장 보기 좋으며 100%에서는 세로 공간이 다소 부족하게 느껴집니다.

QHD/고해상도 반응형은 지금 계속 만지지 않고 주요 화면 구현이 끝난 뒤 한 번에 정리할 예정입니다.

즉 현재 우선순위:
```text
기능/화면 흐름 완성
↓
전체 반응형/QHD 정리
```

---

## 14. DB 설계 핵심 결정

주요 테이블:

```text
USER
SONG
GAME_RECORD
POST
COMMENT
REQUEST
```

주요 결정:
- 게스트는 USER에 저장하지 않음
- `SONG.title`은 커버곡 때문에 UNIQUE가 아님
- HARD는 SONG category가 아님
- GAME_RECORD는 회원의 최종 게임 결과 저장
- 랭킹 별도 테이블 없음
- 회원별/모드별 최고 score 조회로 랭킹 구성
- POST는 NOTICE / EVENT / FREE를 `board_type`으로 통합
- REQUEST는 요청 종류를 구분해 처리

현재 프론트 작업에서는 DB를 성급하게 붙이지 않습니다.

---

## 15. 게임 규칙

다음 `/game/play` 구현 시 반드시 유지합니다.

### 제한시간
문제당 30초.

### 목숨
3개.

### 정답
- 점수 획득
- 남은 시간에 따른 보너스 점수

### 오답 입력
- 목숨 감소 없음
- 시간은 계속 흐름
- 오답 안내만 표시

### 시간 초과
- 목숨 -1

### 출제
한 게임에서 이미 출제된 제목은 다시 출제하지 않습니다.

### 정답 판정
등록된 노래 제목 기준.

### 게스트
게임 플레이 가능.
랭킹 기록 등록은 하지 않음.

### 회원
게임 기록/랭킹 등록 가능.

### HARD
K-POP / J-POP / POP 전체 곡에서 랜덤 출제.
일정 기록 달성 후 해금.

---

## 16. 현재는 하지 않을 것

아직 다음 기능은 실제 백엔드/DB와 연결하지 않습니다.

- 실제 곡 수 조회
- HARD 실제 해금 판정
- 회원 게임 기록 저장
- 실제 SONG 데이터 조회
- 랭킹 DB 조회

프론트에서는 임시 데이터/하드코딩을 사용해 화면과 게임 흐름을 먼저 완성합니다.

---

## 17. 다음 작업 ★

현재 정확한 시작점:

```text
/game/play
```

### 1단계

`src/app/game/play/page.tsx` 생성.

우선 query parameter를 받아오는지만 테스트합니다.

```text
/game/play?mode=K-POP
/game/play?mode=J-POP
/game/play?mode=POP
```

화면에서:

```text
선택한 모드: K-POP
```

처럼 확인.

### 2단계

`/game/mode`의 PLAY 버튼 연결.

```text
K-POP → /game/play?mode=K-POP
J-POP → /game/play?mode=J-POP
POP   → /game/play?mode=POP
```

HARD는 잠금 상태이므로 이동하지 않습니다.

### 3단계

게임 플레이 UI 구현.

기존 기획 기준 주요 요소:
- GameHeader
- 현재 모드
- 타이머 30초
- 목숨 ♥♥♥
- 점수
- 연속 정답
- 음악 프로필/LP
- 이퀄라이저
- 정답 입력창

처음부터 실제 게임 로직 전체를 한꺼번에 만들지 말고 UI와 데이터 흐름부터 단계적으로 구현합니다.

---

## 18. `/game/play` 현재 구현 상태

`/game/play?mode=...` 게임 플레이 화면은 현재 기능적으로 정상 작동합니다.

### 현재 파일 구조
```text
src
├─ app
│  └─ game
│     ├─ mode
│     ├─ play
│     ├─ ranking       ← 다음 구현 대상
│     └─ board         ← 다음 구현 대상
├─ components
│  ├─ AudioVisualizer.tsx
│  ├─ BgmProvider.tsx
│  ├─ CorrectResult.tsx
│  ├─ Footer.tsx
│  ├─ GameHeader.tsx
│  ├─ Header.tsx
│  ├─ TimeoutResult.tsx
│  └─ WrongResult.tsx
└─ styles
   ├─ CorrectResult.module.scss
   ├─ Game.module.scss
   ├─ GameHeader.module.scss
   ├─ Play.module.scss
   ├─ TimeoutResult.module.scss
   └─ WrongResult.module.scss
```

### 게임 상태
- 문제당 테스트 시간은 현재 5초로 설정되어 있습니다. 최종 규칙은 30초입니다.
- 목숨 3개.
- 정답 시 기본 점수 + 남은 시간 보너스.
- 정답 시 combo +1.
- 오답 시 목숨 감소 없음.
- 시간초과 시 목숨 -1.
- 마지막 목숨이 0이 되면 게임오버.
- 현재 테스트 곡은 `Hype Boy`, `좋은 날`, `Blue Valentine`입니다.
- 현재 테스트용 음원은 `/public/audio/`의 mp3 파일을 사용합니다.
- 한 게임에서 다음 문제로 이동할 때 기존 음악을 정지하고 다음 음악을 재생합니다.
- 결과 화면이 표시된 동안에는 타이머가 진행되지 않습니다.

### 결과 컴포넌트
정답/오답/시간초과를 각각 별도 컴포넌트와 SCSS Module로 분리했습니다.
```text
CorrectResult.tsx      + CorrectResult.module.scss
WrongResult.tsx        + WrongResult.module.scss
TimeoutResult.tsx      + TimeoutResult.module.scss
```

정답/시간초과 화면에는 `다음 문제로` 버튼이 있으며 `goToNextQuestion`과 연결되어 있습니다.
오답 화면도 별도 컴포넌트로 분리되어 있으며 현재 오답 안내가 표시된 뒤 사라지는 애니메이션까지 적용되어 있습니다.

### 게임오버
게임오버 상태 자체의 기능 연결은 완료했습니다. 현재 플레이 화면의 테스트용 GAME OVER 표시가 있으며, 실제 게임오버 결과 화면은 별도의 화면으로 새로 구성할 예정입니다.
현재 디자인은 다음 시안 방향을 기준으로 합니다.
- GAME OVER 제목
- 맞힌 문제 수
- 최종 SCORE
- 개인 BEST SCORE
- 등급
- BEST SCORE / 신기록 여부
- 다시 도전
- 나가기
- TIP
실제 개인 최고 점수/신기록 여부는 DB 연결 후 처리합니다.

### 플레이 화면 상단 HUD
현재 `LIVES / COMBO / SCORE`를 한 줄에 배치했습니다.
- LIVES: 왼쪽 정렬
- COMBO: 가운데
- SCORE: 오른쪽
- score가 5자리 이상이 되어도 사용할 수 있도록 현재 영역을 확보해 둡니다.

### 플레이 화면 음악 비주얼
LP판 양옆의 파형은 기존 막대형 CSS 이퀄라이저 대신 SVG 선형 waveform으로 변경했습니다.
- 왼쪽: 핑크/보라 계열
- 오른쪽: 보라/파랑 계열
- SVG path가 움직이며 음악이 흐르는 느낌을 표현
- `stroke-dashoffset` 기반 흐름 애니메이션과 opacity 변화 사용
- 현재는 실제 음원 분석 데이터와 연결하지 않은 장식용 애니메이션
- 메인 `AudioVisualizer`와는 별도의 디자인

### 플레이 화면 반응형
`/game/play`의 반응형은 아직 정리하지 않습니다. 주요 화면 전체 구현이 끝난 뒤 SCSS를 한 번에 정리합니다.

---

## 19. 현재 Header 라우팅 상태

`Header.tsx`에서 `useRouter()`를 사용하고 있으며 현재 구조는 다음과 같습니다.
```tsx
<nav className={styles.nav}>
  <button onClick={() => router.push("/game/mode")}>
    GAME
  </button>

  <button onClick={() => router.push("/game/ranking")}>
    RANKING
  </button>

  <button onClick={() => router.push("/game/board")}>
    BOARD
  </button>
</nav>
```

즉 앞으로 페이지 구조도 다음 주소를 기준으로 맞춥니다.
```text
GAME    → /game/mode
RANKING → /game/ranking
BOARD   → /game/board
```
`/game/ranking` 페이지는 아직 실제 화면을 만들지 않았으며, 다음 작업에서 생성합니다.

---

## 20. 프론트엔드 전체 화면 우선 구현 방향

현재는 백엔드/DB를 붙이지 않고 화면단을 먼저 완성합니다.

우선순위:
```text
게임 플레이 완료
↓
랭킹 화면
↓
게시판 화면
↓
게시글 상세 / 댓글
↓
로그인 / 회원가입
↓
게스트 / 회원 상태 화면
↓
곡 요청 화면
↓
필요한 기타 화면
↓
화면 간 이동 전체 확인
↓
API 명세 확정
↓
백엔드 + DB 구현
↓
mock 데이터 → 실제 API 데이터 교체
```

### 현재 프론트 단계 원칙
- 화면과 기본 이동을 먼저 완성합니다.
- 테스트용 mock 데이터/하드코딩을 사용합니다.
- 랭킹/게시판/회원 데이터는 아직 DB에서 조회하지 않습니다.
- 실제 API 연결은 전체 화면 흐름을 확인한 뒤 시작합니다.
- 화면 구현 중 필요한 데이터가 무엇인지 확인한 뒤 API/DB 필드를 확정합니다.

---

---

## 21. 개발 진행 원칙

이 프로젝트는 사용자가 직접 배우면서 구현하는 프로젝트입니다.

따라서 다음 방식으로 진행합니다.

```text
지금 할 것 하나 설명
↓
사용자가 적용
↓
결과 확인
↓
다음 단계
```

중요:
- 한 번에 너무 많은 파일을 수정하지 않음
- 무엇을 왜 수정하는지 설명
- 가능하면 한 단계 적용 후 화면 확인
- 정상 작동하는 코드를 불필요하게 갈아엎지 않음
- 디자인 수정과 기능 수정을 동시에 크게 진행하지 않음
- 기존 SCSS/컴포넌트 구조를 확인한 뒤 수정
- 현재 파일 내용을 추측하지 말고 필요하면 코드를 요청
- 사용자가 전체 코드를 요청하면 복사해서 교체할 수 있는 전체 코드 제공
- 이미 완료한 화면을 계속 미세조정하기보다 다음 기능으로 진행
- 자잘한 버그는 핵심 흐름 완성 후 정리 가능

---

## 22. 새 채팅에서 바로 이어갈 지점

다음 채팅에서는 처음부터 설계를 다시 하지 않습니다.

다음 문장으로 바로 시작하면 됩니다.

> `/game/play` 기능 연결까지 완료했다. 이제 `/game/ranking` 화면부터 만들자.

가장 먼저:
1. `Header.tsx`의 RANKING 버튼이 `/game/ranking`으로 이동하는지 확인
2. `src/app/game/ranking/page.tsx` 생성
3. 랭킹 화면 UI 구현
4. 그 다음 `/game/board` 화면 구현
5. 로그인/회원가입 등 나머지 화면 구현
6. 전체 화면 흐름 확인 후 API → 백엔드 → DB 연결

현재 프로젝트 단계:

```text
메인 완료
   ↓
취향 선택 완료
   ↓
모드 선택 완료
   ↓
게임 플레이 완료
   ↓
정답/오답/시간초과 컴포넌트 분리 완료
   ↓
게임오버 기능 연결 완료
   ↓
★ 랭킹 / 게시판 / 회원 관련 화면 구현 시작
   ↓
API → 백엔드 → DB
```
