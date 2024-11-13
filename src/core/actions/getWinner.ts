import { Winner } from "../../components/PokerHandComparison/WinnerDisplay";
import { PlayerHand } from "../../store/PokerStore";
import { getValueOrder } from "./isStraight";

export const getWinner = (
  firstHand: PlayerHand,
  secondhand: PlayerHand,
): Winner | null => {
  if (!firstHand.handRank || !secondhand.handRank) return null;
  if (firstHand.handRank > secondhand.handRank) return Winner.Player1;
  if (firstHand.handRank < secondhand.handRank) return Winner.Player2;
  if (firstHand.handRank === secondhand.handRank) {
    if (firstHand.highestCard && secondhand.highestCard) {
      const valueOrder = getValueOrder(false);
      const firstHandIndex = valueOrder.indexOf(firstHand.highestCard.value);
      const secondHandIndex = valueOrder.indexOf(secondhand.highestCard.value);
      if (firstHandIndex > secondHandIndex) {
        return Winner.Player1;
      }
      if (firstHandIndex < secondHandIndex) {
        return Winner.Player2;
      }
      return Winner.TIE;
    }
  }
  return null;
};
