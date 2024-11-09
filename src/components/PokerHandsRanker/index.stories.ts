import type { Meta, StoryObj } from "@storybook/react";

import { PokerHandRanker } from "./index";

const meta = {
  title: "Poker Hand Ranker",
  component: PokerHandRanker,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof PokerHandRanker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
