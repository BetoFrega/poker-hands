import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { CardSuitEnum, CardValueEnum } from "../../../core/types/Card";
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

export const Unselected: StoryObj<typeof CardButton> = {};
export const Selected: StoryObj<typeof CardButton> = {
  args: { isSelected: true },
};
