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
  const { analyser } = useBgm();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!analyser) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let animationId: number;

    const draw = () => {
      animationId = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const time = performance.now() * 0.002;

      /*
       * TOP
       * SONG 위 작은 이퀄라이저
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
          const dataIndex = 15 + i * 2;

          const value = dataArray[dataIndex] ?? 0;

          const audioHeight =
            (value / 255) * canvas.height * 0.7;

          const center = (barCount - 1) / 2;
          const distance = Math.abs(i - center);

          const shape =
            0.55 +
            (1 - distance / center) * 0.45;

          const barHeight = Math.max(
            10,
            audioHeight * shape
          );

          const x = i * (barWidth + gap);
          const y = canvas.height - barHeight;

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
       * LEFT
       * 물결 + 음악 반응
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
          const dataIndex =
            Math.floor(
              (i / barCount) *
                (bufferLength * 0.3)
            );

          const value = dataArray[dataIndex] ?? 0;

          /*
           * 기본 형태
           * 화면 바깥쪽이 높고 중앙으로 갈수록 낮아짐
           */
          const position =
            1 - i / (barCount - 1);

          const shape =
            0.2 +
            Math.pow(position, 0.65) * 0.8;

          /*
           * 부드러운 물결
           */
            const bigWave =
            Math.sin(i * 0.32 + time * 1.1) * 0.16;

            const midWave =
            Math.sin(i * 0.85 - time * 1.8) * 0.11;

            const smallWave =
            Math.sin(i * 1.7 + time * 2.4) * 0.06;

            const wave =
            0.43 +
            bigWave +
            midWave +
            smallWave;

            const music =
            (value / 255) * 0.22;

            const strength =
            Math.max(
                0.08,
                Math.min(1, wave + music)
            );

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

          const segmentCount =
            Math.floor(
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
       * RIGHT
       * LEFT와 반대 방향으로 흐르는 물결
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
          const dataIndex =
            Math.floor(
              bufferLength * 0.25 +
                (i / barCount) *
                  (bufferLength * 0.35)
            );

          const value = dataArray[dataIndex] ?? 0;

          /*
           * 오른쪽 끝이 높고
           * 중앙으로 갈수록 낮아짐
           */
          const position =
            i / (barCount - 1);

          const shape =
            0.2 +
            Math.pow(position, 0.65) * 0.8;

          /*
           * LEFT와 반대 방향 물결
           */
            const bigWave =
            Math.sin(i * 0.32 - time * 1.1) * 0.16;

            const midWave =
            Math.sin(i * 0.85 + time * 1.8) * 0.11;

            const smallWave =
            Math.sin(i * 1.7 - time * 2.4) * 0.06;

            const wave =
            0.43 +
            bigWave +
            midWave +
            smallWave;

            const music =
            (value / 255) * 0.22;

            const strength =
            Math.max(
                0.08,
                Math.min(1, wave + music)
            );

            // 0 = 화면 바깥쪽
          // 1 = 화면 중앙쪽
          const depth = i / (barCount - 1);
  
          // 중앙으로 갈수록 멀리 있는 것처럼 작아짐
          const perspectiveScale =
          1 - depth * 0.55;

          const barHeight =
          canvas.height *
          shape *
          strength *
          perspectiveScale;

          const x =
            i * (barWidth + gap);

          const segmentCount =
            Math.floor(
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

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [analyser, variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.visualizer} ${styles[variant]}`}
      width={1200}
      height={400}
    />
  );
}