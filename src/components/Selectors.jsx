import { useEffect, useState } from "react"

function CategorySelector({ onSelect }) {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
            .then(res => res.json())
            .then(data => setCategories(data.trivia_categories));
    }, []);

    return (
        <div className="col-lg-5">
            <select className="form-select" onChange={(e) => onSelect(e.target.value)}>
                <option value="">Seleccione una categoria</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>
        </div>
    )

}

function DifficultySelector({ onSelect }) {
    return (
        <div className="col-lg-3">
            <select className="form-select" onChange={(e) => onSelect(e.target.value)}>
                <option value="">Elige dificultad</option>
                <option value="easy">Fácil</option>
                <option value="medium">Media</option>
                <option value="hard">Difícil</option>
            </select>
        </div>
    );
}

export { CategorySelector, DifficultySelector }
