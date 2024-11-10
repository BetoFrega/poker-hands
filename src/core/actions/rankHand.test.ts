import { describe, expect, it } from "@jest/globals";
import { parseHandString } from "./parseHandString";
import { HandRank, rankHand } from "./rankHand";

describe("rankHand", () => {
  it("should rank a straight flush", () => {
    const cards = parseHandString("2h,3h,4h,5h,6h");
    const result = rankHand(cards);
    expect(result).toBe(HandRank.StraightFlush);
  });
  it("should rank a four of a kind", () => {
    const cards = parseHandString("2h,2d,2c,2s,3h");
    const result = rankHand(cards);
    expect(result).toBe(HandRank.FourOfAKind);
  });
  it("should rank a full house", () => {
    const cards = parseHandString("2h,2d,2c,3s,3h");
    const result = rankHand(cards);
    expect(result).toBe(HandRank.FullHouse);
  });
  it("should rank a flush", () => {
    const cards = parseHandString("2h,3h,4h,5h,7h");
    const result = rankHand(cards);
    expect(result).toBe(HandRank.Flush);
  });
  it("should rank a straight", () => {
    const cards = parseHandString("2h,3d,4c,5s,6h");
    const result = rankHand(cards);
    expect(result).toBe(HandRank.Straight);
  });
  it("should rank a three of a kind", () => {
    const cards = parseHandString("2h,2d,2c,3s,4h");
    const result = rankHand(cards);
    expect(result).toBe(HandRank.ThreeOfAKind);
  });
  it("should rank a two pair", () => {
    const cards = parseHandString("2h,2d,3c,3s,4h");
    const result = rankHand(cards);
    expect(result).toBe(HandRank.TwoPair);
  });
  it("should rank a pair", () => {
    const cards = parseHandString("2h,2d,3c,4s,5h");
    const result = rankHand(cards);
    expect(result).toBe(HandRank.Pair);
  });
  it("should rank a high card", () => {
    const cards = parseHandString("2h,3d,4c,5s,7h");
    const result = rankHand(cards);
    expect(result).toBe(HandRank.HighCard);
  });
});
