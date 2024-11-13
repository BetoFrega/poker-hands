import React, { useState } from "react";
import { HandRank } from "../../core/actions/rankHand";
import { cx } from "../../helpers/cx";
import { usePokerStore } from "../../store/usePokerStore";
import { CardsSelector } from "../CardsSelector/CardsSelector";
import { HandDisplay } from "../HandDisplay/HandDisplay";
import styles from "./HandManager.module.css";

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
type Props = {
  invertedLayout?: boolean;
  player: 1 | 2;
};
export const HandManager: React.FC<Props> = ({ invertedLayout, player }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { state } = usePokerStore();

  const handRank = state.hands[`player${player}`].handRank;
  return (
    <>
      <div
        className={cx([
          styles.handContainer,
          invertedLayout && styles.inverted,
        ])}
        aria-label={`Player ${player} section`}
      >
        <p>{invertedLayout ? "Second Player" : "First Player"}</p>
        <HandDisplay cards={state.hands[`player${player}`].cards} />
        {handRank !== null && (
          <p aria-label="Hand rank" className={styles.handRank}>
            {handRankStringMap[handRank]}
          </p>
        )}
        <button
          className={styles.button}
          onClick={() => setIsOpen(true)}
          disabled={isOpen}
        >
          {isOpen ? "Selecting" : "Select"} P{player} cards
        </button>
        <div
          className={cx([
            styles.selectorContainer,
            isOpen && styles.openSelector,
          ])}
          aria-label={`P${player} Card Selector`}
        >
          <button onClick={() => setIsOpen(false)}>Close 🅧</button>
          <CardsSelector player={player} />
        </div>
      </div>
    </>
  );
};
