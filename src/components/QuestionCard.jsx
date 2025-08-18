import { useState } from "react"

function QuestionCard({ correct, options, question }) {
    const [answer, setAnswer] = useState(correct)

    return (
        <div className="col-lg-10 card mb-3">
            <h5 className="card-title">{question}</h5>
            <p>{correct}</p>
            <div className="card-body">
                <ul>
                    {options.map((o, index) => (
                        <li key={index}>{o}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default QuestionCard