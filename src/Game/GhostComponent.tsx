import { useState } from 'react'
import { GameConfig } from '../config'
import { Ghost } from '../engine/ghosts/Ghost'
import { useInterval } from '../hooks/UseInterval'
import './GhostComponent.scss'

export type GhostComponentProps = {
    ghost: Ghost
}

export const GhostComponent = (props: GhostComponentProps): JSX.Element => {
    const tileSize = GameConfig.getTileSizeInPixels()
    const ghostUpdateCycle = GameConfig.getGhostUpdatePerCycleInMs()

    const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({
        left: props.ghost.position.x * tileSize + 'px',
        top: props.ghost.position.y * tileSize + 'px',
    })

    useInterval(() => {
        const nextDirection = props.ghost.detectNextDirection()
        const style = {
            ...containerStyle,
        }
        if (nextDirection.overlapped) {
            style.transition = 'none'
        } else {
            style.transition = `all linear ${ghostUpdateCycle}ms`
        }
        setContainerStyle({
            ...style,
            left: nextDirection.newTilePosition.x * tileSize + 'px',
            top: nextDirection.newTilePosition.y * tileSize + 'px',
        })
        props.ghost.move(nextDirection.direction, nextDirection.newTilePosition)
    }, ghostUpdateCycle)

    return (
        <div
            style={containerStyle}
            data-ghost-name={props.ghost.name.toString().toLowerCase()}
            className="ghost-container d-flex align-items-center"
        >
            <div className="game-actor ghost-body mx-auto">
                <div className="ghost-eyes">
                    <div></div>
                    <div></div>
                </div>
                <div className="ghost-top"></div>
                <div className="ghost-bottom">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}
