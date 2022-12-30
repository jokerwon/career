import { describe, expect, it } from "vitest";
import compose from "@/compose";

describe("compose", () => {
  it("should be 21", () => {
    const compute = compose(divide2, mutiply3, add4);
    expect(compute(10)).toBe(21);
  });
});

function add4(num: number) {
  return num + 4;
}

function mutiply3(num: number) {
  return num * 3;
}

function divide2(num: number) {
  return num / 2;
}
