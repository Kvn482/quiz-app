import { useState, useEffect } from "react"

function QuestionCard({ reset, correct, options, question, incrementScore, onAnswered }) {
    const [selectedOption, setSelectedOption] = useState(null)
    const [showAnswer, setShowAnswer] = useState(false)

    useEffect(() => {
        setSelectedOption(null);
        setShowAnswer(false);
    }, [reset]);

    const handleClick = (option) => {
        setSelectedOption(option)
        setShowAnswer(true)
        onAnswered()

        if (option === correct) {
            incrementScore()
        }
    }

    return (
        <div className="col-lg-10 card mb-3 p-3">
            <h5 className="card-title">{question}</h5>
            <div className="card-body d-flex flex-column gap-2">
                {options.map((o, index) => {
                    let className = "btn btn-outline-primary"
                    if (showAnswer) {
                        if (o === correct) className = "btn btn-success"
                        else if (o === selectedOption && o !== correct) className = "btn btn-danger"
                    }

                    return (
                        <button
                            key={index}
                            className={className}
                            onClick={() => handleClick(o)}
                            disabled={showAnswer}
                        >
                            {o}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default QuestionCard
