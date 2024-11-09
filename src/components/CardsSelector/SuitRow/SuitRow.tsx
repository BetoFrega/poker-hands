import React from "react";
import { Card, CardSuitEnum, CardValueEnum } from "../../../core/types/Card";
import { CardButton } from "../../CardButton/CardButton";

const cardValues = Object.values(CardValueEnum);
export const SuitRow: React.FC<{
  suit: CardSuitEnum;
  selectedCards: Card[];
  onClick: (value: Card) => void;
}> = ({ selectedCards = [], suit, onClick }) => {
  return (
    <>
      {cardValues.map((cardValue) => {
        const card: { suit: CardSuitEnum; value: CardValueEnum } = {
          value: cardValue,
          suit: suit,
        };
        return (
          <CardButton
            key={cardValue}
            card={card}
            isSelected={selectedCards.some(
              (selectedCard) =>
                cardValue === selectedCard.value && suit === selectedCard.suit,
            )}
            onClick={(value) => {
              if (value) onClick(value);
            }}
          />
        );
      })}
    </>
  );
};