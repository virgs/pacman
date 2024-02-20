import { Direction } from '../direction/Direction'
import { emitGameActorMoved } from '../events/Events'
import { Tile } from '../map/Tile'
import { TileMap } from '../map/TileMap'
import { Point, moveTowardsDirection } from '../math/Point'

export type TryToMoveResult = {
    newPosition: Point
    overlapped: boolean
    success: boolean
    direction: Direction
}

export abstract class GameActor {
    protected readonly nonWalkableTiles: Tile[]
    protected readonly tileMap: TileMap
    protected readonly _actorTile: Tile
    protected _direction: Direction
    protected _position: Point

    public constructor(
        actor: Tile,
        tileMap: TileMap,
        currentTilePosition: Point,
        nonWalkableTiles: Tile[] = [Tile.WALL]
    ) {
        this.nonWalkableTiles = nonWalkableTiles
        this.tileMap = tileMap
        this._actorTile = actor
        this._position = currentTilePosition
        this._direction = Direction.RIGHT
    }

    public get position(): Point {
        return this._position
    }

    public get direction(): Direction {
        return this._direction
    }

    public tryToMoveToDirection(direction: Direction): TryToMoveResult {
        const newPosition = moveTowardsDirection(this._position, direction)
        let overlapped = true
        if (newPosition.x >= this.tileMap.dimension.x) {
            newPosition.x -= this.tileMap.dimension.x
        } else if (newPosition.x < 0) {
            newPosition.x += this.tileMap.dimension.x
        } else if (newPosition.y >= this.tileMap.dimension.y) {
            newPosition.y -= this.tileMap.dimension.y
        } else if (newPosition.y < 0) {
            newPosition.y += this.tileMap.dimension.y
        } else {
            overlapped = false
        }
        const tileOfPosition = this.tileMap.getTileOfPosition(newPosition)
        const success = tileOfPosition !== undefined && !this.nonWalkableTiles.includes(tileOfPosition)
        return { newPosition: newPosition, overlapped, success, direction }
    }

    public move(direction: Direction, position: Point) {
        this._direction = direction
        this._position = position
        emitGameActorMoved({
            direction: this._direction,
            position: this._position,
            tile: this._actorTile,
        })
    }
}
