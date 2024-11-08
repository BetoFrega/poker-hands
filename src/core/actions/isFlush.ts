import {Card} from "../types/Card";

export const isFlush = (cards: Card[]): boolean => cards.every(card => card.suit === cards[0].suit)
