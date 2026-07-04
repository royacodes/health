import { describe, expect, it } from "vitest";
import app from "./index.js";

describe("Health API", () => {
  it("GET /health returns ok status", async () => {
    const req = new Request("http://localhost/health");
    const res = await app.fetch(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ status: "ok" });
  });
});
