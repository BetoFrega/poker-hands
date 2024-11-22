import { describe, expect, it } from "vitest";
import { CardSuitEnum, CardValueEnum } from "../types/Card";
import { cardInArray, removeCardFromArray } from "./cardArray";
import { parseHandString } from "./parseHandString";

describe("Card Array Helpers", () => {
  describe("cardInArray", () => {
    const array = parseHandString("Th,Jh,9c");
    it("should return true if card in array", () => {
      expect(
        cardInArray(array, {
          value: CardValueEnum.Ten,
          suit: CardSuitEnum.Hearts,
        }),
      ).toBe(true);
    });
    it("should return false if card not in array", () => {
      expect(
        cardInArray(array, {
          value: CardValueEnum.Two,
          suit: CardSuitEnum.Hearts,
        }),
      ).toBe(false);
    });
  });
  describe("removeCardFromArray", () => {
    const array = parseHandString("Th,Jh,9c");
    it("should remove card from array", () => {
      const result = removeCardFromArray(array, {
        value: CardValueEnum.Ten,
        suit: CardSuitEnum.Hearts,
      });
      expect(result).toEqual([
        {
          value: CardValueEnum.Jack,
          suit: CardSuitEnum.Hearts,
        },
        {
          value: CardValueEnum.Nine,
          suit: CardSuitEnum.Clubs,
        },
      ]);
    });
    it("should not remove anything if card not in array", () => {
      const result = removeCardFromArray(array, {
        value: CardValueEnum.Two,
        suit: CardSuitEnum.Hearts,
      });
      expect(result).toEqual(array);
    });
  });
});
