import { emitPowerUpPositioned, useGameActorMovedListener, usePacmanPoweredUpListener } from '../events/Events'
import { Tile } from '../map/Tile'
import { TileMap } from '../map/TileMap'
import { Origin, Point, squaredDistanceBetweenPoints } from '../math/Point'

export class PowerUpManager {
    private static readonly MIN_DISTANCE_TO_PACMAN_SQUARED = 10 ** 2
    private readonly availableSpots: Point[]
    private pacmanCurrentPosition: Point
    private _position: Point

    public constructor(tileMap: TileMap) {
        this.availableSpots = tileMap.tilePositions.get(Tile.EMPTY) ?? []
        this.pacmanCurrentPosition = tileMap.tilePositions.get(Tile.PACMAN)?.[0] ?? Origin
        this._position = this.repositionPowerUp()

        useGameActorMovedListener((payload) => {
            if (payload.tile === Tile.PACMAN) {
                this._position = payload.position
            }
        })
        usePacmanPoweredUpListener(() => this.repositionPowerUp())
    }

    public get position(): Point {
        return this._position
    }

    private repositionPowerUp(): Point {
        const spotsFurtherThanMinDistance = this.availableSpots.filter(
            (position) =>
                squaredDistanceBetweenPoints(this.pacmanCurrentPosition, position) >
                PowerUpManager.MIN_DISTANCE_TO_PACMAN_SQUARED
        )
        const randomindex = Math.floor(Math.random() * spotsFurtherThanMinDistance.length)
        this._position = spotsFurtherThanMinDistance[randomindex]
        emitPowerUpPositioned({ position: this._position })
        return this._position
    }
}
