# Music Quiz Project - 개발 컨텍스트


## 1. 프로젝트 개요


음악을 듣고 곡을 맞히는 Music Quiz 웹 프로젝트.


현재 메인 화면 UI까지 구현 완료.


메인 화면의 핵심 디자인 컨셉은 네온/EDM/클럽 분위기이며,
사용자가 음악 공간 안으로 들어가는 듯한 느낌을 목표로 한다.


---


## 2. 기술 스택


- Next.js
- React
- TypeScript
- SCSS
- SCSS Module
- Web Audio API
- Canvas API


스타일 파일은 컴포넌트와 분리해서 `src/styles`에서 관리한다.


---


## 3. 현재 주요 폴더 구조


```text
frontend/
├─ public/
│  ├─ audio/
│  │  └─ main-bgm.wav
│  └─ images/
│     └─ 메인 배경 이미지
│
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  │
│  ├─ components/
│  │  ├─ Header
│  │  ├─ Footer
│  │  ├─ BgmProvider.tsx
│  │  └─ AudioVisualizer.tsx
│  │
│  └─ styles/
│     ├─ Home.module.scss
│     ├─ AudioVisualizer.module.scss
│     └─ 기타 Header/Footer SCSS
│
├─ package.json
└─ PROJECT_CONTEXT.md

※ 실제 Header/Footer 파일 확장자 및 파일명은 현재 프로젝트를 우선으로 확인한다.

4. 메인 화면

메인 화면에 현재 다음 요소가 존재한다.

SONG QUIZ 타이틀
설명 문구
GAME START 버튼
RANKING 버튼
상단 작은 Audio Visualizer
좌측 Audio Visualizer
우측 Audio Visualizer
좌우 Visualizer 반사 효과
배경 이미지
BGM

메인 화면은 현재 완성된 상태이므로
새 기능 작업 시 기존 디자인을 불필요하게 크게 변경하지 않는다.

5. SONG QUIZ 타이틀

SONG과 QUIZ를 세로로 배치한다.

display: flex;
flex-direction: column;
align-items: center;

SONG은 흰색 네온 스타일.

QUIZ는 내부가 채워진 글자가 아니라:

내부 transparent
보라색 outline
네온 느낌

을 사용한다.

QUIZ 핵심:

color: transparent;
-webkit-text-stroke: 4px #d84cff;

강한 text-shadow를 사용하면 내부까지 보라색으로 채워져 보일 수 있으므로 주의한다.

SONG / QUIZ 간격은 개별 margin보다 .title의 gap으로 관리하는 방향을 사용한다.

6. BGM 구조

BgmProvider.tsx에서 전역 BGM을 관리한다.

주요 상태/기능:

HTMLAudioElement
isPlaying
toggleBgm()
AnalyserNode

음악 파일:

/public/audio/main-bgm.wav

브라우저에서는:

/audio/main-bgm.wav

로 접근한다.

AudioVisualizer가 같은 BGM의 analyser 데이터를 사용한다.

7. AudioVisualizer

AudioVisualizer.tsx

variant:

type AudioVisualizerProps = {
  variant: "top" | "left" | "right";
};

따라서 하나의 컴포넌트에서:

top
left
right

세 종류의 Visualizer를 그린다.

Canvas API를 사용한다.

8. TOP Visualizer

SONG 위쪽에 들어가는 작은 이퀄라이저.

좌우 Visualizer보다 단순하며 실제 음악 주파수에 비교적 직접 반응한다.

조절 가능한 주요 값:

const barCount = ...
const gap = ...

barCount
→ 가로 막대 개수

gap
→ 막대 사이 간격

9. LEFT / RIGHT Visualizer

메인 화면 양옆의 대형 이퀄라이저.

단순한 사인파가 아니라 EDM Spectrum 느낌을 목표로 한다.

각 막대는 통짜 막대가 아니라 여러 개의 LED segment로 나누어져 있다.

예:

■
■
■
■


■
■


■

관련 값:

const segmentHeight = ...
const segmentGap = ...
10. 파형 디자인

초기에는:

Math.sin(...)

하나만 사용했으나 너무 잔잔한 너울성 파도처럼 보여 수정했다.

현재 방향은:

큰 파동
중간 파동
작은 파동
실제 음악 데이터

를 섞어서 EDM Spectrum처럼 불규칙한 봉우리를 만든다.

개념:

const bigWave = ...
const midWave = ...
const smallWave = ...


const wave =
  base +
  bigWave +
  midWave +
  smallWave;

음악 데이터도 추가한다.

const normalizedMusic = value / 255;


const music =
  Math.pow(normalizedMusic, 1.5) * strength;

목표는 완전히 랜덤한 파형이 아니라:

낮음 → 갑자기 높음 → 중간 → 낮음 → 높은 봉우리

같은 EDM 오디오 스펙트럼 느낌이다.

LEFT와 RIGHT는 시간 방향을 반대로 주어 서로 다른 방향으로 흐르는 느낌을 사용한다.

11. Visualizer Glow

Canvas의:

context.shadowBlur

를 크게 사용하면 LED가 지나치게 흐릿하게 보이는 문제가 있었다.

현재 LEFT / RIGHT의 shadowBlur는 0으로 설정한 상태.

본체 Visualizer는 선명하게 유지하고,
흐림 효과가 필요하다면 반사 부분에 적용하는 방향을 사용한다.

12. Canvas 크기 주의

AudioVisualizer.module.scss에서:

.left,
.right {
  width: 100%;
  height: 100%;
  display: block;
}

처럼 부모 크기를 따라가도록 한다.

이전에:

width: 70%;
height: 1000px;

등을 사용해서 실제 Visualizer 크기와 Home의 배치가 충돌했던 문제가 있었다.

Visualizer의 위치와 전체 크기는 가능하면 Home.module.scss의 부모 컨테이너가 담당한다.

13. 좌우 원근감

좌우 Visualizer는 단순히 평면에 놓인 이퀄라이저가 아니다.

디자인 목표:

화면 바깥쪽
████████████
 █████████
   ███████
      ████
         ██
           → 중앙 깊숙한 곳

즉 양옆에서 중앙의 소실점을 향해 들어가는 클럽/터널 느낌.

CSS에서 다음과 같은 3D transform을 사용했다.

transform:
  perspective(...)
  rotateY(...);

LEFT / RIGHT는 반대 방향의 rotateY를 사용한다.

좌우 위치는 대칭 여부를 항상 확인한다.

14. 바닥 반사

좌우 Visualizer 아래에 반사 효과가 존재한다.

목표:

████████████
 █████████
   █████
──────────────
   ░░░░░
  ░░░░░░░
░░░░░░░░░░

원본 Visualizer 아래에 뒤집힌 Visualizer를 배치한다.

기본 원리:

transform: scaleY(-1);

반사는 원본보다:

opacity 낮게
blur 적용 가능
아래로 갈수록 fade out

하는 방향으로 만든다.

반사가 안 보였던 문제는 부모의 위치 기준과 overflow 문제 때문이었다.

부모:

position: relative;
overflow: visible;

등의 위치 관계를 확인해야 한다.

15. GAME START 버튼

GAME START는 버튼 중앙에 텍스트를 배치한다.

오른쪽에는 일반 → 문자가 아니라 CSS로 만든 > 모양을 사용한다.

문자 >를 직접 사용하는 것보다 CSS border를 사용해 폰트 영향을 받지 않도록 한다.

개념:

width: 18px;
height: 18px;


border-top: 3px solid #ffffff;
border-right: 3px solid #ffffff;


transform: rotate(45deg);

GAME START 텍스트는 중앙 정렬을 유지하고
>는 오른쪽에 배치한다.

16. RANKING 버튼

현재 구조:

<button className={styles.rankingButton}>
  <span>왕관 아이콘</span>
  <span>RANKING</span>
  <span className={styles.rankingArrow}></span>
</button>

RANKING 앞에는 AudioVisualizer가 들어가는 것이 아니다.

왼쪽 요소는 단순한 랭킹 표시용 왕관 아이콘이다.

구조가:

[왕관]       RANKING       >

3개이므로:

display: flex;
align-items: center;
justify-content: space-between;

방식을 사용할 수 있다.

rankingArrow도 GAME START와 동일한 CSS > 스타일을 사용한다.

17. Hero

.hero에는 메인 중앙 UI 전체가 들어 있다.

대략:

SONG
QUIZ


설명


GAME START


RANKING

전체 덩어리를 위로 이동할 때 내부 margin을 전부 수정하지 않고:

transform: translateY(-...px);

방식으로 .hero 전체를 이동시킨다.

18. Git 현재 상태

메인 화면 구현 후 별도 브랜치를 생성했다.

현재 작업 브랜치:

feat/main-page

메인 화면 구현 내용은 로컬 커밋 완료.

커밋 메시지:

feat: 메인 화면 UI 구현

처음 확인했을 당시 remote는 등록되어 있지 않았다.

GitHub Repository를 만든 뒤:

git remote add origin <repository URL>

으로 연결하고:

git remote -v

확인 후:

git push -u origin feat/main-page

할 예정.

※ 새 채팅 시작 시 실제 Git 상태는 다시 git status, git branch, git remote -v로 확인한다.

19. 현재 완료된 것

메인 페이지 디자인 및 주요 인터랙션 구현 완료.

완료된 주요 작업:

Next.js 프로젝트 구성
SCSS 구성
Header / Footer 분리
메인 배경
SONG QUIZ 타이틀
GAME START
RANKING
BGM
BGM ON/OFF
Web Audio API 연결
TOP Visualizer
LEFT Visualizer
RIGHT Visualizer
LED Segment
EDM 스타일 파형
좌우 원근감
바닥 반사
20. 다음 작업

다음 큰 작업은:

GAME START 이후 실제 게임 화면

이다.

예상 기능은 이후 설계한다.

예:

음악 재생
문제 출제
정답 입력/선택
정답 판정
점수
다음 문제
결과
Ranking 연동

아직 게임 로직은 성급하게 구현하지 말고,
먼저 게임 화면 UI/흐름부터 설계한다.

21. 개발할 때 중요한 원칙

이 프로젝트는 사용자가 직접 배우면서 구현하는 프로젝트다.

따라서 새 코드를 제안할 때:

한 번에 너무 많은 파일을 수정하지 않는다.
무엇을 왜 수정하는지 설명한다.
가능하면 한 단계 적용 후 화면을 확인한다.
기존에 정상 작동하는 AudioVisualizer를 불필요하게 갈아엎지 않는다.
디자인 수정과 기능 수정을 동시에 크게 진행하지 않는다.
기존 SCSS 구조를 확인한 뒤 수정한다.
추측으로 현재 파일 내용을 만들어내지 말고 필요하면 현재 코드를 요청한다.

특히 메인 화면은 이미 완성된 상태이므로
게임 화면 작업 중 메인 디자인을 함부로 변경하지 않는다.



이거 저장해두면 돼.


그리고 **이 파일도 Git에 같이 넣자.** 지금 커밋 이후 새 파일이니까 저장한 다음:


```bash
git add PROJECT_CONTEXT.md
git commit -m "docs: 프로젝트 개발 컨텍스트 추가"