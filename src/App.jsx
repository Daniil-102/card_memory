import { useEffect, useState } from 'react';
import './App.scss';

const blocks = [
  {
    id: 1,
    title: 'Which HTML tag is used to define an internal style sheet?',
    variants: ['<html>', '<script>', '<style>', '<input>'],
    correct: 3
  },
  {
    id: 2,
    title: 'Which HTML tag is used to define an internal style sheet?',
    variants: ['<textarea>', '<input type="textarea">', '<input type="texbox">', '<input>'],
    correct: 1
  },
  {
    id: 3,
    title: 'Inside which HTML element do we put the JavaScript?',
    variants: ['<js>', '<script>', '<javascript>', '<scripting>'],
    correct: 2
  },
  {
    id: 4,
    title: 'How do you call a function named "myFunction"?',
    variants: ['call to function', 'myFunction()', 'call myFunction()'],
    correct: 2
  },
  {
    id: 5,
    title: 'What is the correct HTML element for inserting a line break?',
    variants: ['br', 'break', 'stopPropagation', 'push'],
    correct: 1
  },
]


function App() {

  const [step, setStep] = useState(0)
  const [res, setRes] = useState(0)
  const question = step > 0 ? blocks[step - 1] : null;
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const calculatedPercent = Math.round(((step - 1) / (blocks.length)) * 100);
    setPercent(calculatedPercent > 0 ? calculatedPercent : 0);
  }, [step])


  const result = (id) => {
    setRes((prevRes) => (id === question.correct ? prevRes + 1 : prevRes));
    setStep((prev) => prev + 1)
  }
  const restart = () => {
    setRes(0);
    setStep(0)
  }

  return (
    <div className="App">
      <div className={step === 0 ? "quiz" : 'quiz question'}>
        <div className="progress">
          <div style={{
            width: `${percent}%`,
            borderRadius: percent === 100 ? '0' : '0 10px 10px 0', // If percent is 100, set borderRadius to '0', otherwise '4px'
          }} className="progress_bar"></div>
        </div>
        {step === 0 ?
          <>
            <div className="sircle"></div>
            <div className="quiz__content">
              <h1>QUIZ about programming</h1>
              <button onClick={() => setStep((prev) => prev + 1)} className='quiz__start'>Start</button>
            </div>
          </>
          : step <= blocks.length ?
            <>
              <div className="q_sircle">
                <div className="q_sircle-item">
                  <div className="q_sircle-name">QUIZ about programming</div>
                </div>

              </div>
              <div className="question__wrapper">
                <h2 className="question__title">{question.title}</h2>
                <div className="question__grid">
                  {question.variants.map((question, index) => (
                    <div key={index} onClick={() => result(index + 1)} className="question__grid-item">{question}</div>
                  ))}


                </div>
              </div>

            </>
            :
            <>
              <div className="end__sircle"></div>
              <div className="end__content">
                <h2 className='end__title'>QUIZ about programming</h2>
                <p className="correct__unswers">{res} correct answers out of {blocks.length}</p>
                <div className="end__button">
                  <button onClick={restart} className="try__again">Try again</button>
                </div>

              </div>

            </>


        }
      </div>
    </div >
  );
}

export default App;
