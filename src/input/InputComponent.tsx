import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { emitHeroAction } from '../Events/Events'
import { Point, vectorApproximateDirection } from '../math/Point'
import { mapInputToDirection, mapKeyToUserInput } from './UserInput'

const StyledInputComponent = styled.div`
    height: 100%;
    width: 100%;
    &:focus-visible {
        outline: none;
    }
`

export function InputComponent(props: { children: JSX.Element[] }) {
    const [pointerDownCoordinates, setPointerDownCoordinates] = useState<Point>({ x: 0, y: 0 })
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

    const onPointerUp = (point: Point) => {
        const direction = vectorApproximateDirection(
            {
                x: point.x - pointerDownCoordinates.x,
                y: point.y - pointerDownCoordinates.y,
            },
            { minLength: 50, degreesTolerance: 30 }
        )
        if (direction !== undefined) {
            emitHeroAction({ direction: direction })
        }
    }

    return (
        <StyledInputComponent
            ref={appRef}
            tabIndex={0}
            autoFocus
            onPointerDown={(event) => setPointerDownCoordinates({ x: event.screenX, y: event.screenY })}
            onPointerUp={(e) => onPointerUp({ x: e.screenX, y: e.screenY })}
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
            {...props.children}
        </StyledInputComponent>
    )
}
