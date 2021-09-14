import React, { MouseEventHandler } from 'react';
import { Answer } from '../App';

type Props = {
    question: string,
    answers: Array<string>,
    callback: MouseEventHandler<HTMLButtonElement>,
    userAnswer: Answer | undefined,
    questionNumber: number,
    totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({
  question, answers, callback, userAnswer, questionNumber, totalQuestions,
}: Props) => (
  <>
    <div className="question-number">
      Question:
      { questionNumber }
      /
      { totalQuestions }
      <p dangerouslySetInnerHTML={{ __html: question }} />
    </div>
    <div>
      {
        answers.map((answer, idx) => (
          <button key={idx} type="button" value={answer} disabled={!!userAnswer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        ))
      }
    </div>
  </>
);

export default QuestionCard;
