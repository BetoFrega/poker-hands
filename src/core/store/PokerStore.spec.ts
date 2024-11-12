import { describe, expect, it } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { useSyncExternalStore } from "react";
import { Card, CardSuitEnum, CardValueEnum } from "../types/Card";

type StoreListener = () => void;
type GameState = {
  deck: {
    card: Card;
    /**
     * If a player has this card in their hand, this field will be set to player number.
     * Otherwise, it will be undefined.
     */
    hand?: 1 | 2;
  }[];
};

class PokerStore {
  private static instance: PokerStore;
  private listeners = new Set<StoreListener>();
  private state = {
    deck: Object.values(CardSuitEnum)
      .map((suit) => {
        return Object.values(CardValueEnum).map((value) => {
          return { card: { suit, value }, hand: undefined };
        });
      })
      .flat(),
  };

  subscribe = (listener: StoreListener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
  getSnapshot = (): GameState => this.state;

  private constructor() {}

  public static getInstance(): PokerStore {
    if (!PokerStore.instance) {
      PokerStore.instance = new PokerStore();
    }
    return PokerStore.instance;
  }
}

describe(PokerStore, () => {
  it("should be a singleton", () => {
    const pokerStore1 = PokerStore.getInstance();
    const pokerStore2 = PokerStore.getInstance();
    expect(pokerStore1).toBe(pokerStore2);
  });
  it("should support useSyncExternalStore", () => {
    const pokerStore = PokerStore.getInstance();
    const { result } = renderHook(() =>
      useSyncExternalStore(pokerStore.subscribe, pokerStore.getSnapshot),
    );
    expect(result).toBeDefined();
  });
  it("should list all cards in the deck", () => {
    const pokerStore = PokerStore.getInstance();
    const { result } = renderHook(() =>
      useSyncExternalStore(pokerStore.subscribe, pokerStore.getSnapshot),
    );
    expect(result.current.deck).toHaveLength(52);
  });
});
