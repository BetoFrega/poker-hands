import { CardSuitEnum, CardValueEnum } from "../core/types/Card";

/**
 * A straight flush from Ace to Five.
 */
export const straightFlushFiveHigh = [
  { suit: CardSuitEnum.Clubs, value: CardValueEnum.Ace },
  { suit: CardSuitEnum.Clubs, value: CardValueEnum.Two },
  { suit: CardSuitEnum.Clubs, value: CardValueEnum.Three },
  { suit: CardSuitEnum.Clubs, value: CardValueEnum.Four },
  { suit: CardSuitEnum.Clubs, value: CardValueEnum.Five },
];

export const straightFlushAceHigh = [
  { suit: CardSuitEnum.Spades, value: CardValueEnum.Ten },
  { suit: CardSuitEnum.Spades, value: CardValueEnum.Jack },
  { suit: CardSuitEnum.Spades, value: CardValueEnum.Queen },
  { suit: CardSuitEnum.Spades, value: CardValueEnum.King },
  { suit: CardSuitEnum.Spades, value: CardValueEnum.Ace },
];
/**
 * A full house of Queens and Kings.
 */
export const fullHouseQueensKings = [
  { suit: CardSuitEnum.Clubs, value: CardValueEnum.Queen },
  { suit: CardSuitEnum.Diamonds, value: CardValueEnum.Queen },
  { suit: CardSuitEnum.Hearts, value: CardValueEnum.Queen },
  { suit: CardSuitEnum.Clubs, value: CardValueEnum.King },
  { suit: CardSuitEnum.Diamonds, value: CardValueEnum.King },
];
