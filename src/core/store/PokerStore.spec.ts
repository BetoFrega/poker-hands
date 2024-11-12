import { beforeEach, describe, expect, it } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { useSyncExternalStore } from "react";
import { HandRank } from "../actions/rankHand";
import { CardSuitEnum, CardValueEnum } from "../types/Card";
import { PokerStore } from "./PokerStore";

describe(PokerStore, () => {
  const pokerStore = PokerStore.getInstance();
  beforeEach(() => {
    pokerStore.reset();
  });
  it("should be a singleton", () => {
    const pokerStore1 = PokerStore.getInstance();
    const pokerStore2 = PokerStore.getInstance();
    expect(pokerStore1).toBe(pokerStore2);
  });
  it("should be able to reset its internal state", () => {
    pokerStore.pickCard(1, {
      suit: CardSuitEnum.Clubs,
      value: CardValueEnum.Ace,
    });
    pokerStore.pickCard(2, {
      suit: CardSuitEnum.Diamonds,
      value: CardValueEnum.Ace,
    });
    pokerStore.pickCard(1, {
      suit: CardSuitEnum.Hearts,
      value: CardValueEnum.Ace,
    });
    pokerStore.pickCard(2, {
      suit: CardSuitEnum.Spades,
      value: CardValueEnum.Ace,
    });
    expect(pokerStore.getSnapshot().hands.player1.cards).toHaveLength(2);
    expect(pokerStore.getSnapshot().hands.player2.cards).toHaveLength(2);
    pokerStore.reset();
    expect(pokerStore.getSnapshot().hands.player1.cards).toHaveLength(0);
    expect(pokerStore.getSnapshot().hands.player2.cards).toHaveLength(0);
  });
  it("should support useSyncExternalStore", () => {
    const { result } = renderHook(() =>
      useSyncExternalStore(pokerStore.subscribe, pokerStore.getSnapshot),
    );
    expect(result).toBeDefined();
  });
  it("should remove the listener on unmount", () => {
    const { unmount } = renderHook(() =>
      useSyncExternalStore(pokerStore.subscribe, pokerStore.getSnapshot),
    );
    expect(pokerStore.getListenerCount()).toBe(1);
    unmount();
    expect(pokerStore.getListenerCount()).toBe(0);
  });
  it("should list all cards in the deck", () => {
    const { result } = renderHook(() =>
      useSyncExternalStore(pokerStore.subscribe, pokerStore.getSnapshot),
    );
    expect(result.current.deck).toHaveLength(52);
  });
  it("should allow a user to pick cards", () => {
    const { result } = renderHook(() =>
      useSyncExternalStore(pokerStore.subscribe, pokerStore.getSnapshot),
    );
    const player = 1;
    const card = result.current.deck[0].card;
    act(() => {
      pokerStore.pickCard(player, card);
    });
    expect(result.current.deck[0].hand).toBe(1);
    expect(result.current.hands.player1.cards).toEqual([card]);
  });
  it("should not allow a player to pick more than 5 cards", () => {
    const { result } = renderHook(() =>
      useSyncExternalStore(pokerStore.subscribe, pokerStore.getSnapshot),
    );
    const player = 1;
    const cards = result.current.deck
      .slice(0, 6)
      .map((deckCard) => deckCard.card);
    cards.forEach((card) => {
      act(() => {
        pokerStore.pickCard(player, card);
      });
    });
    expect(result.current.hands.player1.cards).toHaveLength(5);
  });
  it("should not allow a player to pick a card that was already picked", () => {
    const { result } = renderHook(() =>
      useSyncExternalStore(pokerStore.subscribe, pokerStore.getSnapshot),
    );
    const card = result.current.deck[0].card;
    // player 1 picks a card
    act(() => {
      pokerStore.pickCard(1, card);
    });
    // player 2 tries to pick the same card
    act(() => {
      pokerStore.pickCard(2, card);
    });
    // player 1's hand has 1 card
    expect(result.current.hands.player1.cards).toHaveLength(1);
    // but player 2's hand still has no cards, because the card they tried to pick is not available
    expect(result.current.hands.player2.cards).toHaveLength(0);
    // player 1 then tries to pick the same card again
    act(() => {
      pokerStore.pickCard(1, card);
    });
    // but their hand still only holds 1 card
    expect(result.current.hands.player1.cards).toHaveLength(1);
  });
  it("should allow a player to return a card", () => {
    const { result } = renderHook(() =>
      useSyncExternalStore(pokerStore.subscribe, pokerStore.getSnapshot),
    );
    const card = result.current.deck[0].card;
    act(() => {
      pokerStore.pickCard(1, card);
    });
    expect(result.current.hands.player1.cards).toHaveLength(1);
    act(() => {
      pokerStore.returnCard(1, card);
    });
    expect(result.current.hands.player1.cards).toHaveLength(0);
  });
  it("should not allow a different player to return a card", () => {
    const { result } = renderHook(() =>
      useSyncExternalStore(pokerStore.subscribe, pokerStore.getSnapshot),
    );
    act(() => {
      pokerStore.pickCard(1, result.current.deck[0].card);
    });
    expect(result.current.hands.player1.cards).toHaveLength(1);
    expect(result.current.deck[0].hand).toBe(1);
    act(() => {
      pokerStore.returnCard(2, result.current.deck[0].card);
    });
    expect(result.current.hands.player1.cards).toHaveLength(1);
    expect(result.current.deck[0].hand).toBe(1);
  });
  describe("Card Ranking", () => {
    const { result } = renderHook(() =>
      useSyncExternalStore(pokerStore.subscribe, pokerStore.getSnapshot),
    );
    const player = 1;
    const cards = [
      { suit: CardSuitEnum.Clubs, value: CardValueEnum.Ace },
      { suit: CardSuitEnum.Clubs, value: CardValueEnum.Two },
      { suit: CardSuitEnum.Clubs, value: CardValueEnum.Three },
      { suit: CardSuitEnum.Clubs, value: CardValueEnum.Four },
      { suit: CardSuitEnum.Clubs, value: CardValueEnum.Five },
    ];

    beforeEach(() => {
      cards.forEach((card) => {
        act(() => {
          pokerStore.pickCard(player, card);
        });
      });
    });

    it("should rank a hand", () => {
      expect(result.current.hands.player1.handRank).toBe(
        HandRank.StraightFlush,
      );
    });
    it("should de-rank a hand with less than 5 cards", () => {
      act(() => {
        pokerStore.returnCard(1, cards[0]);
      });
      expect(result.current.hands.player1.handRank).toBe(null);
    });
  });
});
