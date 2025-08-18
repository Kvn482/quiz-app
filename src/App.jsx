import './App.css'
import CategorySelector from './components/CategorySelector'
import { useFetch } from './useFetch'

function App() {
  
  // const { data, loading, error } = useFetch('https://opentdb.com/api_category.php')

  return (
    <>
      <h1>TRIVIA APP</h1>
      <CategorySelector />
    </>
  )
}

export default App
