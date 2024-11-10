import { Card, CardValueEnum } from "../types/Card";

export const getValueOrder = (isKingPresent: boolean) => {
  const valueOrder: string[] = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
  ];
  if (isKingPresent) {
    valueOrder.push("A");
  } else {
    valueOrder.unshift("A");
  }
  return valueOrder;
};
/**
 * Determines if the given cards form a sequence of values.
 */
export const isStraight = (cards: Card[]) => {
  const isKingPresent = cards.some((card) => card.value === CardValueEnum.King);
  const valueOrder = getValueOrder(isKingPresent);
  const cardValues = cards.map((card) => card.value);
  const sortedValues = cardValues.sort(
    (a, b) => valueOrder.indexOf(a) - valueOrder.indexOf(b),
  );
  for (let i = 0; i < sortedValues.length - 1; i++) {
    if (
      valueOrder.indexOf(sortedValues[i + 1]) -
        valueOrder.indexOf(sortedValues[i]) !==
      1
    ) {
      return false;
    }
  }
  return true;
};
