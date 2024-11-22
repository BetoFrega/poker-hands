import React from "react";
import { Card } from "@/core/types/Card.ts";
import { CardButton } from "../CardButton/CardButton";
import styles from "./HandDisplay.module.css";
import { usePokerStore } from "@/store/usePokerStore.ts";

type Props = {
  cards: Card[];
  player: 1 | 2;
};
export const HandDisplay: React.FC<Props> = (props) => {
  const { pokerStore } = usePokerStore();
  return (
    <div className={styles.container} aria-label={"Selected hand"}>
      {props.cards.map((card) => (
        <CardButton
          deckCard={{ card }}
          key={card.value + card.suit}
          player={props.player}
          onClick={() => pokerStore.returnCard(props.player, card)}
        />
      ))}
      {
        // fill with empty cards up to 5
        Array.from({ length: 5 - props.cards.length }).map((_, index) => (
          <CardButton deckCard={null} key={index} player={null} />
        ))
      }
    </div>
  );
};
