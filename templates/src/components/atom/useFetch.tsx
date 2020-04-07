
import { useState, useEffect } from "react"

interface State<T> {
    data: T | null
    loading: boolean
    error: any
}

const initState: State<any> = {
    data: null,
    loading: true,
    error: null,
}

type Fetcher = (...args: any) => Promise<any>

export default function useFetch<T>(fetcher: Fetcher, args?: any, dependency: Array<any> = []) {
    const [state, setState] = useState<State<T>>(initState)

    useEffect(() => {
        fetcher(args)
            .then(data => {
                setState({
                    loading: false,
                    data,
                    error: null,
                })
            })
            .catch(error => {
                setState({
                    loading: false,
                    data: null,
                    error,
                })
            })
    }, [fetcher, args, ...dependency])

    return state as State<T>
}