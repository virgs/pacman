import { useState } from 'react'
import { PacmanComponent } from '../components/PacmanComponent'
import { GameConfig } from '../config'
import { Direction } from '../direction/Direction'
import { Pacman } from '../engine/Pacman'
import { useInterval } from '../hooks/UseInterval'
import './PacmanGameActorComponent.scss'

type Props = {
    pacman: Pacman
}

export const PacmanGameActorComponent = (props: Props): JSX.Element => {
    const pacmanUpdateCycle = GameConfig.getPacmanUpdateCycleInMs()
    const tileSize = GameConfig.getTileSizeInPixels()

    const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({
        left: props.pacman.position.x * tileSize + 'px',
        top: props.pacman.position.y * tileSize + 'px',
    })
    const [dead, setDead] = useState<boolean>(false)
    const [direction, setDirection] = useState<Direction>(Direction.RIGHT)
    const [moving, setMoving] = useState<boolean>(true)

    useInterval(() => {
        setDead(props.pacman.dead)
        if (props.pacman.dead) {
            return
        }
        const tryResult = props.pacman.tryToMoveToDirection(props.pacman.direction)
        setDirection(tryResult.direction)
        setMoving(tryResult.success)

        if (tryResult.success) {
            const style = {
                ...containerStyle,
            }
            if (tryResult.overlapped) {
                style.transition = 'none'
            } else {
                style.transition = `all linear ${pacmanUpdateCycle}ms`
            }
            setContainerStyle({
                ...style,
                left: tryResult.newPosition.x * tileSize + 'px',
                top: tryResult.newPosition.y * tileSize + 'px',
            })
            props.pacman.move(tryResult.direction, tryResult.newPosition)
        }
    }, pacmanUpdateCycle)
    return (
        <div className="pacman-game-actor d-flex align-items-center" style={containerStyle}>
            <PacmanComponent dead={dead} direction={direction} moving={moving}></PacmanComponent>
        </div>
    )
}
