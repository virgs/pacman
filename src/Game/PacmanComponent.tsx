import { useState } from "react"
import { HeroActionEventType, useHeroActionListener } from "../events/Events"
import { GameConfig } from "../config"
import { Direction } from "../direction/Direction"
import { useInterval } from "../hooks/UseInterval"
import { Origin, Point } from "../math/Point"
import "./PacmanComponent.scss"

export type PacmanComponentProps = {
    initialTilePosition: Point
}

export const PacmanComponent = (props: PacmanComponentProps): JSX.Element => {
    const gameUpdateCycle = GameConfig.gameUpdateCycle()
    const pacmanTilesPerCycle = GameConfig.pacmanTilesPerCycle()
    const pixelsPerCycle = gameUpdateCycle * pacmanTilesPerCycle;
    const tileSize = GameConfig.tileSize()

    const [direction, setDirection] = useState<Direction>(Direction.RIGHT)
    const [tilePosition, setTilePosition] = useState<Point>(props.initialTilePosition)
    const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({
        left: tilePosition.x * tileSize + 'px',
        top: tilePosition.y * tileSize + 'px'
    })
    const [bodyStyle, setBodyStyle] = useState<React.CSSProperties>({})

    useHeroActionListener((payload: HeroActionEventType) => setDirection(payload.direction))

    useInterval(() => {
        const newTilePosition = {
            x: tilePosition.x,
            y: tilePosition.y
        }
        let bodyTransform = ''
        switch (direction) {
            case Direction.UP:
                newTilePosition.y -= 1;
                bodyTransform = 'rotate(-90deg)';
                break
            case Direction.DOWN:
                newTilePosition.y += 1;
                bodyTransform = 'rotate(90deg)';
                break
            case Direction.LEFT:
                newTilePosition.x -= 1;
                bodyTransform = 'scaleX(-1)';
                break
            case Direction.RIGHT:
                newTilePosition.x += 1;
                break
        }
        // setBodyStyle({
        //     transform: bodyTransform
        // })
        // //emit new tile position
        // setPosition(newPosition)
        // setContainerStyle({
        //     ...containerStyle,
        //     transform: `translate(${newPosition.x * pixelsPerCycle}px, ${newPosition.y * pixelsPerCycle}px)`
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