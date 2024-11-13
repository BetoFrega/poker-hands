import React from "react";
import { Winner } from "../../core/types/Winner";
import styles from "./PokerHandComparison.module.css";

export function WinnerDisplay(props: { winner: null | Winner }) {
  return (
    <>
      {props.winner !== null && (
        <div
          aria-label="Hand comparison result"
          className={styles.WinnerDisplay}
        >
          {props.winner === Winner.TIE
            ? "It's a tie!"
            : `Player ${props.winner} wins!`}
        </div>
      )}
    </>
  );
}
