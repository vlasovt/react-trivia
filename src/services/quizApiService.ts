/* eslint-disable camelcase */
import { shuffleAnswers } from './helpService';

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: Array<string>;
    question: string;
    type: string;
}
export type QuestionState = Question & { answers: Array<string>};

export enum Difficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard'
}

export const getQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<Array<QuestionState>> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleAnswers([
      ...question.incorrect_answers,
      question.correct_answer]),
  }));
};
