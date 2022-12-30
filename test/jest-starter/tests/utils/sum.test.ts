import sum from "@/utils/sum";

describe("sum", () => {
  it("it can sum", () => {
    expect(sum(1, 2)).toEqual(3);
  });
});
