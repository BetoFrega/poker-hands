import {Card, CardSuitEnum, CardValueEnum} from "../types/Card";

/**
 * Parses a string in the format `Ah,2h,3h,4c,Qs` and returns an array of `Card`s
 */
export const parseHandString = (handString: string): Card[] => {
    return handString.split(',').map(cardString => {
        // TODO: validate input

        const value: CardValueEnum = cardString[0] as CardValueEnum;
        const suit: CardSuitEnum = cardString[1] as CardSuitEnum;

        return {
            value,
            suit
        }
    })
}
