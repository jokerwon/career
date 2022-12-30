import { describe, expect, it } from "vitest";
import pipe from "@/pipe";

describe("pipe", () => {
  it("should be 21", () => {
    const compute = pipe(add4, mutiply3, divide2);
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
