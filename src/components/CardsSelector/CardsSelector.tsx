import React, { useCallback } from "react";
import { DeckCard } from "../../core/store/PokerStore";
import { usePokerStore } from "../../core/store/usePokerStore";
import { CardButton } from "../CardButton/CardButton";
import styles from "./CardsSelector.module.css";

type Props = {
  player: 1 | 2;
};

export const CardsSelector = ({ player }: Props) => {
  const { state, pokerStore } = usePokerStore();
  const clickHandler = useCallback(
    (deckCard: DeckCard | null) => {
      if (!deckCard) return;
      if (deckCard.hand === player) {
        pokerStore.returnCard(player, deckCard.card);
      } else {
        pokerStore.pickCard(player, deckCard.card);
      }
    },
    [player, pokerStore],
  );
  return (
    <div className={`${styles.Container}`}>
      {state.deck.map((deckCard) => (
        <CardButton
          deckCard={deckCard}
          onClick={clickHandler}
          player={player}
          key={deckCard.card.value + deckCard.card.suit}
        />
      ))}
    </div>
  );
};
