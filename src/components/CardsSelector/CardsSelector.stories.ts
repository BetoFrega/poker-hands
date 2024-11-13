import { Meta, StoryObj } from "@storybook/react";
import { pokerStoreDecorator } from "../../store/PokerStoreDecorator";
import { CardsSelector } from "./CardsSelector";

const meta: Meta<typeof CardsSelector> = {
  component: CardsSelector,
  tags: ["autodocs"],
  decorators: [pokerStoreDecorator()],
  args: {
    player: 1,
  },
};
export default meta;

export const Default: StoryObj<typeof CardsSelector> = {};
