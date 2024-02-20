import { useState } from 'react'
import { GameConfig } from '../config'
import { Ghost } from '../engine/ghosts/Ghost'
import { GhostState } from '../engine/ghosts/GhostState'
import { useInterval } from '../hooks/UseInterval'
import './GhostComponent.scss'
import { StatelessGhostComponent } from './StatelessGhostComponent'

export type GhostComponentProps = {
    ghost: Ghost
}

export const GhostComponent = (props: GhostComponentProps): JSX.Element => {
    const tileSize = GameConfig.getTileSizeInPixels()
    const ghostUpdateCycle = GameConfig.getGhostUpdatePerCycleInMs()
    const [dead, setDead] = useState<boolean>(false);
    const [frightened, setFrightened] = useState<boolean>(false);

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
            style.transition = `all linear ${ghostUpdateCycle}ms`
        }
        setContainerStyle({
            ...style,
            left: result.newTilePosition.x * tileSize + 'px',
            top: result.newTilePosition.y * tileSize + 'px',
        })
        props.ghost.move(result.direction, result.newTilePosition)
    }, ghostUpdateCycle)

    return (
        <div
            style={containerStyle}
            className="ghost-container d-flex align-items-center"
        >
            <StatelessGhostComponent
                dead={dead}
                frightened={frightened}
                ghostName={props.ghost.name}></StatelessGhostComponent>
        </div>
    )
}
