import { useEffect, useRef } from 'react'

type TimerCallback = (...params: any[]) => any

export function useInterval(callback: TimerCallback, delay?: number) {
    const savedCallback = useRef<TimerCallback>()

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        function tick() {
            if (savedCallback && savedCallback.current) {
                savedCallback.current()
            }
        }
        if (delay !== undefined) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}
