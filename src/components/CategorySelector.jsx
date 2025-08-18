import { useEffect, useState } from "react"

function CategorySelector() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
            .then(res => res.json())
            .then(data => setCategories(data.trivia_categories));
    }, []);

    console.log(categories)

    return (
        <select>
            <option value="">Seleccione una categoria</option>
            {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
        </select>
    )

}

export default CategorySelector
