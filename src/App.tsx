import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { Difficulty, getQuizQuestions, QuestionState } from './services/quizApiService';

export type Answer = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Array<QuestionState>>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Array<Answer>>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startQuiz = async () => { 
    setLoading(true);
    setGameOver(false);

    const questions = await getQuizQuestions(TOTAL_QUESTIONS, Difficulty.Easy);

    setQuestions(questions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if(!gameOver) {
      const answer = e.currentTarget.value;
      const correctAnswer = questions[number].correct_answer === answer;
      if(correctAnswer) setScore(prev => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct: correctAnswer,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  };

  const nextQuestion = (): void => {
    const nextQuestion = number + 1;
    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    }else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div className="App">
      <h1>REACT TRIVIA</h1>
      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
        <button type="button" className="start" onClick={startQuiz}>
          Start
        </button>
      )}
      {!gameOver && <p className="score">Score: {score}</p>}
      {loading && <p>Loading questions...</p>}
      { !loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number]?.question}
          answers={questions[number]?.answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver 
        && !loading 
        && userAnswers.length === number + 1 
        && number !== TOTAL_QUESTIONS - 1 
        && (
        <button className="next" onClick={nextQuestion} type="button">
          Next
        </button>
      )}
    </div>
  );
};

export default App;
