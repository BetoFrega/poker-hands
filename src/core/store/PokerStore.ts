import { produce } from "immer";
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

export class PokerStore {
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
