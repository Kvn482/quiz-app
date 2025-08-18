import { useState } from 'react'
import './App.css'
import { CategorySelector, DifficultySelector } from './components/Selectors'
import QuestionCard from './components/QuestionCard'
import he from "he"

function App() {
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [questions, setQuestions] = useState([])

  const [loader, setLoader] = useState(false)

  const createHandleGenerateQuestions = () => {
    setLoader(true)
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
        <div className="d-flex justify-content-center gap-2 mb-2">
          <CategorySelector onSelect={createHandleCategory} />
          <DifficultySelector onSelect={createHandleDifficulty} />
          <button type="button" className="btn btn-primary" onClick={createHandleGenerateQuestions}>Generar</button>
        </div>
        <div className='question-container d-flex flex-column align-items-center'>
          {questions && (
            questions.map((question) => (
              <QuestionCard correct={question.correct} question={question.question} options={question.options} />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default App
