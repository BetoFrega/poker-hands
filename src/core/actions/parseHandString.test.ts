import { describe, expect, it } from "vitest";
import { Card, CardSuitEnum, CardValueEnum } from "../types/Card";
import { parseHandString } from "./parseHandString";

describe("parseHandString", () => {
  it("should parse a hand of cards", () => {
    const hand: Card[] = parseHandString("Ah,2h,3h,4c,Qs");
    expect(hand).toEqual([
      { value: CardValueEnum.Ace, suit: CardSuitEnum.Hearts },
      { value: CardValueEnum.Two, suit: CardSuitEnum.Hearts },
      { value: CardValueEnum.Three, suit: CardSuitEnum.Hearts },
      { value: CardValueEnum.Four, suit: CardSuitEnum.Clubs },
      { value: CardValueEnum.Queen, suit: CardSuitEnum.Spades },
    ]);
  });
});
