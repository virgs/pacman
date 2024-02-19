import { Direction } from '../direction/Direction'
import { emitGameActorMoved } from '../events/Events'
import { Tile } from '../map/Tile'
import { TileMap } from '../map/TileMap'
import { Point, moveTowardsDirection } from '../math/Point'

export type TryToMoResult = {
    newTilePosition: Point
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
        nonWalkableTiles: Tile[] = [Tile.WALL],
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

    public tryToMove(direction: Direction, moveStep: number = 1): TryToMoResult {
        const newPosition = moveTowardsDirection(this._position, direction, moveStep)
        const newTilePosition = {
            x: Math.floor(newPosition.x),
            y: Math.floor(newPosition.y),
        }
        let overlapped = true
        if (newPosition.x >= this.tileMap.dimension.x) {
            newTilePosition.x -= this.tileMap.dimension.x
            newPosition.x -= this.tileMap.dimension.x
        } else if (newPosition.x <= 0) {
            newTilePosition.x += this.tileMap.dimension.x
            newPosition.x += this.tileMap.dimension.x
        } else if (newPosition.y >= this.tileMap.dimension.y) {
            newTilePosition.y -= this.tileMap.dimension.y
            newPosition.y -= this.tileMap.dimension.y
        } else if (newPosition.y < 0) {
            newTilePosition.y += this.tileMap.dimension.y
            newPosition.y += this.tileMap.dimension.y
        } else {
            overlapped = false
        }
        const tileOfPosition = this.tileMap.getTileOfPosition(newTilePosition)
        const success = tileOfPosition !== undefined && !this.nonWalkableTiles.includes(tileOfPosition)
        return { newTilePosition: newTilePosition, newPosition: newPosition, overlapped, success, direction }
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
