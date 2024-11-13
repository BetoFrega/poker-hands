import { Card } from "../types/Card";
import { getValueOrder, isFiveHighStraight } from "./isStraight";

export const highestCard = (cards: Card[]): Card | null => {
  if (!cards.length) return null;
  const isBikeStraight = isFiveHighStraight(cards);
  const valueOrder = getValueOrder(isBikeStraight);
  return cards.reduce((max, card) =>
    valueOrder.indexOf(card.value) > valueOrder.indexOf(max.value) ? card : max,
  );
};
