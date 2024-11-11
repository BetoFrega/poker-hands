import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
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

export const getWinner = (firstRank: number, secondRank: number): Winner =>
  firstRank === secondRank
    ? Winner.TIE
    : firstRank > secondRank
      ? Winner.Player1
      : Winner.Player2;

export const PokerHandComparison: React.FC = () => {
  const [ranks, setRanks] = useState<Hands>({});
  const onFirstRankChange = useRankChangeCallback(setRanks, "firstHand");
  const onSecondRankChange = useRankChangeCallback(setRanks, "secondHand");
  const winner: false | Winner =
    ranks.firstHand?.rank && ranks.secondHand?.rank
      ? getWinner(ranks.firstHand?.rank, ranks.secondHand?.rank)
      : false;
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
