import { describe, expect, it } from "vitest";
import { formatCount, gatekeeperPass } from "../shared/orbife";

describe("Orbife gatekeeper", () => {
  it("requires four of five answers to pass", () => {
    expect(gatekeeperPass(3)).toBe(false);
    expect(gatekeeperPass(4)).toBe(true);
    expect(gatekeeperPass(5)).toBe(true);
  });

  it("scales the rule for another quiz length", () => {
    expect(gatekeeperPass(7, 10)).toBe(false);
    expect(gatekeeperPass(8, 10)).toBe(true);
  });
});

describe("Orbife count formatting", () => {
  it("keeps small values readable and abbreviates thousands", () => {
    expect(formatCount(241)).toBe("241");
    expect(formatCount(2100)).toBe("2.1k");
    expect(formatCount(12000)).toBe("12k");
  });
});
