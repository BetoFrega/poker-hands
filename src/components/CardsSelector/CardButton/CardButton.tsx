import { useCallback } from "react";
import { Card, CardSuitEnum } from "../../../core/types/Card";
import styles from "./CardButton.module.css";

const suitIconMap: Record<CardSuitEnum, string> = {
  [CardSuitEnum.Hearts]: "♥",
  [CardSuitEnum.Clubs]: "♣",
  [CardSuitEnum.Diamonds]: "♦",
  [CardSuitEnum.Spades]: "♠",
};

export function CardButton({
  card,
  isSelected,
  onClick,
}: {
  card: Card;
  onClick?: (value: Card) => void;
  isSelected?: boolean;
}) {
  const onClickHandler: () => void = useCallback(() => {
    onClick?.(card);
  }, [onClick, card]);
  return (
    <div
      className={`${styles.CardButton} ${isSelected ? styles.selected : ""}`}
      onClick={onClickHandler}
    >
      <p className={styles.CardValue}>{card.value}</p>
      <p className={styles.CardSuit}>{suitIconMap[card.suit]}</p>
    </div>
  );
}
