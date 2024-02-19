import { getAdjacentDirections, getOppositeDirection } from '../../direction/Direction'
import { GhostTiles, Tile } from '../../map/Tile'
import { TileMap } from '../../map/TileMap'
import { Point, squaredDistanceBetweenPoints } from '../../math/Point'
import { GameActor, TryToMoResult } from '../GameActor'
import { GhostState } from './GhostState'

export abstract class Ghost extends GameActor {
    private readonly _name: string
    protected _targetTilePosition: Point
    private _ghostState: GhostState
    public constructor(tileMap: TileMap, ghostTile: Tile) {
        if (!GhostTiles.includes(ghostTile)) {
            throw Error(`'${ghostTile}' is not a ghost name`)
        }
        const initialPosition = tileMap.tilePositions.get(ghostTile)![0]
        super(ghostTile, tileMap, initialPosition)
        this._ghostState = GhostState.CHASE
        this._name = Tile[ghostTile]
        this._targetTilePosition = initialPosition
    }

    public get name(): string {
        return this._name
    }

    public get ghostState(): GhostState {
        return this._ghostState
    }

    public detectNextDirection(): TryToMoResult {
        const possibleDirections = [
            this.tryToMove(this._direction),
            ...getAdjacentDirections(this._direction).map((direction) => this.tryToMove(direction)),
        ].filter((result) => result.success &&
            // Can't enter into ghost house unless in EATEN state
            !(this.ghostState !== GhostState.EATEN && this.tileMap.getTileOfPosition(this.position) !== Tile.GHOST_HOUSE && this.tileMap.getTileOfPosition(result.newTilePosition) === Tile.GHOST_HOUSE))

        if (this.tileMap.getTileOfPosition(this.position) === Tile.GHOST_HOUSE) {
            const wayOutOfGhostHouse = possibleDirections.find(
                (result) => this.tileMap.getTileOfPosition(result.newTilePosition) !== Tile.GHOST_HOUSE
            )
            if (wayOutOfGhostHouse) {
                return wayOutOfGhostHouse
            }
        }
        const firstOption = possibleDirections.reduce((acc, result) => {
            if (
                squaredDistanceBetweenPoints(result.newPosition, this._targetTilePosition) <
                squaredDistanceBetweenPoints(acc.newPosition, this._targetTilePosition)
            ) {
                return result
            }
            return acc
        }, possibleDirections[0])
        if (firstOption) {
            return firstOption
        }
        return this.tryToMove(getOppositeDirection(this._direction))
    }
}
