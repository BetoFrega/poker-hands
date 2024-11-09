import React from "react";
import { Card, CardSuitEnum } from "../../core/types/Card";
import styles from "./CardsSelector.module.css";
import { SuitRow } from "./SuitRow/SuitRow";

type Props = {
  selectedCards: Card[];
  onSelect?: (value: Card[]) => void;
};

export const CardsSelector = ({ selectedCards = [] }: Props) => {
  return (
    <div className={`${styles.Container}`}>
      {Object.values(CardSuitEnum).map((suit) => (
        <SuitRow key={suit} suit={suit} selectedCards={selectedCards} />
      ))}
    </div>
  );
};
