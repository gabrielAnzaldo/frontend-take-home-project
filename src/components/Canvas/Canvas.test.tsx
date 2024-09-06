import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Canvas from "./Canvas";

describe("Canvas component", () => {
  test("Render all option tools", () => {
    render(<Canvas />);
    expect(screen.getByText("drawing")).toBeInTheDocument();
    expect(screen.getByText("texbox")).toBeInTheDocument();
    expect(screen.getByText("erase")).toBeInTheDocument();
  });

  test("changes tool when buttons are clicked", () => {
    render(<Canvas />);
    fireEvent.click(screen.getByText("texbox"));
    expect(screen.getByPlaceholderText("text box")).toBeInTheDocument();
    fireEvent.click(screen.getByText("erase"));
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });
});
