import { useCallback } from "react";
import { CardSuitEnum, CardValueEnum } from "../../core/types/Card";
import { cx } from "../../helpers/cx";
import { DeckCard } from "../../store/PokerStore";
import styles from "./CardButton.module.css";

const suitIconMap: Record<CardSuitEnum, string> = {
  [CardSuitEnum.Hearts]: "♥",
  [CardSuitEnum.Clubs]: "♣",
  [CardSuitEnum.Diamonds]: "♦",
  [CardSuitEnum.Spades]: "♠",
};
const suitNameMap: Record<CardSuitEnum, string> = {
  [CardSuitEnum.Hearts]: "Hearts",
  [CardSuitEnum.Clubs]: "Clubs",
  [CardSuitEnum.Diamonds]: "Diamonds",
  [CardSuitEnum.Spades]: "Spades",
};
export const valueNameMap: Record<CardValueEnum, string> = {
  [CardValueEnum.Two]: "Two",
  [CardValueEnum.Three]: "Three",
  [CardValueEnum.Four]: "Four",
  [CardValueEnum.Five]: "Five",
  [CardValueEnum.Six]: "Six",
  [CardValueEnum.Seven]: "Seven",
  [CardValueEnum.Eight]: "Eight",
  [CardValueEnum.Nine]: "Nine",
  [CardValueEnum.Ten]: "Ten",
  [CardValueEnum.Jack]: "Jack",
  [CardValueEnum.Queen]: "Queen",
  [CardValueEnum.King]: "King",
  [CardValueEnum.Ace]: "Ace",
};

function getCardStyle(deckCard: DeckCard | null, player: 1 | 2 | null) {
  if (!deckCard) return styles.empty;
  if (deckCard.hand) {
    if (deckCard.hand === player) return styles.selected;
    return styles.unavailable;
  }
}

export function CardButton({
  deckCard,
  onClick,
  player,
}: {
  deckCard: DeckCard | null;
  onClick?: (value: DeckCard | null) => void;
  player: 1 | 2 | null;
}) {
  const onClickHandler: () => void = useCallback(() => {
    onClick?.(deckCard);
  }, [onClick, deckCard]);
  const cardName = deckCard
    ? `${valueNameMap[deckCard.card.value]} of ${suitNameMap[deckCard.card.suit]}`
    : "Empty card";
  const cardStyle = getCardStyle(deckCard, player);
  return (
    <div
      className={cx([styles.CardButton, cardStyle, onClick && styles.pointer])}
      onClick={onClickHandler}
      aria-label={cardName}
      role="button"
    >
      <p className={styles.CardValue}>{deckCard?.card.value}</p>
      <p className={styles.CardSuit}>
        {deckCard && suitIconMap[deckCard.card.suit]}
      </p>
    </div>
  );
}
