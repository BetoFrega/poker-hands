import { Card, CardValueEnum } from "../types/Card";

export const getValueOrder = (
  /**
   * A Bicycle Straight or Wheel Straight is a straight where the Ace is the lowest card.
   * It is the only situation where the Ace is not the highest card.
   */
  isBikeStraight: boolean,
) => {
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
  if (isBikeStraight) {
    valueOrder.unshift("A");
  } else {
    valueOrder.push("A");
  }
  return valueOrder;
};

export const isFiveHighStraight = (cards: Card[]): boolean => {
  if (cards.length < 5) return false;
  const handValues = cards.map((card) => card.value);
  return [
    CardValueEnum.Ace,
    CardValueEnum.Two,
    CardValueEnum.Three,
    CardValueEnum.Four,
    CardValueEnum.Five,
  ].every((requiredValue) => handValues.includes(requiredValue));
};

/**
 * Determines if the given cards form a sequence of values.
 */
export const isStraight = (cards: Card[]) => {
  const valueOrder = getValueOrder(isFiveHighStraight(cards));
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
