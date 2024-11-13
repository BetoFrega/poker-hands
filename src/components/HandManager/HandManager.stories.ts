import { Meta, StoryObj } from "@storybook/react";
import { pokerStoreDecorator } from "../PokerHandComparison/PokerStoreDecorator";
import { HandManager } from "./HandManager";

const meta: Meta<typeof HandManager> = {
  component: HandManager,
  decorators: [pokerStoreDecorator()],
  args: {
    player: 1,
  },
  tags: ["autodocs"],
};
export default meta;

export const Default: StoryObj<typeof HandManager> = {};
