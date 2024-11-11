import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { HandRank } from "../../core/actions/rankHand";
import { isNumber } from "../../helpers/isNumber";
import { HandManager } from "../HandManager/HandManager";
import styles from "./PokerHandComparison.module.css";

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
  return (
    <div className={styles.container}>
      <HandManager onRankChange={onFirstRankChange} player={1} />
      {isNumber(ranks.firstHand?.rank) && isNumber(ranks.secondHand?.rank) && (
        <div>
          {ranks.firstHand?.rank === ranks.secondHand?.rank ? (
            "It's a tie!"
          ) : (
            <>
              The winner is{" "}
              {ranks.firstHand?.rank > ranks.secondHand?.rank
                ? "First Player"
                : "Second Player"}
              !
            </>
          )}
        </div>
      )}
      <HandManager
        invertedLayout
        onRankChange={onSecondRankChange}
        player={2}
      />
    </div>
  );
};
