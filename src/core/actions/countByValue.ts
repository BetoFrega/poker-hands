import {Card, CardValueEnum} from "../types/Card";

/**
 *
 */
export const countByValue = (cards: Card[]): Map<CardValueEnum, number> => {
    const result = new Map<CardValueEnum, number>()
    cards.forEach(card => {
        const count = result.get(card.value) ?? 0
        result.set(card.value, count + 1)
    })
    return result
}
