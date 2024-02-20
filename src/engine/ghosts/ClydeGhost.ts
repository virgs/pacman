import { Tile } from '../../map/Tile'
import { TileMap } from '../../map/TileMap'
import { squaredDistanceBetweenPoints } from '../../math/Point'
import { Ghost } from './Ghost'

export class ClydeGhost extends Ghost {
    private static readonly MIN_TILES_AWAY_FROM_PACMAN_SQUARED = 8 * 8

    public constructor(tileMap: TileMap) {
        super(tileMap, Tile.CLYDE, { y: tileMap.dimension.y, x: 0 })
    }

    protected updateTargetPosition(): void {
        const pacmanMove = this._actorsMoveTrackerMap.get(Tile.PACMAN)

        if (pacmanMove) {
            const squaredDistanceToPacman = squaredDistanceBetweenPoints(
                pacmanMove.position,
                this._position
            )
            if (squaredDistanceToPacman < ClydeGhost.MIN_TILES_AWAY_FROM_PACMAN_SQUARED) {
                this._targetPosition = this._ghostCorner
            } else {
                this._targetPosition = pacmanMove.position
            }

        }
    }

}
