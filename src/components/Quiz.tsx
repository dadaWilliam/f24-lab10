import React, { useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';

// Initialize the QuizCore instance outside of the component to avoid re-creating it on re-renders
const quizCore = new QuizCore();

// Hint: Take advantage of the QuizQuestion interface
interface QuizState {
  // questions: QuizQuestion[]
  // currentQuestionIndex: number
  selectedAnswer: string | null
  // score: number
}

const Quiz: React.FC = () => {
  // TODO: Task1 - Seprate the logic of quiz from the UI.
  // Hint: Take advantage of QuizCore to manage quiz state separately from the UI.
  // const initialQuestions: QuizQuestion[] = [
  //   {
  //     question: 'What is the capital of France?',
  //     options: ['London', 'Berlin', 'Paris', 'Madrid'],
  //     correctAnswer: 'Paris',
  //   },
  // ];
  const [state, setState] = useState<QuizState>({
    // questions: initialQuestions,  // Initialize the questions.
    // currentQuestionIndex: 0,  // Initialize the current question index.
    selectedAnswer: null,  // Initialize the selected answer.
    // score: 0,  // Initialize the score.
  });

  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  }


  const handleButtonClick = (): void => {
    // TODO: Task3 - Implement the logic for button click ("Next Question" and "Submit").
    // Hint: You might want to check for a function in the core logic to help with this.

    if (state.selectedAnswer !== null) {
      quizCore.answerQuestion(state.selectedAnswer);
    }

    quizCore.nextQuestion();
    setState((prevState) => ({ ...prevState, selectedAnswer: null }));

  } 

  // const { questions, currentQuestionIndex, selectedAnswer, score } = state;
  const { selectedAnswer } = state;
  const currentQuestion = quizCore.getCurrentQuestion();

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>Next Question</button>
    </div>
  );
};

export default Quiz;