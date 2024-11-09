import React, { ComponentProps, useState } from "react";
import { cardInArray, removeCardFromArray } from "../../core/actions/cardArray";
import { Card } from "../../core/types/Card";
import { cx } from "../../helpers/cx";
import { CardsSelector } from "../CardsSelector/CardsSelector";
import { HandDisplay } from "../HandDisplay/HandDisplay";
import styles from "./HandManager.module.css";

export const HandManager: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedHand, selectHand] = useState<null | 1 | 2>(null);
  const selectionHandler: ComponentProps<typeof CardsSelector>["onSelect"] = (
    card,
  ) => {
    if (cardInArray(cards, card)) {
      setCards((cards) => removeCardFromArray(cards, card));
    } else if (cards.length < 5) {
      setCards((cards) => [...cards, card]);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={cx([
          styles.handContainer,
          selectedHand === 1 && styles.selectedHand,
        ])}
      >
        <p>First Hand</p>
        <HandDisplay cards={cards} />
        <button
          className={styles.button}
          onClick={() => selectHand(1)}
          disabled={selectedHand === 1}
        >
          {selectedHand === 1 ? "Selecting" : "Select"} cards
        </button>
      </div>
      <div
        className={cx([
          styles.selectorContainer,
          !!selectedHand && styles.open,
        ])}
      >
        {selectedHand && <p>Selecting cards for Hand {selectedHand}</p>}
        <button onClick={() => selectHand(null)}>Close 🅧</button>
        <CardsSelector selectedCards={cards} onSelect={selectionHandler} />
      </div>
      <div
        className={cx([
          styles.handContainer,
          selectedHand === 2 && styles.selectedHand,
        ])}
      >
        <p>Second Hand</p>
        <HandDisplay cards={cards} />
        <button
          className={styles.button}
          onClick={() => selectHand(2)}
          disabled={selectedHand === 2}
        >
          Select cards
        </button>
      </div>
    </div>
  );
};
