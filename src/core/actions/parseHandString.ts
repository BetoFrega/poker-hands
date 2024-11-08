import {Card, CardSuitEnum, CardValueEnum} from "../types/Card";

/**
 * Parses a string in the format `Ah,2h,3h,4c,Qs` and returns an array of `Card`s
 */
export const parseHandString = (handString: string): Card[] => {
    return handString.split(',').map(cardString => {
        return {
            value: cardString[0] as CardValueEnum,
            suit: cardString[1] as CardSuitEnum
        }
    })
}
