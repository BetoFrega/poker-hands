import { HandRank } from "../../core/types/HandRank";

export const handRankStringMap = {
  [HandRank.HighCard]: "High card",
  [HandRank.Pair]: "One pair",
  [HandRank.TwoPair]: "Two pair",
  [HandRank.ThreeOfAKind]: "Three of a kind",
  [HandRank.Straight]: "Straight",
  [HandRank.Flush]: "Flush",
  [HandRank.FullHouse]: "Full house",
  [HandRank.FourOfAKind]: "Four of a kind",
  [HandRank.StraightFlush]: "Straight flush",
};
