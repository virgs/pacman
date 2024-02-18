import { useState } from 'react'
import { GameConfig } from '../config'
import { Point } from '../math/Point'
import './GhostComponent.scss'

export enum GhostName {
    PINKY = 'PINKY',
    INKY = 'INKY',
    BLINKY = 'BLINKY',
    CLYDE = 'CLYDE',
}

export interface GhostIdentity {
    ghostName: GhostName
}

export type GhostComponentProps = {
    initialTilePosition: Point
    ghostIdentity: GhostIdentity
}

export const GhostComponent = (props: GhostComponentProps): JSX.Element => {
    const tileSize = GameConfig.getTileSizeInPixels()

    const [tilePosition, setTilePosition] = useState<Point>(props.initialTilePosition)
    const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({
        left: tilePosition.x * tileSize + 'px',
        top: tilePosition.y * tileSize + 'px',
    })

    return (
        <div
            style={containerStyle}
            data-ghost-name={props.ghostIdentity.ghostName.toString().toLowerCase()}
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
