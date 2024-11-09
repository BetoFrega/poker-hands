import React from "react";
import { Card } from "../../core/types/Card";
import { CardButton } from "../CardButton/CardButton";
import styles from "./HandDisplay.module.css";

type Props = {
  cards: Card[];
};
export const HandDisplay: React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      {props.cards.map((card) => (
        <CardButton
          card={card}
          onClick={() => {}}
          key={card.value + card.suit}
        />
      ))}
      {
        // fill with empty cards up to 5
        Array.from({ length: 5 - props.cards.length }).map((_, index) => (
          <CardButton card={null} onClick={() => {}} key={index} />
        ))
      }
    </div>
  );
};