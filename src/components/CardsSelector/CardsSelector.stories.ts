import { Meta, StoryObj } from "@storybook/react";
import { CardsSelector } from "./CardsSelector";

const meta: Meta<typeof CardsSelector> = {
  component: CardsSelector,
  args: {
    player: 1,
  },
};
export default meta;

export const Default: StoryObj<typeof CardsSelector> = {};
