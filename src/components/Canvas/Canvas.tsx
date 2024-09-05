"use client";
import { useRef } from "react";
import styles from "./canvas.module.css";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      width={450}
      height={382}
    />
  );
};

export default Canvas;
