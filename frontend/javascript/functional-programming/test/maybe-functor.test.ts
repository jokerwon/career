import { describe, expect, it } from "vitest";
import Maybe from "@/maybe-functor";

describe("maybe-functor", () => {
  it("should be null", () => {
    const computeBox = Maybe(10)
      .map(add4)
      .map(add8)
      .map(toString)
      .map(addX)
      .inspect();
    expect(computeBox.valueOf()).toBe("Maybe {null}");
  });
});

function add4(x: any) {
  return x + 4;
}

function add8(x: any) {
  x + 8;
}

function toString(x: any) {
  return x.toString();
}

function addX(x: any) {
  return x + "X";
}

// function add10(x: any) {
//   return x + "10";
// }
