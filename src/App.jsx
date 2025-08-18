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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [finished, setFinished] = useState(false)

  const createHandleGenerateQuestions = () => {
    if (!category || !difficulty) return

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
          setQuestionsReset(prev => prev + 1)
          setLoader(false)
          setScore(0)
          setCurrentIndex(0)
          setAnswered(false)
          setFinished(false)
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

  const createHandleCancel = () => {
    setQuestions([])
  }

  const createHandleReset = () => {
    setQuestions([])
    setFinished(false)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setQuestionsReset(prev => prev + 1)
      setCurrentIndex(currentIndex + 1)
      setAnswered(false)
    } else {
      setFinished(true)
    }
  }

  return (
    <>
      <h1>TRIVIA APP</h1>

      <div>
        {loader && (<p>Cargando preguntas...</p>)}

        {questions.length === 0 && !finished && (
          <div className="col-lg-12 d-flex justify-content-center gap-2 mb-2">
            <CategorySelector onSelect={createHandleCategory} />
            <DifficultySelector onSelect={createHandleDifficulty} />
            <button type="button" className="btn btn-primary" onClick={createHandleGenerateQuestions}>Generar</button>
          </div>
        )}

        <div className='question-container d-flex flex-column align-items-center'>
          {!finished && questions.length > 0 && (
            <>
              <div className='d-flex justify-content-center align-items-center gap-2 mb-2'>
                <h3>Score: {score}</h3>
                <button className='btn btn-sm btn-outline-danger' onClick={createHandleCancel}>Cancelar</button>
              </div>

              <QuestionCard
                reset={questionsReset}
                correct={questions[currentIndex].correct}
                question={questions[currentIndex].question}
                options={questions[currentIndex].options}
                incrementScore={() => setScore(score + 1)}
                onAnswered={() => setAnswered(true)}
              />

              {answered && (
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleNext}
                  disabled={currentIndex >= questions.length} // evita avanzar si ya se acabaron
                >
                  {currentIndex < questions.length - 1 ? "Siguiente" : "Finalizar"}
                </button>
              )}
            </>
          )}
        </div>

        {finished && (
          <div className='mt-5'>
            <h3>Juego Terminado</h3>
            <p>{`Tu puntaje es: ${score}/${questions.length}`}</p>
            <button className='btn btn-sm btn-primary' onClick={createHandleReset}>Volver a jugar</button>
          </div>
        )}
      </div>
    </>
  )
}

export default App
