import { DecoratorFunction } from "@storybook/csf";
import { ReactRenderer } from "@storybook/react";
import { PokerStore } from "../../store/PokerStore";
import { PokerStoreProvider } from "../../store/provider";

export const pokerStoreDecorator: () => DecoratorFunction<ReactRenderer> =
  () => {
    const pokerStore = new PokerStore();
    // eslint-disable-next-line react/display-name
    return (Story) => {
      return (
        <PokerStoreProvider value={pokerStore}>{Story()}</PokerStoreProvider>
      );
    };
  };
