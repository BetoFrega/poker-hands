import { beforeEach, describe, expect, it } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { produce } from "immer";
import { useSyncExternalStore } from "react";
import { Card, CardSuitEnum, CardValueEnum } from "../types/Card";

type StoreListener = () => void;
type DeckCard = {
  card: Card;
  /**
   * If a player has this card in their hand, this field will be set to player number.
   * Otherwise, it will be undefined.
   */
  hand?: 1 | 2;
};
type GameState = {
  hands: {
    player1: Card[];
    player2: Card[];
  };
  deck: DeckCard[];
};

const makeInitialState = (): GameState => ({
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

/**
 * Returns a predicate function that can be used to find a card in the deck.
 */
const getCardPredicate =
  (card: Card): ((deckCard: DeckCard) => boolean) =>
  (deckCard) =>
    deckCard.card.suit === card.suit && deckCard.card.value === card.value;

class PokerStore {
  private static instance: PokerStore;
  private listeners = new Set<StoreListener>();
  private store: GameState = makeInitialState();

  private constructor() {}

  public static getInstance(): PokerStore {
    if (!PokerStore.instance) {
      PokerStore.instance = new PokerStore();
    }
    return PokerStore.instance;
  }

  getListenerCount = () => this.listeners.size;

  subscribe = (listener: StoreListener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): GameState => this.store;

  pickCard = (player: 1 | 2, card: Card): void => {
    if (this.store.hands[`player${player}`].length >= 5) return;
    if (this.store.deck.find(getCardPredicate(card))?.hand) return;
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

  reset = () => (this.store = makeInitialState());

  returnCard = (player: 1 | 2, card: Card) => {
    const cardIndex = this.store.deck.findIndex(getCardPredicate(card));
    if (this.store.deck[cardIndex].hand !== player) return;
    this.store = produce(this.store, (draft) => {
      draft.deck[cardIndex].hand = undefined;
      draft.hands[`player${player}`] = draft.hands[`player${player}`].filter(
        (handCard) =>
          !(handCard.suit === card.suit && handCard.value === card.value),
      );
    });
    this.listeners.forEach((listener) => listener());
  };
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
    expect(result.current.hands.player1).toEqual([card]);
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
    expect(result.current.hands.player1).toHaveLength(5);
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
    expect(result.current.hands.player1).toHaveLength(1);
    // but player 2's hand still has no cards, because the card they tried to pick is not available
    expect(result.current.hands.player2).toHaveLength(0);
    // player 1 then tries to pick the same card again
    act(() => {
      pokerStore.pickCard(1, card);
    });
    // but their hand still only holds 1 card
    expect(result.current.hands.player1).toHaveLength(1);
  });
  it("should allow a player to return a card", () => {
    const { result } = renderHook(() =>
      useSyncExternalStore(pokerStore.subscribe, pokerStore.getSnapshot),
    );
    const card = result.current.deck[0].card;
    act(() => {
      pokerStore.pickCard(1, card);
    });
    expect(result.current.hands.player1).toHaveLength(1);
    act(() => {
      pokerStore.returnCard(1, card);
    });
    expect(result.current.hands.player1).toHaveLength(0);
  });
  it("should not allow a different player to return a card", () => {
    const { result } = renderHook(() =>
      useSyncExternalStore(pokerStore.subscribe, pokerStore.getSnapshot),
    );
    act(() => {
      pokerStore.pickCard(1, result.current.deck[0].card);
    });
    expect(result.current.hands.player1).toHaveLength(1);
    expect(result.current.deck[0].hand).toBe(1);
    act(() => {
      pokerStore.returnCard(2, result.current.deck[0].card);
    });
    expect(result.current.hands.player1).toHaveLength(1);
    expect(result.current.deck[0].hand).toBe(1);
  });
});
