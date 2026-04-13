import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressRing } from "../components/ui/ProgressRing";
import React from "react";
import "@testing-library/jest-dom";

describe("ProgressRing", () => {
  it("renders children correctly", () => {
    render(
      <ProgressRing value={50}>
        <span>Test Content</span>
      </ProgressRing>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies correct size", () => {
    const { container } = render(<ProgressRing value={50} size={300} />);
    const div = container.firstChild as HTMLElement;
    expect(div.style.width).toBe("300px");
    expect(div.style.height).toBe("300px");
  });
});
