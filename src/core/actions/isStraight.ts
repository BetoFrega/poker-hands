import { Card, CardValueEnum } from "../types/Card";

export const getValueOrder = (isBikeStraight: boolean) => {
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

export const isFiveHighStraight = (cards: Card[]): boolean =>
  cards.every((card) =>
    [
      CardValueEnum.Ace,
      CardValueEnum.Two,
      CardValueEnum.Three,
      CardValueEnum.Four,
      CardValueEnum.Five,
    ].includes(card.value),
  );

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
