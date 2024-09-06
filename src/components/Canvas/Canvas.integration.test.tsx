import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Canvas from "./Canvas";

const mockContext = {
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  closePath: jest.fn(),
  fillText: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  canvas: document.createElement("canvas"),
  globalAlpha: 1.0,
  globalCompositeOperation: "source-over",
};

const mockGetContext = jest.fn(
  () => mockContext as unknown as CanvasRenderingContext2D
);

beforeEach(() => {
  jest.clearAllMocks();
  // @ts-ignore
  HTMLCanvasElement.prototype.getContext = mockGetContext;
});

describe("Canvas Integration", () => {
  test("Draving tool", async () => {
    render(<Canvas />);
    // Start with drawing tool
    const canvas = screen.getByRole("img");
    fireEvent.mouseDown(canvas, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(canvas, { clientX: 10, clientY: 10 });
    fireEvent.mouseUp(canvas);

    expect(mockContext.beginPath).toHaveBeenCalled();
    expect(mockContext.lineTo).toHaveBeenCalled();
    expect(mockContext.stroke).toHaveBeenCalled();
    expect(mockContext.closePath).toHaveBeenCalled();
  });
});
