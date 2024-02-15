import { useState } from "react"
import { HeroActionEventType, useHeroActionListener } from "../Events/Events"
import { GameConfig } from "../config"
import { Direction } from "../direction/Direction"
import { useInterval } from "../hooks/UseInterval"
import { Origin, Point } from "../math/Point"
import "./PacmanComponent.scss"

export type PacmanComponentProps = {
    initialPosition: Point
}

export const PacmanComponent = (props: PacmanComponentProps): JSX.Element => {
    const [direction, setDirection] = useState<Direction>(Direction.RIGHT)
    const [position, setPosition] = useState<Point>(Origin)
    const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({
        left: props.initialPosition.x + 'px',
        top: props.initialPosition.y + 'px'
    })
    const [bodyStyle, setBodyStyle] = useState<React.CSSProperties>({})
    const gameUpdateCycle = GameConfig.gameUpdateCycle()
    const pacmanPixelsPerCycle = GameConfig.pacmanPixelsPerCycle()

    useHeroActionListener((payload: HeroActionEventType) => setDirection(payload.direction))

    useInterval(() => {
        const newPosition = {
            x: position.x,
            y: position.y
        }
        let bodyTransform = ''
        switch (direction) {
            case Direction.UP:
                newPosition.y -= pacmanPixelsPerCycle;
                bodyTransform = 'rotate(-90deg)';
                break
            case Direction.DOWN:
                newPosition.y += pacmanPixelsPerCycle;
                bodyTransform = 'rotate(90deg)';
                break
            case Direction.LEFT:
                newPosition.x -= pacmanPixelsPerCycle;
                bodyTransform = 'scaleX(-1)';
                break
            case Direction.RIGHT:
                newPosition.x += pacmanPixelsPerCycle;
                break
        }
        // setBodyStyle({
        //     transform: bodyTransform
        // })
        // //emit new tile position
        // setPosition(newPosition)
        // setContainerStyle({
        //     ...containerStyle,
        //     transform: `translate(${newPosition.x}px, ${newPosition.y}px)`
        // })
    }, gameUpdateCycle)
    return <div className='pacman-container' style={containerStyle}>
        <div className='pacman-body' style={bodyStyle}>
            <div>
                <div className="pacman-top-left"></div>
                <div className="pacman-top-right"></div>
            </div>
            <div style={{ marginTop: '0px' }}>
                <div className="pacman-bottom-left"></div>
                <div className="pacman-bottom-right"></div>
            </div>
        </div>
    </div>
}