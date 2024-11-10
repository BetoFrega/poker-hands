import { Card } from "../types/Card";
import { countByValue } from "./countByValue";
import { isFlush } from "./isFlush";
import { isStraight } from "./isStraight";

export enum HandRank {
  HighCard,
  Pair,
  TwoPair,
  ThreeOfAKind,
  Straight,
  Flush,
  FullHouse,
  FourOfAKind,
  StraightFlush,
}

export const rankHand = (cards: Card[]) => {
  const flush = isFlush(cards);
  const straight = isStraight(cards);
  if (straight && flush) {
    return HandRank.StraightFlush;
  }
  const equalValueCounts = countByValue(cards);
  if (equalValueCounts.includes(4)) {
    return HandRank.FourOfAKind;
  }
  const threeOfAKind: boolean = equalValueCounts.includes(3);
  const twoOfAKind: boolean = equalValueCounts.includes(2);
  if (threeOfAKind && twoOfAKind) {
    return HandRank.FullHouse;
  }
  if (flush) {
    return HandRank.Flush;
  }
  if (straight) {
    return HandRank.Straight;
  }
  if (threeOfAKind) {
    return HandRank.ThreeOfAKind;
  }
  if (twoOfAKind) {
    if (equalValueCounts.filter((value) => value === 2).length === 2) {
      return HandRank.TwoPair;
    }
    return HandRank.Pair;
  }
  return HandRank.HighCard;
};
