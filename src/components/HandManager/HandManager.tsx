import React, { useEffect, useState } from "react";
import { cx } from "../../helpers/cx";
import { usePokerStore } from "../../store/usePokerStore";
import { valueNameMap } from "../CardButton/CardButton";
import { CardsSelector } from "../CardsSelector/CardsSelector";
import { HandDisplay } from "../HandDisplay/HandDisplay";
import styles from "./HandManager.module.css";
import { handRankStringMap } from "./handRankStringMap";

type Props = {
  invertedLayout?: boolean;
  player: 1 | 2;
};
export const HandManager: React.FC<Props> = ({ invertedLayout, player }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { state } = usePokerStore();
  const { cards, handRank, highestCard } = state.hands[`player${player}`];
  useEffect(() => {
    if (cards.length === 5) {
      setIsOpen(false);
    }
  }, [cards]);
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
        <HandDisplay cards={cards} />
        {handRank !== null && highestCard !== null && (
          <p aria-label="Hand rank" className={styles.handRank}>
            {valueNameMap[highestCard?.value]}-high&nbsp;
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
