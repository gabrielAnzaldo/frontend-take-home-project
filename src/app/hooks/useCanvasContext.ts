import { useEffect, useRef, useState } from "react";

export const useCanvasContext = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);

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

  return { canvasRef, canvasContext };
};
