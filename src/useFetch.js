
import { useEffect, useState } from "react"

export function useFetch(url) {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [controller, setController] = useState(null)

    useEffect(() => {
        const abortController = new AbortController()
        setController(abortController)
        setLoading(true)
        setError(null)

        fetch(url, { signal: abortController.signal })
            .then((response) => {
                
                if (!response.ok) {
                    throw new Error("Quien es ese pokemon?!")
                }
                return response.json()
            })
            .then((data) => setData(data))
            .catch((error) => {
                if (error.name === 'AbortError') {
                    console.log("Request cancelled")
                } else {
                    setError(error.message)
                    setData(null)
                }
            })
            .finally(() => setLoading(false))

        return () => abortController.abort()
    }, [url])

    const handleCancelRequest = () => {
        if (controller) {
            controller.abort()
            setError("Request cancelled")
        }
    }

    return { data, loading, error, handleCancelRequest }
}