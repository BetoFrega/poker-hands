import { useCallback } from "react";
import { CardSuitEnum, CardValueEnum } from "@/core/types/Card.ts";
import { cx } from "@/helpers/cx.ts";
import { DeckCard } from "@/store/PokerStore.ts";
import styles from "./CardButton.module.css";
import { motion } from "motion/react";

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

function getCardStyle(deckCard: DeckCard | null) {
  if (!deckCard) return styles.empty;
  if (deckCard.hand) return styles.unavailable;
}

export function CardButton({
  deckCard,
  onClick,
  player,
}: {
  deckCard: DeckCard | null;
  onClick?: (value: DeckCard | null) => void;
  player?: 1 | 2 | null;
}) {
  const onClickHandler: () => void = useCallback(() => {
    onClick?.(deckCard);
  }, [onClick, deckCard]);
  const cardName = deckCard
    ? `${valueNameMap[deckCard.card.value]} of ${suitNameMap[deckCard.card.suit]}`
    : "Empty card";
  const cardStyle = getCardStyle(deckCard);
  const layoutId = deckCard
    ? `p${player}-${deckCard.card.value + deckCard.card.suit}`
    : undefined;
  return (
    <motion.div
      className={cx([styles.CardButton, cardStyle, onClick && styles.pointer])}
      onClick={onClickHandler}
      aria-label={cardName}
      role="button"
      layoutId={layoutId}
    >
      <p className={styles.CardValue}>{deckCard?.card.value}</p>
      <p className={styles.CardSuit}>
        {deckCard && suitIconMap[deckCard.card.suit]}
      </p>
    </motion.div>
  );
}
