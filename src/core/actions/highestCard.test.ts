import { describe, expect, it } from "@jest/globals";
import { highestCard } from "./highestCard";
import { parseHandString } from "./parseHandString";

describe("highestCard", () => {
  it("should return the highest card in a hand", () => {
    const hand = parseHandString("3h,6h,Th,Qh,Ah");
    const result = highestCard(hand);
    expect(result).toEqual({ value: "A", suit: "h" });
  });
  it("should not consider an Ace the highest card for a Five-high Straight", () => {
    const hand = parseHandString("2h,3h,4h,5h,Ah");
    const result = highestCard(hand);
    expect(result).toEqual({ value: "5", suit: "h" });
  });
  it("should consider an Ace the Highest card for an Ace-high Straight", () => {
    const hand = parseHandString("Th,Jh,Qh,Kh,Ah");
    const result = highestCard(hand);
    expect(result).toEqual({ value: "A", suit: "h" });
  });
  it("should return the Ace as the highest card when not a Five-high straight", () => {
    const hand = parseHandString("2h,2h,4h,4h,Ah");
    const result = highestCard(hand);
    expect(result).toEqual({ value: "A", suit: "h" });
  });
  it("should return null when an empty array is provided", () => {
    const result = highestCard([]);
    expect(result).toBeNull();
  });
});
