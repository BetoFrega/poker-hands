import { describe, expect, it } from "@jest/globals";
import { countByValue } from "./countByValue";
import { parseHandString } from "./parseHandString";

describe(countByValue, () => {
  it("should return a Map of the count of values", () => {
    const cards = parseHandString("3h,3c,3d,Qh,Qs");
    const result = countByValue(cards);
    expect(result).toContain(3);
    expect(result).toContain(2);
  });
});
