import { useState } from 'react'
import './App.css'
import { CategorySelector, DifficultySelector } from './components/Selectors'
import QuestionCard from './components/QuestionCard'
import he from "he"

function App() {
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0)
  const [questionsReset, setQuestionsReset] = useState(0)
  const [loader, setLoader] = useState(false)

  const createHandleGenerateQuestions = () => {
    if (!category || !difficulty) return

    setLoader(true)
    setScore(0)

    fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`)
      .then((res) => res.json())
      .then((data) => {
        if (data.response_code === 0) {
          const formatted = data.results.map((q) => ({
            question: he.decode(q.question),
            correct: he.decode(q.correct_answer),
            options: shuffle([
              he.decode(q.correct_answer),
              ...q.incorrect_answers.map(ans => he.decode(ans))
            ])
          }));
          setQuestions(formatted);
          setQuestionsReset(prev => prev + 1)
          setLoader(false)
        }
      })
      .catch((err) => console.error(err));
  }

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const createHandleCategory = (value) => {
    setCategory(value)
  }

  const createHandleDifficulty = (value) => {
    setDifficulty(value)
  }

  return (
    <>
      <h1>TRIVIA APP</h1>

      <div>
        {loader && (<p>Cargando preguntas...</p>)}

        {questions.length === 0 ? (
          <div className="col-lg-12 d-flex justify-content-center gap-2 mb-2">
            <CategorySelector onSelect={createHandleCategory} />
            <DifficultySelector onSelect={createHandleDifficulty} />
            <button type="button" className="btn btn-primary" onClick={createHandleGenerateQuestions}>Generar</button>
          </div>
        ) : (
          <h3>Score: {score}</h3>
        )}


        <div className='question-container d-flex flex-column align-items-center'>
          {questions && (
            questions.map((question) => (
              <QuestionCard
                reset={questionsReset}
                correct={question.correct}
                question={question.question}
                options={question.options}
                incrementScore={() => setScore(score + 1)}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default App
