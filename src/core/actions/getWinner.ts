import { Winner } from "../../components/PokerHandComparison/WinnerDisplay";
import { HandRank } from "./rankHand";

export const getWinner = (
  firstRank: HandRank | null,
  secondRank: HandRank | null,
): Winner | null => {
  if (firstRank == null || secondRank == null) return null;
  return firstRank === secondRank
    ? Winner.TIE
    : firstRank > secondRank
      ? Winner.Player1
      : Winner.Player2;
};
