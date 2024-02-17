import { useState } from "react"
import { GameConfig } from "../config"
import { Direction } from "../direction/Direction"
import { HeroActionEventType, emitGameActorMoved, useHeroActionListener } from "../events/Events"
import { useInterval } from "../hooks/UseInterval"
import { TileMap } from "../map/TileMap"
import { Point } from "../math/Point"
import "./PacmanComponent.scss"
import { Tile } from "../map/Tile"

export type PacmanComponentProps = {
    tileMap: TileMap
}

const getHeroTransformOrientation = (direction: Direction): string => {
    switch (direction) {
        case Direction.UP:
            return 'rotate(-90deg)';
        case Direction.DOWN:
            return 'rotate(90deg)';
        case Direction.LEFT:
            return 'scaleX(-1)';
    }
    return ''
}

export const PacmanComponent = (props: PacmanComponentProps): JSX.Element => {
    const pacmanUpdateCycle = GameConfig.pacmanUpdateCycle()
    const inputWindowCycles = 5; //number of updates a change direction input will work
    const tileSize = GameConfig.tileSize()

    const [direction, setDirection] = useState<Direction>(Direction.RIGHT)
    const [tilePosition, setTilePosition] = useState<Point>(props.tileMap.heroOriginalPosition)
    const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({
        left: tilePosition.x * tileSize + 'px',
        top: tilePosition.y * tileSize + 'px'
    })
    const [bodyStyle, setBodyStyle] = useState<React.CSSProperties>({})

    useHeroActionListener((payload: HeroActionEventType) => setDirection(payload.direction))

    useInterval(() => {
        setBodyStyle({
            transform: getHeroTransformOrientation(direction)
        })

        const newTilePosition = {
            x: tilePosition.x,
            y: tilePosition.y
        }
        switch (direction) {
            case Direction.UP:
                newTilePosition.y -= 1 / inputWindowCycles;
                break
            case Direction.DOWN:
                newTilePosition.y += 1 / inputWindowCycles;
                break
            case Direction.LEFT:
                newTilePosition.x -= 1 / inputWindowCycles;
                break
            case Direction.RIGHT:
                newTilePosition.x += 1 / inputWindowCycles;
                break
        }
        const roundedPosition = {
            x: Math.ceil(newTilePosition.x),
            y: Math.ceil(newTilePosition.y),
        }
        if (props.tileMap.getTileOfPosition(roundedPosition) !== Tile.WALL) {
            const style = {
                ...containerStyle
            }
            if (newTilePosition.x >= props.tileMap.dimension.x || newTilePosition.x <= 0) {
                style.transition = 'none'
            } else if (newTilePosition.y >= props.tileMap.dimension.y || newTilePosition.y < 0) {
                style.transition = 'none'
            } else {
                style.transition = 'all linear var(--pacman-update-cycle)'
            }
            roundedPosition.x = (roundedPosition.x + props.tileMap.dimension.x) % props.tileMap.dimension.x
            roundedPosition.y = (roundedPosition.y + props.tileMap.dimension.y) % props.tileMap.dimension.y
            newTilePosition.x = (newTilePosition.x + props.tileMap.dimension.x) % props.tileMap.dimension.x
            newTilePosition.y = (newTilePosition.y + props.tileMap.dimension.y) % props.tileMap.dimension.y
            setContainerStyle({
                ...style,
                left: roundedPosition.x * tileSize + 'px',
                top: roundedPosition.y * tileSize + 'px',
            });
            if (Math.floor(newTilePosition.x) !== Math.floor(tilePosition.x) ||
                Math.floor(newTilePosition.y) !== Math.floor(tilePosition.y)) {
                emitGameActorMoved({ tile: Tile.HERO, position: roundedPosition, direction: direction })
            }
            setTilePosition(newTilePosition)
        }

    }, pacmanUpdateCycle / inputWindowCycles)
    return <div className='pacman-container d-flex align-items-center' style={containerStyle}>
        <div className='pacman-body mx-auto' style={bodyStyle}>
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