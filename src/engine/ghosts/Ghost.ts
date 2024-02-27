import { getAdjacentDirections, getOppositeDirection } from '../../direction/Direction'
import {
    GameActorMovedEventType,
    emitPacmanDied,
    useGameActorMovedListener,
    useGhostStateChangedListener,
    usePacmanTouchedGhostListener,
} from '../../events/Events'
import { GhostTiles, Tile } from '../../map/Tile'
import { TileMap } from '../../map/TileMap'
import { Point, squaredDistanceBetweenPoints } from '../../math/Point'
import { GameActor, TryToMoveResult } from '../GameActor'
import { GhostState } from './GhostState'

export abstract class Ghost extends GameActor {
    private _dead: boolean
    private locked: boolean
    private readonly _name: string
    protected readonly _ghostCorner: Point
    protected readonly _actorsMoveTrackerMap: Map<Tile, GameActorMovedEventType>
    protected _targetPosition: Point
    protected _ghostState: GhostState

    public constructor(tileMap: TileMap, ghostTile: Tile, ghostCorner: Point) {
        if (!GhostTiles.includes(ghostTile)) {
            throw Error(`'${ghostTile}' is not a ghost name`)
        }
        const initialPosition = tileMap.tilePositions.get(ghostTile)![0]
        super(ghostTile, tileMap, initialPosition)
        this.locked = true
        this._dead = false
        this._ghostState = GhostState.CHASE
        this._actorsMoveTrackerMap = new Map()
        this._name = Tile[ghostTile]
        this._ghostCorner = ghostCorner
        this._targetPosition = initialPosition

        this.initializeEventListeners()
    }

    protected abstract get lockTimeInMs(): number
    public abstract get updateCycleInMs(): number

    private initializeEventListeners() {
        setTimeout(() => (this.locked = false), this.lockTimeInMs)

        useGameActorMovedListener((payload) => {
            this._actorsMoveTrackerMap.set(payload.tile, payload)
        })

        usePacmanTouchedGhostListener((payload) => {
            if (payload.ghost === this._actorTile) {
                if (this.ghostState === GhostState.FRIGHTENED) {
                    this._dead = true
                } else if (!this.dead) {
                    emitPacmanDied({ ghost: this._actorTile })
                }
            }
        })

        useGhostStateChangedListener((payload) => {
            if (!this.dead && this._ghostState !== payload.state) {
                this._direction = getOppositeDirection(this.direction)
            }
            this._ghostState = payload.state
        })
    }

    protected abstract updateTargetPosition(): void

    public get dead(): boolean {
        return this._dead
    }

    public get name(): string {
        return this._name
    }

    public get ghostState(): GhostState {
        return this._ghostState
    }

    public getNextMove(): TryToMoveResult {
        if (this.locked) {
            return this.wanderInTheGhostHouse()
        }
        if (this.dead) {
            if (this.tileMap.getTileOfPosition(this.position) === Tile.GHOST_HOUSE) {
                console.log('rebirth')
                this._dead = false
                this._direction = getOppositeDirection(this.direction)
                return this.getNextMove()
            }
            const ghostHouses = this.tileMap.tilePositions.get(Tile.GHOST_HOUSE)!
            const anyGhostHouse = ghostHouses[Math.floor(Math.random() * ghostHouses.length)]
            return this.getCloserTo(anyGhostHouse) //any would work
        }
        this.updateTargetPosition()
        switch (this.ghostState) {
            case GhostState.CHASE:
                return this.getCloserTo(this._targetPosition)
            case GhostState.SCATTER:
                return this.getCloserTo(this._ghostCorner)
            case GhostState.FRIGHTENED:
                return this.moveRandomly()
        }
    }

    private wanderInTheGhostHouse() {
        const keepGoing = this.tryToMoveToDirection(this._direction)
        if (keepGoing.success) {
            return keepGoing
        }
        return this.tryToMoveToDirection(getOppositeDirection(this._direction))
    }

    private moveRandomly(): TryToMoveResult {
        const possibleDirections = this.detectNextDirections()
        if (possibleDirections.length > 0) {
            return possibleDirections[Math.floor(Math.random() * possibleDirections.length)]
        }
        return this.tryToMoveToDirection(getOppositeDirection(this._direction))
    }

    private getCloserTo(target: Point): TryToMoveResult {
        const possibleDirections = this.detectNextDirections()
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
        ].filter(
            (result) =>
                result.success &&
                // Can't enter into ghost house unless it's dead
                !(
                    !this.dead &&
                    this.tileMap.getTileOfPosition(this.position) !== Tile.GHOST_HOUSE &&
                    this.tileMap.getTileOfPosition(result.newPosition) === Tile.GHOST_HOUSE
                )
        )

        if (this.tileMap.getTileOfPosition(this.position) === Tile.GHOST_HOUSE) {
            const wayOutOfGhostHouse = possibleDirections.find(
                (result) => this.tileMap.getTileOfPosition(result.newPosition) !== Tile.GHOST_HOUSE
            )
            if (wayOutOfGhostHouse) {
                return [wayOutOfGhostHouse]
            }
        }
        return possibleDirections
    }
}
