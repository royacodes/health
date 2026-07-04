import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";
import HomeContent from "./page-content";

const messages = {
  home: {
    title: "Healthy Recipe Platform",
    subtitle: "Discover and share healthy recipes",
  },
};

describe("Home Page", () => {
  it("renders the heading", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HomeContent />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText("Healthy Recipe Platform")).toBeDefined();
  });
});
