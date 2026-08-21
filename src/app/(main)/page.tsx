import AudioVisualizer from "@/components/AudioVisualizer";
import styles from "@/styles/Home.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <section className={styles.home}>

      <div className={styles.leftVisualizer}>
        <div className={styles.visualizerOriginal}>
          <AudioVisualizer variant="left" />
        </div>

        <div className={styles.visualizerReflection}>
          <AudioVisualizer variant="left" />
        </div>
      </div>

      <div className={styles.rightVisualizer}>
        <div className={styles.visualizerOriginal}>
          <AudioVisualizer variant="right" />
        </div>

        <div className={styles.visualizerReflection}>
          <AudioVisualizer variant="right" />
        </div>
      </div>

      <div className={styles.hero}>
        <AudioVisualizer variant="top" />

        <h1 className={styles.title}>
          <span>SONG</span>
          <span>QUIZ</span>
        </h1>

        <p className={styles.description}>
          음악을 듣고 제목을 맞혀보세요!
        </p>

        <div className={styles.actions}>
          <Link href="/game" className={styles.startButton}>
            <span>GAME START</span>
            <span className={styles.startArrow}></span>
          </Link>

        <button className={styles.rankingButton}>
          <span className={styles.rankingIcon}>♛</span>
          <span>RANKING</span>
          <span className={styles.rankingArrow}></span>
        </button>
        
        </div>
      </div>
    </section>
  );
}