"use client";
import { useRef, useState, useEffect } from "react";
import Tools from "../Tools";
import { ToolOptions } from "@/types";
import styles from "./canvas.module.css";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTool, setCurrentTool] = useState<ToolOptions>("draw");
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const [textInput, setTextInput] = useState("");
  const [currentColor, setCurrentColor] = useState<string>("red");

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        setCanvasContext(context);
        // shape used to join two line segments
        context.lineJoin = "round";
        // end points of lines
        context.lineCap = "round";
        // thickness of lines
        context.lineWidth = 4;
      }
    }
  }, []);

  // drawing
  const handleDrawingInit = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasContext) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log({ rect, event, x, y });

    canvasContext.beginPath();
    setIsDrawing(true);

    if (currentTool === "text") {
      canvasContext.font = "18px Roboto";
      canvasContext.fillStyle = currentColor;
      canvasContext.fillText(textInput, x, y);
    }
  };

  const drawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasContext) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentTool === "draw") {
      canvasContext.strokeStyle = currentColor;
      canvasContext.lineTo(x, y);
      canvasContext.stroke();
    }
  };

  const handleDrawingEnd = () => {
    setIsDrawing(false);
    if (canvasContext) {
      canvasContext.closePath();
    }
  };

  return (
    <div className={styles.canvasWrapper}>
      <Tools currentTool={currentTool} setCurrentTool={setCurrentTool} />
      <label htmlFor="color">Color:</label>
      <input
        id="color"
        type="color"
        name="color"
        value={currentColor}
        onChange={(event) => setCurrentColor(event.target.value)}
      />
      {currentTool === "text" && (
        <>
          <label htmlFor="textbox">Text box</label>
          <input
            id="textbox"
            type="text"
            name="textbox"
            value={textInput}
            onChange={(event) => setTextInput(event.target.value)}
          />
          <small>
            Type here, then select the position in which you want the input text
            to appear
          </small>
        </>
      )}
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={450}
        height={382}
        // drawing events
        onMouseDown={handleDrawingInit}
        onMouseMove={drawing}
        onMouseUp={handleDrawingEnd}
        onMouseOut={handleDrawingEnd}
      />
    </div>
  );
};

export default Canvas;
