"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useBgm } from "@/components/BgmProvider";
import GameHeader from "@/components/GameHeader";
import styles from "../../../styles/Mode.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function GameModePage() {
  const searchParams = useSearchParams();
  const selectedGenre = searchParams.get("genre");
  const { playPreview, stopPreview } = useBgm();
  const router = useRouter();
  return (
    <>
      <GameHeader />

      <main className={styles.modePage}>
         {/* 배경 네온 음표 장식 */}
        <div className={`${styles.musicNote} ${styles.note1}`}>♪</div>
        <div className={`${styles.musicNote} ${styles.note2}`}>♫</div>
        <div className={`${styles.musicNote} ${styles.note3}`}>♪</div>

        <section className={styles.titleSection}>
          <p className={styles.eyebrow}>— SELECT YOUR MODE —</p>

          <h1>
            플레이할 <span>모드를</span> 선택하세요!
          </h1>

          <p className={styles.subtitle}>
            어떤 음악에 도전해볼까요? ♫
          </p>
        </section>

        <section className={styles.recommendGuide}>
        <div className={styles.guideCat}>
            <Image
            src="/images/mode-mascot.png"
            alt="SONG QUIZ 마스코트"
            width={190}
            height={190}
            />
        </div>

        <div className={styles.guideBubble}>
            {selectedGenre ? (
            <>
                특히 {selectedGenre}
                <br />
                너랑 잘 맞을 것 같은데?
            </>
            ) : (
            <>
                마음에 드는 모드를
                <br />
                골라보는 건 어때?
            </>
            )}
        </div>
        </section>

        <section className={styles.modeList}>
          {/* K-POP */}
            <div
            className={`${styles.cardWrapper} ${
                selectedGenre === "K-POP" ? styles.recommended : ""
            }`}
            onMouseEnter={() =>
                playPreview("/audio/mode-kpop-preview.wav")
            }
            onMouseLeave={stopPreview}
            >
            {selectedGenre === "K-POP" && (
                <div className={styles.recommendBadge}>
                ✦ 추천 모드
                </div>
            )}

            <article className={`${styles.modeCard} ${styles.kpopCard}`}>
              <div
                className={`${styles.cardBackground} ${styles.kpopBackground}`}
              ></div>

              <div className={`${styles.record} ${styles.kpopRecord}`}>
                <span>♛</span>
              </div>

              <h2>K-POP</h2>
              <p>국내 인기 가요를 맞혀보세요!</p>

              <div className={styles.modeInfo}>
                <span>♫ 362곡</span>
                <span className={styles.divider}>|</span>
                <span>난이도 ★★☆</span>
              </div>

                <button onClick={() => router.push("/game/play?mode=K-POP")}>
                <span>PLAY</span>
                <span className={styles.playArrow}>›</span>
                </button>
            </article>
          </div>

          {/* J-POP */}
            <div
            className={`${styles.cardWrapper} ${
                selectedGenre === "J-POP" ? styles.recommended : ""
            }`}
            onMouseEnter={() =>
                playPreview("/audio/mode-jpop-preview.wav")
            }
            onMouseLeave={stopPreview}
            >

            {selectedGenre === "J-POP" && (
                <div className={styles.recommendBadge}>
                ✦ 추천 모드
                </div>
            )}

            <article className={`${styles.modeCard} ${styles.jpopCard}`}>
              <div
                className={`${styles.cardBackground} ${styles.jpopBackground}`}
              ></div>

              <div className={`${styles.record} ${styles.jpopRecord}`}>
                <span>✿</span>
              </div>

              <h2>J-POP</h2>
              <p>일본 인기곡으로 감성을 느껴보세요!</p>

              <div className={styles.modeInfo}>
                <span>♫ 414곡</span>
                <span className={styles.divider}>|</span>
                <span>난이도 ★★☆</span>
              </div>

                <button onClick={() => router.push("/game/play?mode=J-POP")}>
                <span>PLAY</span>
                <span className={styles.playArrow}>›</span>
                </button>

            </article>
          </div>

          {/* POP */}
            <div
            className={`${styles.cardWrapper} ${
                selectedGenre === "POP" ? styles.recommended : ""
            }`}
            onMouseEnter={() =>
                playPreview("/audio/mode-pop-preview.wav")
            }
            onMouseLeave={stopPreview}
            >
              {selectedGenre === "POP" && (
                <div className={styles.recommendBadge}>
                ✦ 추천 모드
                </div>
              )}
            <article className={`${styles.modeCard} ${styles.popCard}`}>
              <div
                className={`${styles.cardBackground} ${styles.popBackground}`}
              ></div>

              <div className={`${styles.record} ${styles.popRecord}`}>
                <span>★</span>
              </div>

              <h2>POP</h2>
              <p>전 세계 인기곡에 도전하세요!</p>

              <div className={styles.modeInfo}>
                <span>♫ 298곡</span>
                <span className={styles.divider}>|</span>
                <span>난이도 ★★★</span>
              </div>

                <button onClick={() => router.push("/game/play?mode=POP")}>
                <span>PLAY</span>
                <span className={styles.playArrow}>›</span>
                </button>
            </article>
          </div>

          {/* HARD */}
            <div className={`${styles.cardWrapper} ${styles.lockedWrapper}`}>
                <div className={styles.lockBadge}>
                    🔒 잠김
                </div>

                <article className={`${styles.modeCard} ${styles.hardCard}`}>
                    <div
                    className={`${styles.cardBackground} ${styles.hardBackground}`}
                    ></div>

                    <div className={`${styles.record} ${styles.hardRecord}`}>
                    <span>🔒</span>
                    </div>

                    <h2>HARD</h2>

                    <p>모든 음악이 랜덤으로 출제됩니다!</p>

                    <div className={styles.modeInfo}>
                    <span>♫ 1,074곡+</span>
                    <span className={styles.divider}>|</span>
                    <span>난이도 ★★★★★</span>
                    </div>

                    <div className={styles.unlockInfo}>
                    <span>🔒</span>

                    <p>
                        K-POP / J-POP / POP
                        <br />
                        각 모드에서 일정 기록 달성 시 해금!
                    </p>
                    </div>
                </article>
            </div>
        </section>

        <section className={styles.bottomArea}>
            <Link href="/game" className={styles.backButton}>
            ← 이전으로
            </Link>

            <div className={styles.challengeMessage}>
                🏆 자신있는 모드를 골라 최고 점수에 도전해보세요!
            </div>
        </section>
      </main>
    </>
  );
}