/* ==================================================
   게시판 카테고리 타입
================================================== */

export type BoardType =
  | "NOTICE"
  | "EVENT"
  | "REQUEST"
  | "FREE";


/* ==================================================
   게시글 타입

   id
   - 게시글의 실제 고유 번호
   - 상세 페이지 URL에서 사용

   number
   - 게시판 목록에서 보여줄 번호
   - 공지글은 "공지"로 표시 가능
================================================== */

export type BoardPost = {
  id: number;
  number: string;
  title: string;
  author: string;
  date: string;
  views: number;
  content: string;
};


/* ==================================================
   게시판 Mock 데이터

   현재는 프론트 테스트용 데이터이며
   추후 백엔드 API 데이터로 교체한다.
================================================== */

export const boardData: Record<BoardType, BoardPost[]> = {

  /* ==================================================
     공지사항
  ================================================== */

  NOTICE: [
    {
      id: 1,
      number: "공지",
      title: "6월 1일 (토) 서버 점검 안내",
      author: "관리자",
      date: "2026.08.22",
      views: 1245,
      content:
        "안정적인 서비스 제공을 위해 서버 점검이 진행될 예정입니다.\n\n점검 시간 동안 게임 이용이 일시적으로 제한될 수 있습니다.",
    },
    {
      id: 2,
      number: "공지",
      title: "SONG QUIZ 이용 안내",
      author: "관리자",
      date: "2026.08.21",
      views: 930,
      content:
        "SONG QUIZ 이용 방법을 안내드립니다.\n\n게임 모드를 선택하고 재생되는 음악의 제목을 맞혀보세요!",
    },
    {
      id: 3,
      number: "공지",
      title: "노래 데이터 업데이트 안내",
      author: "관리자",
      date: "2026.08.20",
      views: 812,
      content:
        "SONG QUIZ 노래 데이터가 업데이트되었습니다.\n\n새로운 곡들을 게임에서 만나보세요.",
    },
    {
      id: 101,
      number: "101",
      title: "서비스 이용 관련 질문이 있습니다",
      author: "MUSICMAN",
      date: "2026.08.19",
      views: 86,
      content:
        "서비스 이용 중 궁금한 부분이 있어서 질문드립니다.\n\n확인 부탁드립니다!",
    },
    {
      id: 100,
      number: "100",
      title: "게임 플레이 중 오류가 발생했어요",
      author: "Melody",
      date: "2026.08.19",
      views: 112,
      content:
        "게임 플레이 도중 오류가 발생했습니다.\n\n확인 부탁드립니다.",
    },
    {
      id: 99,
      number: "99",
      title: "랭킹 갱신 기준이 궁금합니다",
      author: "NightStar",
      date: "2026.08.18",
      views: 203,
      content:
        "랭킹 점수가 어떤 기준으로 갱신되는지 궁금합니다.",
    },
    {
      id: 98,
      number: "98",
      title: "로그인 관련 문의드립니다",
      author: "Yuki",
      date: "2026.08.18",
      views: 71,
      content:
        "로그인 관련해서 궁금한 점이 있어서 문의드립니다.",
    },
    {
      id: 97,
      number: "97",
      title: "페이지 이용 중 궁금한 점이 있어요",
      author: "Haru",
      date: "2026.08.17",
      views: 145,
      content:
        "페이지를 이용하다가 궁금한 부분이 생겼습니다.",
    },
    {
      id: 96,
      number: "96",
      title: "게임 기록 저장 관련 문의",
      author: "MusicFan",
      date: "2026.08.17",
      views: 99,
      content:
        "게임을 종료한 뒤 기록이 어떻게 저장되는지 궁금합니다.",
    },
    {
      id: 95,
      number: "95",
      title: "사이트 이용 후기 남겨봅니다",
      author: "PopStar",
      date: "2026.08.16",
      views: 176,
      content:
        "SONG QUIZ를 플레이해봤는데 재미있네요!\n\n앞으로도 자주 이용할 것 같습니다.",
    },
  ],


  /* ==================================================
     이벤트
  ================================================== */

  EVENT: [
    {
      id: 2010,
      number: "공지",
      title: "8월 플레이 챌린지 이벤트 안내",
      author: "관리자",
      date: "2026.08.22",
      views: 2301,
      content:
        "8월 플레이 챌린지 이벤트가 시작됩니다!\n\n게임을 플레이하고 목표 점수에 도전해보세요.",
    },
    {
      id: 2009,
      number: "공지",
      title: "주말 특별 점수 이벤트",
      author: "관리자",
      date: "2026.08.21",
      views: 1844,
      content:
        "이번 주말 특별 점수 이벤트가 진행됩니다.\n\n많은 참여 부탁드립니다!",
    },
    {
      id: 201,
      number: "201",
      title: "이번 이벤트 참여 방법이 궁금해요",
      author: "MUSICMAN",
      date: "2026.08.20",
      views: 133,
      content:
        "이번 이벤트에 참여하려면 따로 신청해야 하나요?",
    },
    {
      id: 200,
      number: "200",
      title: "이벤트 보상은 언제 지급되나요?",
      author: "Melody",
      date: "2026.08.20",
      views: 97,
      content:
        "이벤트 보상이 언제 지급되는지 궁금합니다.",
    },
    {
      id: 199,
      number: "199",
      title: "이번 챌린지 꽤 어렵네요 ㅋㅋ",
      author: "Rin",
      date: "2026.08.19",
      views: 245,
      content:
        "이번 챌린지 생각보다 어렵네요 ㅋㅋ\n\n그래도 계속 도전해보겠습니다!",
    },
    {
      id: 198,
      number: "198",
      title: "이벤트 기록도 랭킹에 포함되나요?",
      author: "Luna",
      date: "2026.08.19",
      views: 88,
      content:
        "이벤트에서 달성한 기록도 일반 랭킹에 포함되는지 궁금합니다.",
    },
    {
      id: 197,
      number: "197",
      title: "다음 이벤트도 기대됩니다",
      author: "Haru",
      date: "2026.08.18",
      views: 76,
      content:
        "이번 이벤트 재미있네요.\n\n다음 이벤트도 기대하겠습니다!",
    },
    {
      id: 196,
      number: "196",
      title: "이벤트 보상 뭐가 제일 좋나요?",
      author: "MusicFan",
      date: "2026.08.18",
      views: 143,
      content:
        "다들 이번 이벤트 보상 중에서 어떤 게 제일 마음에 드시나요?",
    },
    {
      id: 195,
      number: "195",
      title: "챌린지 완료했습니다!",
      author: "PopStar",
      date: "2026.08.17",
      views: 211,
      content:
        "드디어 챌린지 완료했습니다!\n\n생각보다 오래 걸렸네요 ㅎㅎ",
    },
    {
      id: 194,
      number: "194",
      title: "이벤트 기간 연장되나요?",
      author: "NightStar",
      date: "2026.08.17",
      views: 120,
      content:
        "혹시 현재 진행 중인 이벤트 기간이 연장될 가능성이 있나요?",
    },
  ],


  /* ==================================================
     노래 요청 / 건의
  ================================================== */

  REQUEST: [
    {
      id: 301,
      number: "301",
      title: "J-POP 추천곡 추가 요청해요!",
      author: "Yuki",
      date: "2026.08.22",
      views: 112,
      content:
        "J-POP 모드에 새로운 곡을 추가해주셨으면 좋겠습니다!\n\n좋은 곡들이 더 많아지면 좋겠어요.",
    },
    {
      id: 300,
      number: "300",
      title: "노래 제목 오타 제보합니다",
      author: "MUSICMAN",
      date: "2026.08.22",
      views: 86,
      content:
        "게임 플레이 중 노래 제목에 오타가 있는 것 같아서 제보합니다.",
    },
    {
      id: 299,
      number: "299",
      title: "POP 모드에 이 곡도 추가해주세요",
      author: "PopStar",
      date: "2026.08.21",
      views: 176,
      content:
        "POP 모드에 좋아하는 곡이 있는데 추가되면 좋겠습니다!",
    },
    {
      id: 298,
      number: "298",
      title: "K-POP 신곡 추가 요청드립니다",
      author: "KMusic",
      date: "2026.08.21",
      views: 194,
      content:
        "최근 나온 K-POP 신곡들도 추가되면 좋을 것 같습니다.",
    },
    {
      id: 297,
      number: "297",
      title: "정답 판정이 이상한 것 같아요",
      author: "Melody",
      date: "2026.08.20",
      views: 203,
      content:
        "정답을 입력했는데 오답으로 처리되는 경우가 있었습니다.\n\n확인 부탁드립니다.",
    },
    {
      id: 296,
      number: "296",
      title: "곡 재생 구간을 조금 늘려주세요",
      author: "MusicFan",
      date: "2026.08.20",
      views: 156,
      content:
        "현재 재생되는 음악 구간이 조금 짧게 느껴집니다.\n\n조금 늘려주시면 좋을 것 같습니다.",
    },
    {
      id: 295,
      number: "295",
      title: "하드 모드 곡 관련 건의입니다",
      author: "Challenge",
      date: "2026.08.19",
      views: 189,
      content:
        "하드 모드의 곡 구성과 관련해서 건의드릴 내용이 있습니다.",
    },
    {
      id: 294,
      number: "294",
      title: "이 곡도 꼭 추가됐으면 좋겠어요",
      author: "Luna",
      date: "2026.08.19",
      views: 121,
      content:
        "제가 좋아하는 곡인데 SONG QUIZ에도 꼭 추가됐으면 좋겠습니다!",
    },
    {
      id: 293,
      number: "293",
      title: "노래 정보 수정 요청드립니다",
      author: "Haru",
      date: "2026.08.18",
      views: 94,
      content:
        "등록된 노래 정보 중 수정이 필요한 부분이 있는 것 같습니다.",
    },
    {
      id: 292,
      number: "292",
      title: "새로운 장르 추가 계획 있나요?",
      author: "NightStar",
      date: "2026.08.18",
      views: 167,
      content:
        "현재 장르 외에 새로운 장르를 추가할 계획이 있는지 궁금합니다.",
    },
  ],


  /* ==================================================
     자유게시판
  ================================================== */

  FREE: [
    {
      id: 401,
      number: "401",
      title: "오늘 처음 해봤는데 재밌네요 ㅎㅎ",
      author: "Luna",
      date: "2026.08.22",
      views: 65,
      content:
        "오늘 처음 SONG QUIZ 해봤는데 재밌네요 ㅎㅎ\n\n생각보다 아는 노래인데 제목이 바로 안 떠오르는 경우가 많네요.\n\n다음에는 점수 좀 더 올려봐야겠습니다!",
    },
    {
      id: 400,
      number: "400",
      title: "다들 어떤 모드 제일 많이 하세요?",
      author: "MUSICMAN",
      date: "2026.08.22",
      views: 132,
      content:
        "저는 요즘 K-POP 모드를 제일 많이 하고 있습니다.\n\n다들 어떤 모드 제일 많이 하시나요?",
    },
    {
      id: 399,
      number: "399",
      title: "J-POP 좋아하는 사람 있나요",
      author: "Yuki",
      date: "2026.08.21",
      views: 201,
      content:
        "J-POP 좋아하시는 분 있나요?\n\n좋은 노래 있으면 추천해주세요!",
    },
    {
      id: 398,
      number: "398",
      title: "오늘 랭킹 10위 안에 들었습니다!",
      author: "Melody",
      date: "2026.08.21",
      views: 257,
      content:
        "드디어 오늘 랭킹 10위 안에 들었습니다!\n\n조금만 더 연습해서 더 올라가보고 싶네요.",
    },
    {
      id: 397,
      number: "397",
      title: "하드 모드 빨리 해보고 싶네요",
      author: "Challenge",
      date: "2026.08.20",
      views: 145,
      content:
        "하드 모드가 제일 기대됩니다.\n\n빨리 도전해보고 싶네요!",
    },
    {
      id: 396,
      number: "396",
      title: "요즘 듣는 노래 추천해주세요",
      author: "MusicFan",
      date: "2026.08.20",
      views: 310,
      content:
        "요즘 들을 노래를 찾고 있습니다.\n\n장르 상관없이 좋은 노래 추천해주세요!",
    },
    {
      id: 395,
      number: "395",
      title: "이 게임 은근 중독성 있네요",
      author: "Haru",
      date: "2026.08.19",
      views: 187,
      content:
        "한 판만 하려고 했는데 계속하게 되네요 ㅋㅋ\n\n은근 중독성 있습니다.",
    },
    {
      id: 394,
      number: "394",
      title: "POP 모드 고수분들 대단합니다",
      author: "PopStar",
      date: "2026.08.19",
      views: 221,
      content:
        "POP 모드 랭킹 보니까 점수가 엄청 높네요.\n\n고수분들 진짜 대단합니다.",
    },
    {
      id: 393,
      number: "393",
      title: "다들 최고 점수 몇 점인가요?",
      author: "NightStar",
      date: "2026.08.18",
      views: 276,
      content:
        "다들 SONG QUIZ 최고 점수가 몇 점인가요?\n\n저도 목표 점수를 한번 정해보려고 합니다.",
    },
    {
      id: 392,
      number: "392",
      title: "다음 업데이트 기대됩니다",
      author: "Rin",
      date: "2026.08.18",
      views: 108,
      content:
        "게임 재미있게 하고 있습니다.\n\n다음 업데이트에는 어떤 기능이 추가될지 기대되네요!",
    },
  ],
};