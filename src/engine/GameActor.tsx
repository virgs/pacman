import { Direction } from "../direction/Direction";
import { emitGameActorMoved } from "../events/Events";
import { Tile } from "../map/Tile";
import { TileMap } from "../map/TileMap";
import { Point, moveTowardsDirection } from "../math/Point";

export type TryToMoResult = {
    newTilePosition: Point;
    newPosition: Point;
    overlapped: boolean;
    success: boolean;
    direction: Direction
}

export abstract class GameActor {
    protected readonly nonWalkableTiles: Tile[];
    protected readonly tileMap: TileMap;
    protected readonly moveStep: number;
    protected readonly _actor: Tile;
    protected _currentTilePosition: Point;
    protected _currentDirection: Direction;

    public constructor(actor: Tile, tileMap: TileMap, currentTilePosition: Point, nonWalkableTiles: Tile[] = [Tile.WALL], moveStep: number = 1) {
        this.nonWalkableTiles = nonWalkableTiles;
        this.tileMap = tileMap;
        this._actor = actor;
        this._currentTilePosition = currentTilePosition;
        this._currentDirection = Direction.RIGHT;
        this.moveStep = moveStep;
    }

    public get currentTilePosition(): Point {
        return this._currentTilePosition;
    }

    public tryToMove(direction: Direction): TryToMoResult {
        const newPosition = moveTowardsDirection(this._currentTilePosition, direction, 1)
        const newTilePosition = {
            x: Math.floor(newPosition.x),
            y: Math.floor(newPosition.y),
        };
        let overlapped = true;
        if (newPosition.x >= this.tileMap.dimension.x) {
            newTilePosition.x -= this.tileMap.dimension.x;
            newPosition.x -= this.tileMap.dimension.x;
        } else if (newPosition.x <= 0) {
            newTilePosition.x += this.tileMap.dimension.x;
            newPosition.x += this.tileMap.dimension.x;
        } else if (newPosition.y >= this.tileMap.dimension.y) {
            newTilePosition.y -= this.tileMap.dimension.y;
            newPosition.y -= this.tileMap.dimension.y;
        } else if (newPosition.y < 0) {
            newTilePosition.y += this.tileMap.dimension.y;
            newPosition.y += this.tileMap.dimension.y;
        } else {
            overlapped = false;
        }
        const tileOfPosition = this.tileMap.getTileOfPosition(newTilePosition);
        const success = tileOfPosition !== undefined && !this.nonWalkableTiles.includes(tileOfPosition);
        return { newTilePosition: newTilePosition, newPosition: newPosition, overlapped, success, direction };
    }

    public move(direction: Direction, newTilePosition: Point) {
        this._currentDirection = direction;
        this._currentTilePosition = newTilePosition;
        emitGameActorMoved({
            direction: this._currentDirection,
            position: this._currentTilePosition,
            tile: this._actor
        })
    }

}
