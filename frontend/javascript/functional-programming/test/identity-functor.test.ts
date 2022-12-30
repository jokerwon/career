import { describe, expect, it } from "vitest";
import IdentityFunctor from "@/identity-functor";

describe("identity-functor", () => {
  it("should be 21", () => {
    const computeBox = IdentityFunctor(10).map(add4).map(mutiply3).map(divide2);
    expect(computeBox.valueOf()).toBe(21);
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
