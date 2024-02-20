import { Tile } from '../../map/Tile'
import { TileMap } from '../../map/TileMap'
import { Origin, moveTowardsDirection } from '../../math/Point'
import { Ghost } from './Ghost'

export class PinkyGhost extends Ghost {
    private static readonly TILES_IN_FRONT_PACMAN = 4

    public constructor(tileMap: TileMap) {
        super(tileMap, Tile.PINKY, Origin)
    }

    protected updateTargetPosition(): void {
        const pacmanMove = this._actorsMoveTrackerMap.get(Tile.PACMAN)
        if (pacmanMove) {
            this._targetPosition = pacmanMove?.position ?? this._ghostCorner
            this._targetPosition = moveTowardsDirection(
                pacmanMove.position,
                pacmanMove.direction,
                PinkyGhost.TILES_IN_FRONT_PACMAN
            )
        }
    }
}
