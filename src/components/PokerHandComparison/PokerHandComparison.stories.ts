import { Meta, StoryObj } from "@storybook/react";
import { pokerStoreDecorator } from "../../store/pokerStoreDecorator";
import { PokerHandComparison } from "./PokerHandComparison";

const meta: Meta<typeof PokerHandComparison> = {
  component: PokerHandComparison,
  decorators: [pokerStoreDecorator()],
  tags: ["autodocs"],
};
export default meta;

export const Index: StoryObj<typeof PokerHandComparison> = {};
