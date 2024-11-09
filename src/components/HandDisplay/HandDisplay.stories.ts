import { Meta, StoryObj } from "@storybook/react";
import { parseHandString } from "../../core/actions/parseHandString";
import { HandDisplay } from "./HandDisplay";

const meta: Meta<typeof HandDisplay> = {
  component: HandDisplay,
};
export default meta;

export const FullHand: StoryObj<typeof HandDisplay> = {
  args: {
    cards: parseHandString("Ah,2h,3h,4h,5h"),
  },
};

export const EmptyHand: StoryObj<typeof HandDisplay> = {
  args: {
    cards: [],
  },
};

export const PartialHand: StoryObj<typeof HandDisplay> = {
  args: {
    cards: parseHandString("Ah,2h,3h"),
  },
};
