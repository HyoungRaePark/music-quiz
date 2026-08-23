"use client";

import { useEffect, useRef } from "react";

import { useBgm } from "@/components/BgmProvider";
import styles from "@/styles/AudioVisualizer.module.scss";

type AudioVisualizerProps = {
  variant: "top" | "left" | "right";
};

export default function AudioVisualizer({
  variant,
}: AudioVisualizerProps) {
  /*
   * analyser
   * → 실제 BGM 주파수 데이터를 가져오기 위해 사용
   *
   * isPlaying
   * → BGM ON / OFF에 따라
   *   이퀄라이저를 보여주거나 숨기기 위해 사용
   */
  const { analyser, isPlaying } = useBgm();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    /*
     * analyser가 아직 생성되지 않았다면
     * 이퀄라이저를 그리지 않는다.
     *
     * BGM을 처음 한 번 켜면
     * BgmProvider에서 analyser가 생성된다.
     */
    if (!analyser) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    const bufferLength = analyser.frequencyBinCount;

    const dataArray = new Uint8Array(bufferLength);

    let animationId: number;

    /*
     * 이퀄라이저 애니메이션
     */
    const draw = () => {
      animationId = requestAnimationFrame(draw);

      /*
       * 현재 BGM 주파수 데이터 가져오기
       */
      analyser.getByteFrequencyData(dataArray);

      /*
       * 이전 프레임 제거
       */
      context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      /*
       * 좌우 물결 애니메이션용 시간 값
       */
      const time = performance.now() * 0.002;

      /*
       * ==================================================
       * TOP
       * SONG QUIZ 위쪽 작은 이퀄라이저
       * ==================================================
       */
      if (variant === "top") {
        const barCount = 11;
        const gap = 30;

        const barWidth =
          (canvas.width - gap * (barCount - 1)) /
          barCount;

        const gradient = context.createLinearGradient(
          0,
          0,
          canvas.width,
          0
        );

        gradient.addColorStop(0, "#596cff");
        gradient.addColorStop(0.5, "#a84dff");
        gradient.addColorStop(1, "#e549dc");

        for (let i = 0; i < barCount; i++) {
          /*
           * 너무 낮은 주파수만 읽지 않도록
           * 조금 뒤쪽 데이터를 사용
           */
          const dataIndex = 15 + i * 2;

          const value = dataArray[dataIndex] ?? 0;

          /*
           * 실제 음악 크기
           */
          const audioHeight =
            (value / 255) *
            canvas.height *
            0.7;

          /*
           * 가운데 막대가 조금 더 높도록
           * 전체적인 형태를 만든다.
           */
          const center = (barCount - 1) / 2;

          const distance = Math.abs(i - center);

          const shape =
            0.55 +
            (1 - distance / center) * 0.45;

          /*
           * 최소 높이를 유지한다.
           *
           * 실제 화면 표시 여부는
           * isPlaying에 따른 opacity로 처리한다.
           */
          const barHeight = Math.max(
            10,
            audioHeight * shape
          );

          const x = i * (barWidth + gap);

          const y =
            canvas.height - barHeight;

          context.fillStyle = gradient;

          context.shadowColor = "#8b5cff";

          context.shadowBlur = 0;

          context.fillRect(
            x,
            y,
            barWidth,
            barHeight
          );
        }
      }

      /*
       * ==================================================
       * LEFT
       * 왼쪽 물결형 이퀄라이저
       * ==================================================
       */
      if (variant === "left") {
        const barCount = 34;
        const gap = 5;

        const segmentHeight = 8;
        const segmentGap = 4;

        const barWidth =
          (canvas.width - gap * (barCount - 1)) /
          barCount;

        const gradient = context.createLinearGradient(
          0,
          0,
          canvas.width,
          0
        );

        gradient.addColorStop(0, "#5ca8ff");
        gradient.addColorStop(0.45, "#a84dff");
        gradient.addColorStop(1, "#f04de3");

        for (let i = 0; i < barCount; i++) {
          /*
           * 사용할 주파수 범위를
           * 전체 데이터의 약 30% 정도로 제한
           */
          const dataIndex = Math.floor(
            (i / barCount) *
              (bufferLength * 0.3)
          );

          const value = dataArray[dataIndex] ?? 0;

          /*
           * 화면 바깥쪽은 높고
           * 중앙으로 갈수록 낮아지는 형태
           */
          const position =
            1 - i / (barCount - 1);

          const shape =
            0.2 +
            Math.pow(position, 0.65) * 0.8;

          /*
           * 여러 개의 sin 파형을 섞어서
           * 단순 반복처럼 보이지 않는 물결 생성
           */
          const bigWave =
            Math.sin(
              i * 0.32 + time * 1.1
            ) * 0.16;

          const midWave =
            Math.sin(
              i * 0.85 - time * 1.8
            ) * 0.11;

          const smallWave =
            Math.sin(
              i * 1.7 + time * 2.4
            ) * 0.06;

          const wave =
            0.43 +
            bigWave +
            midWave +
            smallWave;

          /*
           * 실제 음악 데이터 반영
           */
          const music =
            (value / 255) * 0.22;

          /*
           * 물결 + 음악 반응
           */
          const strength = Math.max(
            0.08,
            Math.min(
              1,
              wave + music
            )
          );

          /*
           * 중앙으로 갈수록 멀어지는
           * 원근감 표현
           */
          const depth =
            1 - i / (barCount - 1);

          const perspectiveScale =
            1 - depth * 0.55;

          const barHeight =
            canvas.height *
            shape *
            strength *
            perspectiveScale;

          const x =
            i * (barWidth + gap);

          /*
           * LED Segment처럼
           * 작은 사각형 단위로 막대를 만든다.
           */
          const segmentCount = Math.floor(
            barHeight /
              (segmentHeight + segmentGap)
          );

          context.fillStyle = gradient;

          context.shadowColor = "#c44dff";

          context.shadowBlur = 0;

          for (
            let j = 0;
            j < segmentCount;
            j++
          ) {
            const segmentY =
              canvas.height -
              (j + 1) *
                (segmentHeight + segmentGap);

            context.fillRect(
              x,
              segmentY,
              barWidth,
              segmentHeight
            );
          }
        }
      }

      /*
       * ==================================================
       * RIGHT
       * 왼쪽과 반대 방향의 물결형 이퀄라이저
       * ==================================================
       */
      if (variant === "right") {
        const barCount = 34;
        const gap = 5;

        const segmentHeight = 8;
        const segmentGap = 4;

        const barWidth =
          (canvas.width - gap * (barCount - 1)) /
          barCount;

        const gradient = context.createLinearGradient(
          0,
          0,
          canvas.width,
          0
        );

        gradient.addColorStop(0, "#e549dc");
        gradient.addColorStop(0.55, "#a84dff");
        gradient.addColorStop(1, "#596cff");

        for (let i = 0; i < barCount; i++) {
          /*
           * LEFT와 조금 다른 주파수 범위 사용
           */
          const dataIndex = Math.floor(
            bufferLength * 0.25 +
              (i / barCount) *
                (bufferLength * 0.35)
          );

          const value = dataArray[dataIndex] ?? 0;

          /*
           * 오른쪽 끝이 높고
           * 중앙으로 갈수록 낮아지는 형태
           */
          const position =
            i / (barCount - 1);

          const shape =
            0.2 +
            Math.pow(position, 0.65) * 0.8;

          /*
           * LEFT와 반대 방향으로 움직이도록
           * 시간 방향을 반대로 구성
           */
          const bigWave =
            Math.sin(
              i * 0.32 - time * 1.1
            ) * 0.16;

          const midWave =
            Math.sin(
              i * 0.85 + time * 1.8
            ) * 0.11;

          const smallWave =
            Math.sin(
              i * 1.7 - time * 2.4
            ) * 0.06;

          const wave =
            0.43 +
            bigWave +
            midWave +
            smallWave;

          /*
           * 실제 음악 반응
           */
          const music =
            (value / 255) * 0.22;

          const strength = Math.max(
            0.08,
            Math.min(
              1,
              wave + music
            )
          );

          /*
           * 중앙으로 갈수록 멀어지는
           * 원근감 표현
           */
          const depth =
            i / (barCount - 1);

          const perspectiveScale =
            1 - depth * 0.55;

          const barHeight =
            canvas.height *
            shape *
            strength *
            perspectiveScale;

          const x =
            i * (barWidth + gap);

          const segmentCount = Math.floor(
            barHeight /
              (segmentHeight + segmentGap)
          );

          context.fillStyle = gradient;

          context.shadowColor = "#596cff";

          context.shadowBlur = 0;

          for (
            let j = 0;
            j < segmentCount;
            j++
          ) {
            const segmentY =
              canvas.height -
              (j + 1) *
                (segmentHeight + segmentGap);

            context.fillRect(
              x,
              segmentY,
              barWidth,
              segmentHeight
            );
          }
        }
      }
    };

    /*
     * 애니메이션 시작
     */
    draw();

    /*
     * 컴포넌트가 사라지거나
     * analyser / variant가 변경되면
     * 기존 requestAnimationFrame 종료
     */
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [analyser, variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`
        ${styles.visualizer}
        ${styles[variant]}
        ${isPlaying ? styles.visible : styles.hidden}
      `}
      width={1200}
      height={400}
    />
  );
}