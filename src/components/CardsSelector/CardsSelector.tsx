import React, { useCallback } from "react";
import { usePokerStore } from "../../core/store/usePokerStore";
import { Card } from "../../core/types/Card";
import { CardButton } from "../CardButton/CardButton";
import styles from "./CardsSelector.module.css";

type Props = {
  player: 1 | 2;
};

export const CardsSelector = ({ player }: Props) => {
  const { state, pokerStore } = usePokerStore();
  const clickHandler = useCallback(
    (card?: Card) => {
      if (!card) return;
      pokerStore.pickCard(player, card);
    },
    [player, pokerStore],
  );
  return (
    <div className={`${styles.Container}`}>
      {state.deck.map((deckCard) => (
        <CardButton
          deckCard={deckCard}
          onClick={clickHandler}
          key={deckCard.card.value + deckCard.card.suit}
        />
      ))}
    </div>
  );
};
