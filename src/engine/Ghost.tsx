import { getAdjacentDirections, getOppositeDirection } from "../direction/Direction";
import { useGameActorMovedListener } from "../events/Events";
import { GhostTiles, Tile } from "../map/Tile";
import { TileMap } from "../map/TileMap";
import { Point, squaredDistanceBetweenPoints } from "../math/Point";
import { GameActor, TryToMoResult } from "./GameActor";

export class Ghost extends GameActor {
    private readonly _name: string;
    protected _targetTilePosition: Point;

    public constructor(tileMap: TileMap, ghostTile: Tile) {
        if (!GhostTiles.includes(ghostTile)) {
            throw Error(`'${ghostTile}' is not a ghost name`)
        }
        const initialPosition = tileMap.tilePositions.get(ghostTile)![0];
        super(ghostTile, tileMap, initialPosition)
        this._name = Tile[ghostTile];
        this._targetTilePosition = initialPosition;
        useGameActorMovedListener(payload => {
            if (payload.tile === Tile.HERO) {
                this._targetTilePosition = payload.position
            }
        })
    }

    public get name(): string {
        return this._name;
    }

    public detectNextDirection(): TryToMoResult {
        const possibleDirections = [this.tryToMove(this._currentDirection),
        ...getAdjacentDirections(this._currentDirection)
            .map(direction => this.tryToMove(direction))]
            .filter(result => result.success);
        if (this.tileMap.getTileOfPosition(this.currentTilePosition) === Tile.GHOST_CAGE) {
            const wayOut = possibleDirections.find(result => this.tileMap.getTileOfPosition(result.newTilePosition) !== Tile.GHOST_CAGE)
            if (wayOut) {
                return wayOut;
            }
        }
        return possibleDirections.reduce((acc, result) => {
            if (
                squaredDistanceBetweenPoints(result.newPosition, this._targetTilePosition) <
                squaredDistanceBetweenPoints(acc.newPosition, this._targetTilePosition)) {
                return result
            }
            return acc
        }, possibleDirections[0]) ??
            this.tryToMove(getOppositeDirection(this._currentDirection));
    }

}
