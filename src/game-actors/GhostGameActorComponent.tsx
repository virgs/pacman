import { useState } from 'react'
import { GameConfig } from '../config'
import { Ghost } from '../engine/ghosts/Ghost'
import { GhostState } from '../engine/ghosts/GhostState'
import { useInterval } from '../hooks/UseInterval'
import './GhostGameActorComponent.scss'
import { GhostComponent } from '../components/GhostComponent'

type Props = {
    ghost: Ghost
}

export const GhostGameActorComponent = (props: Props): JSX.Element => {
    const tileSize = GameConfig.getTileSizeInPixels()
    const [dead, setDead] = useState<boolean>(false)
    const [frightened, setFrightened] = useState<boolean>(false)

    const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({
        left: props.ghost.position.x * tileSize + 'px',
        top: props.ghost.position.y * tileSize + 'px',
    })

    useInterval(() => {
        setDead(props.ghost.dead)
        setFrightened(props.ghost.ghostState === GhostState.FRIGHTENED)

        const result = props.ghost.getNextMove()
        const style = {
            ...containerStyle,
        }
        if (result.overlapped) {
            style.transition = 'none'
        } else {
            style.transition = `all linear ${props.ghost.updateCycleInMs}ms`
        }
        setContainerStyle({
            ...style,
            left: result.newPosition.x * tileSize + 'px',
            top: result.newPosition.y * tileSize + 'px',
        })
        props.ghost.move(result.direction, result.newPosition)
    }, props.ghost.updateCycleInMs)

    return (
        <div style={containerStyle} className="ghost-game-actor d-flex align-items-center">
            <GhostComponent dead={dead} frightened={frightened} ghostName={props.ghost.name}></GhostComponent>
        </div>
    )
}
