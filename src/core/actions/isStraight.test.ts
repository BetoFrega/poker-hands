import { describe, expect, it } from "@jest/globals";
import { isFiveHighStraight, isStraight } from "./isStraight";
import { parseHandString } from "./parseHandString";

describe("isStraight", () => {
  it("should return true for small ace sequence", () => {
    // A,2,3,4,5 => sequence
    const cards = parseHandString("Ah,2c,3h,4c,5h");
    const result = isStraight(cards);
    expect(result).toBe(true);
  });
  it("should return true for high ace sequence", () => {
    // 10,J,Q,K,A => sequence
    const cards = parseHandString("Ah,Kh,Qc,Jh,Tc");
    const result = isStraight(cards);
    expect(result).toBe(true);
  });
  it("should return true for any sequence", () => {
    expect(isStraight(parseHandString("2h,3h,4c,5h,6c"))).toBe(true);
    expect(isStraight(parseHandString("3h,4c,5h,6c,7d"))).toBe(true);
    expect(isStraight(parseHandString("4c,5h,6c,7d,8h"))).toBe(true);
    expect(isStraight(parseHandString("5h,6c,7d,8h,9s"))).toBe(true);
    expect(isStraight(parseHandString("6c,7d,8h,9s,Tc"))).toBe(true);
    expect(isStraight(parseHandString("7d,8h,9s,Tc,Jd"))).toBe(true);
    expect(isStraight(parseHandString("8h,9s,Tc,Jd,Qh"))).toBe(true);
    expect(isStraight(parseHandString("9s,Tc,Jd,Qh,Ks"))).toBe(true);
  });
  it("should return false for high ace followed by numbers", () => {
    // J,Q,K,A,2 => not sequence
    const cards = parseHandString("2h,Ah,Kh,Qc,Jh");
    const result = isStraight(cards);
    expect(result).toBe(false);
  });
  it("should return false for other non-sequential hands", () => {
    expect(isStraight(parseHandString("Ah,3h,4c,5h,6c"))).toBe(false);
    expect(isStraight(parseHandString("7d,8h,9s,Tc,Qd"))).toBe(false);
    expect(isStraight(parseHandString("2h,3h,4c,5h,7c"))).toBe(false);
    expect(isStraight(parseHandString("3h,4c,5h,6c,8d"))).toBe(false);
    expect(isStraight(parseHandString("4c,5h,6c,7d,9h"))).toBe(false);
    expect(isStraight(parseHandString("5h,6c,7d,8h,Ts"))).toBe(false);
    expect(isStraight(parseHandString("6c,7d,8h,9s,Jc"))).toBe(false);
  });
});
describe("isFiveHighStraight", () => {
  it("should return true for a 5 high straight", () => {
    expect(isFiveHighStraight(parseHandString("2h,3h,4c,5h,Ac"))).toBe(true);
  });
  it("should return false for a non 5 high straight", () => {
    expect(isFiveHighStraight(parseHandString("2h,3h,4c,5h,6c"))).toBe(false);
  });
});
