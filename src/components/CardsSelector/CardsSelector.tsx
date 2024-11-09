import React from "react";
import { Card, CardSuitEnum, CardValueEnum } from "../../core/types/Card";
import { CardButton } from "./CardButton/CardButton";

type Props = {
  selectedCards: Card[];
  onSelect: (value: Card[]) => void;
};

const cardValues = Object.values(CardValueEnum);

const SuitRow: React.FC<{ suit: CardSuitEnum; selectedCards: Card[] }> = (
  props,
) => {
  return (
    <>
      {cardValues.map((cardValue) => {
        const card: { suit: CardSuitEnum; value: CardValueEnum } = {
          value: cardValue,
          suit: props.suit,
        };
        return (
          <CardButton
            key={cardValue}
            card={card}
            isSelected={props.selectedCards.some(
              (selectedCard) =>
                cardValue === selectedCard.value &&
                props.suit === selectedCard.suit,
            )}
          />
        );
      })}
    </>
  );
};

export const CardsSelector = (props: Props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(13,1fr)",
      }}
    >
      {Object.values(CardSuitEnum).map((suit) => {
        return <SuitRow suit={suit} selectedCards={props.selectedCards} />;
      })}
    </div>
  );
};
