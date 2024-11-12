import { beforeEach, describe, expect, it } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { produce } from "immer";
import { useSyncExternalStore } from "react";
import { Card, CardSuitEnum, CardValueEnum } from "../types/Card";

type StoreListener = () => void;
type GameState = {
  hands: {
    player1: Card[];
    player2: Card[];
  };
  deck: {
    card: Card;
    /**
     * If a player has this card in their hand, this field will be set to player number.
     * Otherwise, it will be undefined.
     */
    hand?: 1 | 2;
  }[];
};

const makeState = () => ({
  deck: Object.values(CardSuitEnum)
    .map((suit) => {
      return Object.values(CardValueEnum).map((value) => {
        return { card: { suit, value }, hand: undefined };
      });
    })
    .flat(),
  hands: {
    player1: [],
    player2: [],
  },
});

class PokerStore {
  private static instance: PokerStore;
  private listeners = new Set<StoreListener>();
  private store: GameState = makeState();

  subscribe = (listener: StoreListener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
  getSnapshot = (): GameState => this.store;

  private constructor() {}

  public static getInstance(): PokerStore {
    if (!PokerStore.instance) {
      PokerStore.instance = new PokerStore();
    }
    return PokerStore.instance;
  }

  pickCard = (player: 1 | 2, card: Card): void => {
    this.store = produce(this.store, (draft) => {
      const cardIndex = this.store.deck.findIndex(
        (deckCard) =>
          deckCard.card.suit === card.suit &&
          deckCard.card.value === card.value,
      );
      draft.deck[cardIndex].hand = player;
      draft.hands[`player${player}`].push(card);
    });
    this.listeners.forEach((listener) => listener());
  };

  reset = () => (this.store = makeState());
}

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
    expect(pokerStore.getSnapshot().hands.player1).toHaveLength(2);
    expect(pokerStore.getSnapshot().hands.player2).toHaveLength(2);
    pokerStore.reset();
    expect(pokerStore.getSnapshot().hands.player1).toHaveLength(0);
    expect(pokerStore.getSnapshot().hands.player2).toHaveLength(0);
  });
  it("should support useSyncExternalStore", () => {
    const { result } = renderHook(() =>
      useSyncExternalStore(pokerStore.subscribe, pokerStore.getSnapshot),
    );
    expect(result).toBeDefined();
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
    expect(result.current.hands.player1).toEqual([card]);
  });
});
