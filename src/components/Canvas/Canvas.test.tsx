import { render, screen } from "@testing-library/react";
import Canvas from "./Canvas";

describe("Canvas component", () => {
  test("Render all option tools", () => {
    render(<Canvas />);
    expect(screen.getByText("drawing")).toBeInTheDocument();
  });
});
