export const shuffleAnswers = (array: Array<string>): Array<string> =>
    [...array].sort(() => Math.random() - 0.5);