import { useCallback } from "react";
import { Card, CardSuitEnum, CardValueEnum } from "../../core/types/Card";
import { cx } from "../../helpers/cx";
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
const valueNameMap: Record<CardValueEnum, string> = {
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

export function CardButton({
  card,
  isSelected,
  onClick,
}: {
  card: Card | null;
  onClick?: (value: Card | null) => void;
  isSelected?: boolean;
}) {
  const onClickHandler: () => void = useCallback(() => {
    onClick?.(card);
  }, [onClick, card]);
  const cardName = card
    ? `${valueNameMap[card.value]} of ${suitNameMap[card.suit]}`
    : "Empty card";
  return (
    <div
      className={cx([
        styles.CardButton,
        isSelected && styles.selected,
        card === null && styles.empty,
        onClick && styles.pointer,
      ])}
      onClick={onClickHandler}
      aria-label={cardName}
      role="button"
    >
      <p className={styles.CardValue}>{card?.value}</p>
      <p className={styles.CardSuit}>{card && suitIconMap[card.suit]}</p>
    </div>
  );
}
