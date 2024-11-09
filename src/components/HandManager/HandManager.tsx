import React, { ComponentProps, useState } from "react";
import { Card } from "../../core/types/Card";
import { CardsSelector } from "../CardsSelector/CardsSelector";
import { HandDisplay } from "../HandDisplay/HandDisplay";
import styles from "./HandManager.module.css";

export const HandManager: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const selectionHandler: ComponentProps<typeof CardsSelector>["onSelect"] = (
    card,
  ) => {
    if (cards.length < 5) setCards((cards) => [...cards, card]);
  };

  return (
    <div className={styles.container}>
      <HandDisplay cards={cards} />
      <CardsSelector selectedCards={cards} onSelect={selectionHandler} />
    </div>
  );
};
