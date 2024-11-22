import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { CardSuitEnum, CardValueEnum } from "../core/types/Card";
import { TestPokerStoreProvider } from "./testWrapper";

import { usePokerStore } from "./usePokerStore";

describe("usePokerStore", () => {
  it("should return the initial state", () => {
    const { result } = renderHook(usePokerStore, {
      wrapper: TestPokerStoreProvider,
    });
    expect(result.current.state.deck.length).toBe(52);
    result.current.state.deck.forEach((deckCard) => {
      expect(deckCard.hand).toBeUndefined();
    });
  });
  it("should update the state when cards are played", () => {
    const { result } = renderHook(usePokerStore, {
      wrapper: TestPokerStoreProvider,
    });
    const { pokerStore } = result.current;
    act(() => {
      pokerStore.pickCard(1, {
        suit: CardSuitEnum.Diamonds,
        value: CardValueEnum.Ten,
      });
    });
    expect(result.current.state.hands.player1.cards).toHaveLength(1);
    expect(
      result.current.state.deck.find((deckCard) => deckCard.hand === 1),
    ).toBeDefined();
  });
});
