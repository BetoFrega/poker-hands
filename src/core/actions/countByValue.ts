import { Card, CardValueEnum } from "../types/Card";

/**
 * Count the number of equal cards in the given array.
 * Returns an array of counts, where the index has no particular meaning.
 * @example countByValue([{ value: CardValueEnum.Ace }, { value: CardValueEnum.Ace }, { value: CardValueEnum.King }]) // => [2,1]
 */
export const countByValue = (cards: Card[]): number[] => {
  const result = new Map<CardValueEnum, number>();
  cards.forEach((card) => {
    const count = result.get(card.value) ?? 0;
    result.set(card.value, count + 1);
  });
  return [...result.values()];
};
