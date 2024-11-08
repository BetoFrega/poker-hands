import {describe, expect, it} from "@jest/globals";
import {CardValueEnum} from "../types/Card";
import {countByValue} from "./countByValue";
import {parseHandString} from "./parseHandString";

describe(countByValue, () => {
    it('should return a Map of the count of values', () => {
        const cards = parseHandString('3h,3c,3d,Qh,Qs')
        const result = countByValue(cards)
        expect(result.get(CardValueEnum.Three)).toEqual(3)
        expect(result.get(CardValueEnum.Queen)).toEqual(2)
    });
});
