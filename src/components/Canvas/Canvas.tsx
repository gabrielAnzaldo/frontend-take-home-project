"use client";
import { useRef, useState } from "react";
import Tools from "../Tools";
import styles from "./canvas.module.css";

type ToolOptions = "draw" | "text" | "erase";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTool, setCurrentTool] = useState<ToolOptions>("draw");

  return (
    <>
      <Tools currentTool={currentTool} setCurrentTool={setCurrentTool} />
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={450}
        height={382}
      />
    </>
  );
};

export default Canvas;
