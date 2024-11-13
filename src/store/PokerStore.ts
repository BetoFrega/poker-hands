import { produce } from "immer";
import { Winner } from "../components/PokerHandComparison/WinnerDisplay";
import { getWinner } from "../core/actions/getWinner";
import { HandRank, rankHand } from "../core/actions/rankHand";
import { Card, CardSuitEnum, CardValueEnum } from "../core/types/Card";

type StoreListener = () => void;
export type DeckCard = {
  card: Card;
  /**
   * If a player has this card in their hand, this field will be set to player number.
   * Otherwise, it will be undefined.
   */
  hand?: 1 | 2;
};
type PlayerHand = { cards: Card[]; handRank: HandRank | null };
type GameState = {
  hands: {
    player1: PlayerHand;
    player2: PlayerHand;
  };
  deck: DeckCard[];
  winner: Winner | null;
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
    player1: { cards: [], handRank: null },
    player2: { cards: [], handRank: null },
  },
  winner: null,
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

  constructor() {}

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
    if (this.store.hands[`player${player}`].cards.length >= 5) return;
    if (this.store.deck.find(getCardPredicate(card))?.hand) return;
    this.store = produce(this.store, (draft) => {
      const cardIndex = this.store.deck.findIndex(
        (deckCard) =>
          deckCard.card.suit === card.suit &&
          deckCard.card.value === card.value,
      );
      draft.deck[cardIndex].hand = player;
      const hand = draft.hands[`player${player}`];
      hand.cards.push(card);
      hand.handRank = rankHand(hand.cards);
      draft.winner = getWinner(
        draft.hands.player1.handRank,
        draft.hands.player2.handRank,
      );
    });
    this.listeners.forEach((listener) => listener());
  };

  reset = () => {
    this.listeners.forEach((listener) => {
      this.listeners.delete(listener);
    });
    this.store = makeInitialState();
  };

  returnCard = (player: 1 | 2, card: Card) => {
    const cardIndex = this.store.deck.findIndex(getCardPredicate(card));
    if (this.store.deck[cardIndex].hand !== player) return;
    this.store = produce(this.store, (draft) => {
      draft.deck[cardIndex].hand = undefined;
      const hand: PlayerHand = draft.hands[`player${player}`];
      hand.cards = hand.cards.filter(
        (handCard) =>
          !(handCard.suit === card.suit && handCard.value === card.value),
      );
      hand.handRank = null;
    });
    this.listeners.forEach((listener) => listener());
  };
}