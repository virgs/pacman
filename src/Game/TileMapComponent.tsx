import { GameConfig } from '../config'
import { Tile } from '../map/Tile'
import { TileMap } from '../map/TileMap'
import './TileMapComponent.scss'

type MapComponentProps = {
    tileMap: TileMap
}

function borderStyle(tileMap: TileMap, x: number, y: number) {
    const style: React.CSSProperties = {}
    if (tileMap.getTileOfPosition({ x: x + 1, y }) === Tile.WALL) {
        style.borderRight = 'none'
        style.borderTopRightRadius = '0'
        style.borderBottomRightRadius = '0'
    }
    if (tileMap.getTileOfPosition({ x: x - 1, y }) === Tile.WALL) {
        style.borderLeft = 'none'
        style.borderTopLeftRadius = '0'
        style.borderBottomLeftRadius = '0'
    }
    if (tileMap.getTileOfPosition({ x, y: y + 1 }) === Tile.WALL) {
        style.borderBottom = 'none'
        style.borderBottomLeftRadius = '0'
        style.borderBottomRightRadius = '0'
    }
    if (tileMap.getTileOfPosition({ x, y: y - 1 }) === Tile.WALL) {
        style.borderTop = 'none'
        style.borderTopLeftRadius = '0'
        style.borderTopRightRadius = '0'
    }
    return style
}

export const TileMapComponent = (props: MapComponentProps): JSX.Element => {
    const tileSize = GameConfig.getTileSizeInPixels()

    const walls: JSX.Element[] = []
    props.tileMap.map.forEach((line, y) => {
        line.forEach((tile, x) => {
            if (tile === Tile.WALL) {
                const style: React.CSSProperties = {
                    ...borderStyle(props.tileMap, x, y),
                    left: x * tileSize,
                    top: y * tileSize,
                }
                walls.push(<div key={`${y}.${x}`} className="wall" style={style} />)
            }
        })
    })
    return <>{walls}</>
}
