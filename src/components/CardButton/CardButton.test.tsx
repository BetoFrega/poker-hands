import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
import { CardSuitEnum, CardValueEnum } from "../../core/types/Card";
import { CardButton } from "./CardButton";

describe("CardButton", () => {
  describe("baseline", () => {
    it("should render unselected", () => {
      const { container } = render(
        <CardButton
          deckCard={{
            card: { suit: CardSuitEnum.Hearts, value: CardValueEnum.Ace },
          }}
          onClick={() => {}}
        />,
      );
      expect(container).toMatchSnapshot();
    });
    it("should render selected", () => {
      const { container } = render(
        <CardButton
          deckCard={{
            card: { suit: CardSuitEnum.Hearts, value: CardValueEnum.Ace },
            hand: 1,
          }}
          onClick={() => {}}
        />,
      );
      expect(container).toMatchSnapshot();
    });
    it("should render empty", () => {
      const { container } = render(
        <CardButton deckCard={null} onClick={() => {}} />,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
