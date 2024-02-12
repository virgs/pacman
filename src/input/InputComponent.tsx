import { useEffect, useRef } from 'react'
import { emitHeroAction } from '../Events/Events'
import { mapInputToDirection, mapKeyToUserInput } from './UserInput'
import './InputComponent.css'

export function InputComponent(props: { children: JSX.Element }) {
    const appRef = useRef(null)
    useEffect(() => {
        //@ts-ignore
        appRef.current?.focus()
    })

    const handleKeyPressed = (keyCode: string) => {
        let input = mapKeyToUserInput(keyCode)
        if (input !== undefined) {
            emitHeroAction
            const direction = mapInputToDirection(input)
            if (direction !== undefined) {
                emitHeroAction({ direction: direction })
            }
        }
        return input
    }

    return (
        <div
            id="input-component"
            ref={appRef}
            tabIndex={0}
            onKeyDown={(event) => {
                if (!event.metaKey && !event.shiftKey && !event.ctrlKey) {
                    if (mapKeyToUserInput(event.code)) {
                        event.preventDefault()
                    }
                }
            }}
            onKeyUp={(event) => {
                event.preventDefault()
                handleKeyPressed(event.code)
            }}
        >
            {props.children}
        </div>
    )
}
