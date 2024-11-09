import { Meta } from "@storybook/react";
import { CardSuitEnum } from "../../../core/types/Card";
import { SuitRow } from "./SuitRow";

const meta: Meta<typeof SuitRow> = {
  component: SuitRow,
  args: {
    suit: CardSuitEnum.Diamonds,
  },
};
export default meta;

export const Default = {};
