import {describe, expect, it} from "@jest/globals";
import {isFlush} from "./isFlush";
import {parseHandString} from "./parseHandString";

describe('isFlush', () => {
    it('should return true when all cards are the same suit', () => {
        const cards = parseHandString('2h,4h,6h,9h,Qh');
        expect(isFlush(cards)).toBe(true);
    });
    it('should return false when some cards are not the same suit', () => {
        const cards = parseHandString('2h,4h,6h,9h,Qs');
        expect(isFlush(cards)).toBe(false);
    });
});
