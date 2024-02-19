import { useGameActorMovedListener } from '../../events/Events'
import { Tile } from '../../map/Tile'
import { TileMap } from '../../map/TileMap'
import { Origin, Point, moveTowardsDirection } from '../../math/Point'
import { Ghost } from './Ghost'

export class PinkyGhost extends Ghost {
    private static readonly TILES_IN_FRONT_PACMAN = 4
    private readonly ghostCorner: Point

    public constructor(tileMap: TileMap) {
        super(tileMap, Tile.PINKY)
        this.ghostCorner = Origin
        useGameActorMovedListener((payload) => {
            if (payload.tile === Tile.PACMAN) {
                this._targetTilePosition = moveTowardsDirection(
                    payload.position,
                    payload.direction,
                    PinkyGhost.TILES_IN_FRONT_PACMAN
                )
            }
        })
    }
}
