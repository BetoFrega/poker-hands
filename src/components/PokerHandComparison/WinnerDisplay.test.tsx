import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Winner } from "../../core/types/Winner";
import { WinnerDisplay } from "./WinnerDisplay";

describe("Winner display", () => {
  it("should not display when no winner is decided yet", () => {
    render(<WinnerDisplay winner={null} />);
    expect(
      screen.queryByLabelText("Hand comparison result"),
    ).not.toBeInTheDocument();
  });
  it("should display a tie", () => {
    render(<WinnerDisplay winner={Winner.TIE} />);
    expect(screen.queryByLabelText("Hand comparison result")).toHaveTextContent(
      "It's a tie!",
    );
  });
  it("should display player 1 as the winner", () => {
    render(<WinnerDisplay winner={Winner.Player1} />);
    expect(screen.queryByLabelText("Hand comparison result")).toHaveTextContent(
      "Player 1 wins!",
    );
  });
  it("should display player 2 as the winner", () => {
    render(<WinnerDisplay winner={Winner.Player2} />);
    expect(screen.queryByLabelText("Hand comparison result")).toHaveTextContent(
      "Player 2 wins!",
    );
  });
});
