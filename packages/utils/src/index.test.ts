import { describe, expect, it } from "vitest";
import { assertNever, cn, sleep } from "./index.js";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters falsy values", () => {
    expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar");
  });
});

describe("sleep", () => {
  it("resolves after specified time", async () => {
    const start = Date.now();
    await sleep(100);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(90);
  });
});

describe("assertNever", () => {
  it("throws for unexpected values", () => {
    expect(() => assertNever("unexpected" as never)).toThrow("Unexpected value");
  });
});
