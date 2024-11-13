import { Meta, StoryObj } from "@storybook/react";
import { PokerHandComparison } from "./PokerHandComparison";
import { pokerStoreDecorator } from "./PokerStoreDecorator";

const meta: Meta<typeof PokerHandComparison> = {
  component: PokerHandComparison,
  decorators: [pokerStoreDecorator()],
  tags: ["autodocs"],
};
export default meta;

export const Index: StoryObj<typeof PokerHandComparison> = {};
