import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { TestPokerStoreProvider } from "../../store/testWrapper";
import { PokerHandComparison } from "./PokerHandComparison";
import "@/test-helpers/testing-library-vitest";

const getCardSelector = (player: 1 | 2) =>
  screen.getByLabelText(`P${player} Card Selector`);

const getPlayerInteractions = (player: 1 | 2) => ({
  click: (cardName: string) => {
    fireEvent.click(within(getCardSelector(player)).getByLabelText(cardName));
  },
});

const getPlayerSection = (player: 1 | 2) =>
  screen.getByLabelText(`Player ${player} section`);

const getSelectedHand = (player: 1 | 2) =>
  within(getPlayerSection(player)).getByLabelText("Selected hand");

const selectCards = (player: 1 | 2, cardNames: string[]): void => {
  const playerInteractions = getPlayerInteractions(player);
  cardNames.forEach((cardName) => playerInteractions.click(cardName));
};

function getHandRank(player: 1 | 2) {
  return within(getPlayerSection(player)).queryByLabelText("Hand rank");
}

const playHandAndCheckRank = (
  player: 1 | 2,
  cardNames: string[],
  expectedRank: string,
): void => {
  selectCards(player, cardNames);
  const selectedHand = getSelectedHand(player);
  cardNames.forEach((cardName) =>
    expect(within(selectedHand).getByLabelText(cardName)).toBeInTheDocument(),
  );
  expect(getHandRank(player)).toHaveTextContent(expectedRank);
};

describe("User Journey Tests", () => {
  it("should perform the user journey happy path", () => {
    render(<PokerHandComparison />, { wrapper: TestPokerStoreProvider });
    playHandAndCheckRank(
      1,
      [
        "Ace of Spades",
        "Two of Spades",
        "Three of Spades",
        "Four of Spades",
        "Five of Spades",
      ],
      "Straight flush",
    );
    playHandAndCheckRank(
      2,
      [
        "Ace of Clubs",
        "Ace of Hearts",
        "Ace of Diamonds",
        "Four of Hearts",
        "Four of Diamonds",
      ],
      "Full house",
    );
    expect(screen.getByLabelText("Hand comparison result")).toHaveTextContent(
      "Player 1 wins!",
    );
  });
  it("should not allow one player to pick the same cards as the other", () => {
    render(<PokerHandComparison />, { wrapper: TestPokerStoreProvider });
    const cardNames: string[] = [
      "Ace of Spades",
      "Two of Spades",
      "Three of Spades",
      "Four of Spades",
      "Five of Spades",
    ];
    playHandAndCheckRank(1, cardNames, "Straight flush");
    selectCards(2, cardNames);
    const player2_selectedHand = getSelectedHand(2);
    cardNames.forEach((cardName) =>
      expect(
        within(player2_selectedHand).queryByLabelText(cardName),
      ).not.toBeInTheDocument(),
    );
    expect(getHandRank(2)).not.toBeInTheDocument();
  });
  it("should allow a player to return cards by clicking the hand display cards", () => {
    render(<PokerHandComparison />, { wrapper: TestPokerStoreProvider });
    const cardNames: string[] = [
      "Ace of Spades",
      "Two of Spades",
      "Three of Spades",
      "Four of Spades",
      "Five of Spades",
    ];
    playHandAndCheckRank(1, cardNames, "Straight flush");
    const player1_selectedHand = getSelectedHand(1);

    const getAceInHand = () =>
      within(player1_selectedHand).queryByLabelText("Ace of Spades");

    expect(getAceInHand()).toBeInTheDocument();
    const aceInHand = getAceInHand();
    fireEvent.click(aceInHand!);
    expect(getAceInHand()).not.toBeInTheDocument();
    expect(getHandRank(1)).not.toBeInTheDocument();
  });
});
