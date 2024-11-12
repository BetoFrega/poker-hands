import { useSyncExternalStore } from "react";
import { PokerStore } from "./PokerStore";

export const usePokerStore = () => {
  const pokerStore = PokerStore.getInstance();
  const state = useSyncExternalStore(
    pokerStore.subscribe,
    pokerStore.getSnapshot,
  );
  return { pokerStore, state };
};
