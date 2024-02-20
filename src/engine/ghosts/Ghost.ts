import { getAdjacentDirections, getOppositeDirection } from '../../direction/Direction'
import { GameActorMovedEventType, useGameActorMovedListener, useGhostStateChangedListener } from '../../events/Events'
import { GhostTiles, Tile } from '../../map/Tile'
import { TileMap } from '../../map/TileMap'
import { Point, squaredDistanceBetweenPoints } from '../../math/Point'
import { GameActor, TryToMoveResult } from '../GameActor'
import { GhostState } from './GhostState'

export abstract class Ghost extends GameActor {
    private readonly _name: string
    protected readonly _ghostCorner: Point
    protected readonly _actorsMoveTrackerMap: Map<Tile, GameActorMovedEventType>;
    protected _targetPosition: Point
    protected _ghostState: GhostState
    public constructor(tileMap: TileMap, ghostTile: Tile, ghostCorner: Point) {
        if (!GhostTiles.includes(ghostTile)) {
            throw Error(`'${ghostTile}' is not a ghost name`)
        }
        const initialPosition = tileMap.tilePositions.get(ghostTile)![0]
        super(ghostTile, tileMap, initialPosition)
        this._ghostState = GhostState.CHASE
        this._actorsMoveTrackerMap = new Map()
        this._name = Tile[ghostTile]
        this._ghostCorner = ghostCorner;
        this._targetPosition = initialPosition

        useGameActorMovedListener(payload => {
            this._actorsMoveTrackerMap.set(payload.tile, payload);
        })

        useGhostStateChangedListener(payload => {
            this._ghostState = payload.state
            if (payload.state !== GhostState.EATEN) {
                this._direction = getOppositeDirection(this.direction);
            }
        })
    }

    protected abstract updateTargetPosition(): void;

    public get name(): string {
        return this._name
    }

    public get ghostState(): GhostState {
        return this._ghostState
    }

    public getNextMove(): TryToMoveResult {
        this.updateTargetPosition()
        switch (this.ghostState) {
            case GhostState.CHASE:
                return this.getCloserTo(this._targetPosition);
            case GhostState.SCATTER:
                return this.getCloserTo(this._ghostCorner);
            case GhostState.EATEN:
                {
                    if (this.tileMap.getTileOfPosition(this.position) === Tile.GHOST_HOUSE) {
                        console.log('not dead anymore')
                        this._ghostState = GhostState.CHASE
                        this._direction = getOppositeDirection(this.direction);
                        return this.getNextMove();
                    }
                    return this.getCloserTo(this.tileMap.tilePositions.get(Tile.GHOST_HOUSE)![0]);
                }
            case GhostState.FRIGHTENED:
                return this.moveRandomly()
        }

    }

    private moveRandomly(): TryToMoveResult {
        const possibleDirections = this.detectNextDirections();
        if (possibleDirections.length > 0) {
            return possibleDirections[Math.floor(Math.random() * possibleDirections.length)]
        }
        return this.tryToMoveToDirection(getOppositeDirection(this._direction))
    }

    private getCloserTo(target: Point): TryToMoveResult {
        const possibleDirections = this.detectNextDirections();
        if (possibleDirections.length > 0) {
            return possibleDirections.reduce((acc, result) => {
                if (
                    squaredDistanceBetweenPoints(result.newPosition, target) <
                    squaredDistanceBetweenPoints(acc.newPosition, target)
                ) {
                    return result
                }
                return acc
            }, possibleDirections[0])
        }
        return this.tryToMoveToDirection(getOppositeDirection(this._direction))
    }

    private detectNextDirections(): TryToMoveResult[] {
        const possibleDirections = [
            this.tryToMoveToDirection(this._direction),
            ...getAdjacentDirections(this._direction).map((direction) => this.tryToMoveToDirection(direction)),
        ].filter((result) => result.success &&
            // Can't enter into ghost house unless in EATEN state
            !(this.ghostState !== GhostState.EATEN && this.tileMap.getTileOfPosition(this.position) !== Tile.GHOST_HOUSE && this.tileMap.getTileOfPosition(result.newTilePosition) === Tile.GHOST_HOUSE))

        if (this.tileMap.getTileOfPosition(this.position) === Tile.GHOST_HOUSE) {
            const wayOutOfGhostHouse = possibleDirections.find(
                (result) => this.tileMap.getTileOfPosition(result.newTilePosition) !== Tile.GHOST_HOUSE
            )
            if (wayOutOfGhostHouse) {
                return [wayOutOfGhostHouse]
            }
        }
        return possibleDirections;
    }
}
