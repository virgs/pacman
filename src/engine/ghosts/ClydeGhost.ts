import { useGameActorMovedListener } from '../../events/Events'
import { Tile } from '../../map/Tile'
import { TileMap } from '../../map/TileMap'
import { Origin, Point, squaredDistanceBetweenPoints } from '../../math/Point'
import { Ghost } from './Ghost'
import { GhostState } from './GhostState'

export class ClydeGhost extends Ghost {
    private static readonly MIN_TILES_AWAY_FROM_PACMAN_SQUARED = 8 * 8
    private pacmanPosition: Point

    private readonly ghostCorner: Point

    public constructor(tileMap: TileMap) {
        super(tileMap, Tile.CLYDE)
        this.pacmanPosition = Origin
        this.ghostCorner = { y: tileMap.dimension.y, x: 0 }
        useGameActorMovedListener((payload) => {
            if (this.ghostState === GhostState.SCATTER) {
                this._targetTilePosition = this.ghostCorner

            } else if (this.ghostState === GhostState.CHASE) {
                if (payload.tile === Tile.PACMAN || payload.tile === Tile.CLYDE) {
                    if (payload.tile === Tile.PACMAN) {
                        this.pacmanPosition = payload.position
                    }
                    const squaredDistanceToPacman = squaredDistanceBetweenPoints(
                        this.pacmanPosition,
                        this._position
                    )
                    if (squaredDistanceToPacman < ClydeGhost.MIN_TILES_AWAY_FROM_PACMAN_SQUARED) {
                        this._targetTilePosition = this.ghostCorner
                    } else {
                        this._targetTilePosition = this.pacmanPosition
                    }
                }
            }
        })
    }
}
