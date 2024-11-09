import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { CardSuitEnum, CardValueEnum } from "../../core/types/Card";
import { CardButton } from "./CardButton";

const meta: Meta<typeof CardButton> = {
  component: CardButton,
  args: {
    card: {
      value: CardValueEnum.Queen,
      suit: CardSuitEnum.Hearts,
    },
    onClick: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof CardButton>;
export const Unselected: Story = {};
export const Selected: Story = {
  args: { isSelected: true },
};
export const Empty: Story = { args: { card: null } };
