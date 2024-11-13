import { describe, expect, it } from "@jest/globals";
import { PlayerHand } from "../../store/PokerStore";
import { CardSuitEnum, CardValueEnum } from "../types/Card";
import { HandRank } from "../types/HandRank";
import { Winner } from "../types/Winner";
import { getWinner } from "./getWinner";
import { parseHandString } from "./parseHandString";

describe("getWinner", () => {
  it("should pick a winner when a hand is high card only", () => {
    const hand1: PlayerHand = {
      handRank: HandRank.HighCard,
      highestCard: { value: CardValueEnum.Queen, suit: CardSuitEnum.Hearts },
      cards: parseHandString("2h,4c,6s,8d,Qh"),
    };
    const hand2: PlayerHand = {
      handRank: HandRank.Pair,
      highestCard: { value: CardValueEnum.Queen, suit: CardSuitEnum.Hearts },
      cards: parseHandString("2c,4h,6d,Qds,Qc"),
    };
    const result = getWinner(hand1, hand2);
    expect(result).toBe(Winner.Player2);
  });
});
