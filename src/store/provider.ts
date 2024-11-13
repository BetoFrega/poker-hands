"use client";
import React from "react";
import { PokerStore } from "./PokerStore";

export const PokerStoreContext = React.createContext<PokerStore | null>(null);

export const PokerStoreProvider = PokerStoreContext.Provider;
