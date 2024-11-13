import React, { PropsWithChildren } from "react";
import { PokerStore } from "./PokerStore";
import { PokerStoreProvider } from "./provider";

export const TestPokerStoreProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  // create a new PokerStore for each test so that they don't interfere with each other
  const pokerStore = new PokerStore();
  return <PokerStoreProvider value={pokerStore}>{children}</PokerStoreProvider>;
};
