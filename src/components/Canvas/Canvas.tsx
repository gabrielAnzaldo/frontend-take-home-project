"use client";
import React, { useState } from "react";
import Tools from "../Tools";
import { ToolOptions } from "@/types";
import { useCanvasContext } from "../../app/hooks/useCanvasContext";
import styles from "./canvas.module.css";

const Canvas = () => {
  const { canvasRef, canvasContext } = useCanvasContext();
  const [currentTool, setCurrentTool] = useState<ToolOptions>("draw");
  const [isDrawing, setIsDrawing] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [currentColor, setCurrentColor] = useState<string>("#FF0000");
  // have a visual indicator for eraser tool size,
  // so its clear for the user, which section is going to me erased
  const [eraserToolSize, setEraserToolSize] = useState<number>(10);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // drawing
  const handleDrawingInit = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasContext) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    canvasContext.beginPath();
    setIsDrawing(true);

    // text tool
    if (currentTool === "text") {
      canvasContext.font = "18px Roboto";
      canvasContext.fillStyle = currentColor;
      canvasContext.fillText(textInput, x, y);
    }
  };

  const drawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // update mouse position on mouse move
    setMousePosition({ x, y });
    if (!isDrawing || !canvasContext) return;

    if (currentTool === "draw") {
      canvasContext.strokeStyle = currentColor;
      canvasContext.lineTo(x, y);
      canvasContext.stroke();
    }

    if (currentTool === "erase") {
      canvasContext.globalCompositeOperation = "destination-out";
      canvasContext.beginPath();
      canvasContext.arc(x, y, eraserToolSize / 2, 0, Math.PI * 2, false);
      canvasContext.fill();
      canvasContext.globalCompositeOperation = "source-over";
    }
  };

  const handleDrawingEnd = () => {
    setIsDrawing(false);
    if (canvasContext) {
      canvasContext.closePath();
    }
  };

  const renderEraserCursor = () => {
    if (currentTool === "erase") {
      return (
        <div
          className={styles.eraserCursor}
          data-testid="eraser-cursor"
          style={{
            left: mousePosition.x - eraserToolSize / 2,
            top: mousePosition.y - eraserToolSize / 2,
            width: eraserToolSize,
            height: eraserToolSize,
          }}
        />
      );
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
            placeholder="text box"
            value={textInput}
            onChange={(event) => setTextInput(event.target.value)}
          />
          <small>
            Type here, then select the position in which you want the text to
            appear
          </small>
        </>
      )}
      {currentTool === "erase" && (
        <>
          <label htmlFor="eraseTool">Erase tool size: {eraserToolSize}</label>
          <input
            id="eraseTool"
            type="range"
            min="10"
            role="slider"
            max="50"
            step={10}
            value={eraserToolSize}
            onChange={(e) => setEraserToolSize(Number(e.target.value))}
          />
        </>
      )}
      <div className={styles.canvasEraserWrapper}>
        <canvas
          role="img"
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
        {renderEraserCursor()}
      </div>
    </div>
  );
};

export default Canvas;
