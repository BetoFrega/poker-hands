import React from "react";
import { HandManager } from "../HandManager/HandManager";
import styles from "./PokerHandComparison.module.css";

export const PokerHandComparison: React.FC = () => {
  return (
    <div className={styles.container}>
      <HandManager />
      <HandManager invertedLayout />
    </div>
  );
};
