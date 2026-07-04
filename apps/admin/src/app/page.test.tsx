import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Page from "./page";

describe("Admin Dashboard", () => {
  it("renders the heading", () => {
    render(<Page />);
    expect(screen.getByText("Admin Dashboard")).toBeDefined();
  });
});
