import { describe, expect, it } from "vitest";
import curry from "@/curry";
import pipe from "@/pipe";

describe("curry", () => {
  it("should be 21", () => {
    const curriedAdd = curry(add);
    
    const curriedMultiply = curry(multiply);
    const curriedAddMore = curry(addMore);
    const curriedDivide = curry(divide);
    const compute = pipe(
      curriedAdd(1),
      curriedMultiply(2)(3),
      curriedAddMore(1)(2)(3),
      curriedDivide(300)
    );
    expect(compute(3)).toBe(10);
  });
});

function add(a: number, b: number) {
  return a + b;
}

function multiply(a: number, b: number, c: number) {
  return a * b * c;
}

function addMore(a: number, b: number, c: number, d: number) {
  return a + b + c + d;
}

function divide(a: number, b: number) {
  return a / b;
}
