
/**
 * Вовзращает форму слова для числительного
 * @example getWordForm(44, 'позиция', 'позиции', 'позиций')
 * 1 позиция 3 позиции 5 позиций
 * @param {number} num - число
 * @param {string} nominative - форма именительного падежа (Кто? Что?)
 * @param {string} genitive - форма родительного падежа (Кого? Чего?)
 * @param {string} plural - форма множественного числа
 * @returns {string} - одна из форм
 */
export function getWordForm(num: number, nominative: string, genitive: string, plural: string) {
    const mod100 = num % 100;
    if (mod100 >= 11 && mod100 <= 19) {
        return plural;
    }
    const mod10 = mod100 % 10;
    if (mod10 === 1) {
        return nominative;
    }
    if (mod10 === 2 || mod10 === 3 || mod10 === 4) {
        return genitive;
    }
    return plural;
}
