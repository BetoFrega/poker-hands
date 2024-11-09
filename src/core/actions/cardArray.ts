import { Card } from "../types/Card";

export function cardInArray(cards: Card[], card: Card): boolean {
  return cards.some((c) => c.value === card.value && c.suit === card.suit);
}

export function removeCardFromArray(cards: Card[], card: Card): Card[] {
  return cards.filter((c) => c.value !== card.value || c.suit !== card.suit);
}
