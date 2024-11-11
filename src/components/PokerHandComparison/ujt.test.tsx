import { describe, it } from "@jest/globals";
import { screen } from "@testing-library/dom";
import { fireEvent, render, within } from "@testing-library/react";
import { PokerHandComparison } from "./PokerHandComparison";
import "@testing-library/jest-dom";

function getCardSelector(player: 1 | 2) {
  return screen.getByLabelText(`P${player} Card Selector`);
}

const getCardClickerForPlayer = (player: 1 | 2) => {
  return (cardName: string) => {
    fireEvent.click(within(getCardSelector(player)).getByLabelText(cardName));
  };
};

describe("User Journey Tests", () => {
  it("should perform the entire user journey", () => {
    render(<PokerHandComparison />);

    const player1CardClicker = getCardClickerForPlayer(1);
    player1CardClicker(`Ace of Spades`);
    // const p2CardSelector = screen.getByLabelText("P2 Card Selector");
  });
});
