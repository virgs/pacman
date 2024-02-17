import { useState } from 'react'
import { GameConfig } from '../config'
import { Direction } from '../direction/Direction'
import { HeroActionEventType, emitGameActorMoved, useHeroActionListener } from '../events/Events'
import { useInterval } from '../hooks/UseInterval'
import { TileMap } from '../map/TileMap'
import { Point } from '../math/Point'
import './PacmanComponent.scss'
import { Tile } from '../map/Tile'

export type PacmanComponentProps = {
    tileMap: TileMap
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
    const pacmanUpdateCycle = GameConfig.pacmanUpdateCycle()
    const inputWindowCycles = 5 //number of updates a change direction input will work
    const tileSize = GameConfig.tileSize()

    const [direction, setDirection] = useState<Direction>(Direction.RIGHT)
    const [position, setPosition] = useState<Point>(props.tileMap.heroOriginalPosition)
    const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({
        left: position.x * tileSize + 'px',
        top: position.y * tileSize + 'px',
    })
    const [bodyStyle, setBodyStyle] = useState<React.CSSProperties>({})

    useHeroActionListener((payload: HeroActionEventType) => setDirection(payload.direction))

    function updatePosition() {
        const newPosition = {
            x: position.x,
            y: position.y,
        }
        switch (direction) {
            case Direction.UP:
                newPosition.y -= 1 / inputWindowCycles
                break
            case Direction.DOWN:
                newPosition.y += 1 / inputWindowCycles
                break
            case Direction.LEFT:
                newPosition.x -= 1 / inputWindowCycles
                break
            case Direction.RIGHT:
                newPosition.x += 1 / inputWindowCycles
                break
        }
        const newTilePosition = {
            x: Math.floor(newPosition.x),
            y: Math.floor(newPosition.y),
        }
        let overlapped = true;
        if (newPosition.x >= props.tileMap.dimension.x) {
            newTilePosition.x -= props.tileMap.dimension.x
            newPosition.x -= props.tileMap.dimension.x
        } else if (newPosition.x <= 0) {
            newTilePosition.x += props.tileMap.dimension.x
            newPosition.x += props.tileMap.dimension.x
        } else if (newPosition.y >= props.tileMap.dimension.y) {
            newTilePosition.y -= props.tileMap.dimension.y
            newPosition.y -= props.tileMap.dimension.y
        } else if (newPosition.y < 0) {
            newTilePosition.y += props.tileMap.dimension.y
            newPosition.y += props.tileMap.dimension.y
        } else {
            overlapped = false
        }

        return { newTilePosition: newTilePosition, newPosition: newPosition, overlapped }
    }

    useInterval(() => {
        setBodyStyle({
            transform: getHeroTransformOrientation(direction),
        })

        const { newTilePosition, newPosition, overlapped } = updatePosition()
        if (props.tileMap.getTileOfPosition(newTilePosition) !== Tile.WALL) {
            const style = {
                ...containerStyle,
            }
            if (overlapped) {
                style.transition = 'none'
            } else {
                style.transition = 'all linear var(--pacman-update-cycle)'
            }
            setContainerStyle({
                ...style,
                left: newTilePosition.x * tileSize + 'px',
                top: newTilePosition.y * tileSize + 'px',
            })
            if (
                Math.floor(newPosition.x) !== Math.floor(position.x) ||
                Math.floor(newPosition.y) !== Math.floor(position.y)
            ) {
                emitGameActorMoved({ tile: Tile.HERO, position: newTilePosition, direction: direction })
            }
            setPosition(newPosition)
        }


    }, pacmanUpdateCycle / inputWindowCycles)
    return (
        <div className="pacman-container d-flex align-items-center" style={containerStyle}>
            <div className="game-actor pacman-body mx-auto" style={bodyStyle}>
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
