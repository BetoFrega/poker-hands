import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { CardSuitEnum, CardValueEnum } from "../../core/types/Card";
import { CardButton } from "./CardButton";

const deckCard = {
  card: {
    value: CardValueEnum.Queen,
    suit: CardSuitEnum.Hearts,
  },
};
const meta: Meta<typeof CardButton> = {
  component: CardButton,
  tags: ["autodocs"],

  args: {
    deckCard,
    onClick: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof CardButton>;
export const Unselected: Story = {};
export const Selected: Story = {
  args: {
    deckCard: {
      ...deckCard,
      hand: 1,
    },
  },
};

export const Empty: Story = { args: { deckCard: null } };
