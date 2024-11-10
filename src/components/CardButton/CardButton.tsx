import { useCallback } from "react";
import { Card, CardSuitEnum } from "../../core/types/Card";
import { cx } from "../../helpers/cx";
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
  card: Card | null;
  onClick?: (value: Card | null) => void;
  isSelected?: boolean;
}) {
  const onClickHandler: () => void = useCallback(() => {
    onClick?.(card);
  }, [onClick, card]);
  return (
    <div
      className={cx([
        styles.CardButton,
        isSelected && styles.selected,
        card === null && styles.empty,
        onClick && styles.pointer,
      ])}
      onClick={onClickHandler}
    >
      <p className={styles.CardValue}>{card?.value}</p>
      <p className={styles.CardSuit}>{card && suitIconMap[card.suit]}</p>
    </div>
  );
}
