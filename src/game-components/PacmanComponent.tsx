import { useState } from 'react'
import { GameConfig } from '../config'
import { Direction } from '../direction/Direction'
import { Pacman } from '../engine/Pacman'
import { useInterval } from '../hooks/UseInterval'
import './PacmanComponent.scss'

export type PacmanComponentProps = {
    pacman: Pacman
}

const getHeroTransformOrientation = (direction: Direction): string => {
    switch (direction) {
        case Direction.UP:
            return 'rotate(-90deg)'
        case Direction.DOWN:
            return 'rotate(90deg)'
        case Direction.LEFT:
            return 'scaleX(-1)'
    }
    return ''
}

export const PacmanComponent = (props: PacmanComponentProps): JSX.Element => {
    const pacmanUpdateCycle = GameConfig.getPacmanUpdateCycleInMs()
    const inputWindowCycles = 5 //number of updates a change direction input will work
    const tileSize = GameConfig.getTileSizeInPixels()

    const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({
        left: props.pacman.position.x * tileSize + 'px',
        top: props.pacman.position.y * tileSize + 'px',
    })
    const [bodyStyle, setBodyStyle] = useState<React.CSSProperties>({})

    useInterval(() => {
        const tryResult = props.pacman.tryToMoveToDirection(props.pacman.direction)
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
                left: tryResult.newTilePosition.x * tileSize + 'px',
                top: tryResult.newTilePosition.y * tileSize + 'px',
            })
            props.pacman.move(tryResult.direction, tryResult.newPosition)
        }
        setBodyStyle({
            transform: getHeroTransformOrientation(props.pacman.direction),
        })
    }, pacmanUpdateCycle)
    return (
        <div className="pacman-container d-flex align-items-center" style={containerStyle}>
            <div className="pacman-body mx-auto" style={bodyStyle}>
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
    )
}
