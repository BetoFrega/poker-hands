import { DecoratorFunction } from "@storybook/csf";
import { ReactRenderer } from "@storybook/react";
import { PokerStore } from "./PokerStore";
import { PokerStoreProvider } from "./provider";

/**
 * A decorator function that wraps React components with a PokerStoreProvider.
 * This decorator instantiates a new PokerStore and provides it to the
 * Story component, ensuring that each Story has its own PokerStore context,
 * thus isolating interactions for each Story.
 *
 */
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
