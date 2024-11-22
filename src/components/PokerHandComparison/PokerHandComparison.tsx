import React from "react";
import { usePokerStore } from "@/store/usePokerStore";
import { HandManager } from "../HandManager/HandManager";
import styles from "./PokerHandComparison.module.css";
import { WinnerDisplay } from "./WinnerDisplay";

export const PokerHandComparison: React.FC = () => {
  const { state } = usePokerStore();
  return (
    <div className={styles.container}>
      <HandManager player={1} />
      <WinnerDisplay winner={state.winner} />
      <HandManager invertedLayout player={2} />
    </div>
  );
};
