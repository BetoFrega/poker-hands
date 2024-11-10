import React, { ComponentProps, useState } from "react";
import { cardInArray, removeCardFromArray } from "../../core/actions/cardArray";
import { HandRank, rankHand } from "../../core/actions/rankHand";
import { Card } from "../../core/types/Card";
import { cx } from "../../helpers/cx";
import { CardsSelector } from "../CardsSelector/CardsSelector";
import { HandDisplay } from "../HandDisplay/HandDisplay";
import styles from "./HandManager.module.css";

type Props = {
  invertedLayout?: boolean;
};

const handRankStringMap = {
  [HandRank.HighCard]: "High card",
  [HandRank.Pair]: "One pair",
  [HandRank.TwoPair]: "Two pair",
  [HandRank.ThreeOfAKind]: "Three of a kind",
  [HandRank.Straight]: "Straight",
  [HandRank.Flush]: "Flush",
  [HandRank.FullHouse]: "Full house",
  [HandRank.FourOfAKind]: "Four of a kind",
  [HandRank.StraightFlush]: "Straight flush",
};

export const HandManager: React.FC<Props> = ({ invertedLayout }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectionHandler: ComponentProps<typeof CardsSelector>["onSelect"] = (
    card,
  ) => {
    if (cardInArray(cards, card)) {
      setCards((cards) => removeCardFromArray(cards, card));
    } else if (cards.length < 5) {
      setCards((cards) => [...cards, card]);
    }
  };
  const handRank = rankHand(cards);
  return (
    <>
      <div
        className={cx([
          styles.handContainer,
          invertedLayout && styles.inverted,
        ])}
      >
        <p>{invertedLayout ? "Second Player" : "First Player"}</p>
        <HandDisplay cards={cards} />
        {cards.length === 5 && <p>{handRankStringMap[handRank] || handRank}</p>}
        <button
          className={styles.button}
          onClick={() => setIsOpen(true)}
          disabled={isOpen}
        >
          {isOpen ? "Selecting" : "Select"} cards
        </button>
        <div
          className={cx([
            styles.selectorContainer,
            isOpen && styles.openSelector,
          ])}
        >
          <button onClick={() => setIsOpen(false)}>Close 🅧</button>
          <CardsSelector selectedCards={cards} onSelect={selectionHandler} />
        </div>
      </div>
    </>
  );
};
