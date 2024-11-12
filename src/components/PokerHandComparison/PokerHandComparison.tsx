import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { getWinner } from "../../core/actions/getWinner";
import { HandRank } from "../../core/actions/rankHand";
import { HandManager } from "../HandManager/HandManager";
import styles from "./PokerHandComparison.module.css";
import { Winner, WinnerDisplay } from "./WinnerDisplay";

type Rank = { rank: HandRank };
type Hands = {
  firstHand?: Rank;
  secondHand?: Rank;
};

function useRankChangeCallback(
  setRanks: Dispatch<SetStateAction<Hands>>,
  hand: string,
): (rank?: Rank) => void {
  return useCallback(
    (rank?: Rank) =>
      setRanks((ranks) => {
        return {
          ...ranks,
          [hand]: rank,
        };
      }),
    [hand, setRanks],
  );
}

export const PokerHandComparison: React.FC = () => {
  const [ranks, setRanks] = useState<Hands>({});
  const onFirstRankChange = useRankChangeCallback(setRanks, "firstHand");
  const onSecondRankChange = useRankChangeCallback(setRanks, "secondHand");
  const winner: null | Winner = getWinner(
    ranks.firstHand?.rank || null,
    ranks.secondHand?.rank || null,
  );
  return (
    <div className={styles.container}>
      <HandManager onRankChange={onFirstRankChange} player={1} />
      <WinnerDisplay winner={winner} />
      <HandManager
        invertedLayout
        onRankChange={onSecondRankChange}
        player={2}
      />
    </div>
  );
};
