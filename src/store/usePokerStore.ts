import { useContext, useSyncExternalStore } from "react";
import { PokerStoreContext } from "./provider";

export const usePokerStore = () => {
  const pokerStore = useContext(PokerStoreContext);
  if (!pokerStore)
    throw new Error(
      "The `usePokerStore` hook can only be used in a component wrapped in a PokerStoreContext provider.",
    );
  const state = useSyncExternalStore(
    pokerStore.subscribe,
    pokerStore.getSnapshot,
    pokerStore.getSnapshot,
  );
  return { pokerStore, state };
};
