import { describe, expect, it } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { useSyncExternalStore } from "react";

type StoreListener = () => void;
type GameState = {};

class PokerStore {
  private static instance: PokerStore;
  private listeners = new Set<StoreListener>();
  private state = {};

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
});
