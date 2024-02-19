import { useGameActorMovedListener } from '../../events/Events'
import { Tile } from '../../map/Tile'
import { TileMap } from '../../map/TileMap'
import { Point } from '../../math/Point'
import { Ghost } from './Ghost'

export class BlinkyGhost extends Ghost {
    private readonly ghostCorner: Point

    public constructor(tileMap: TileMap) {
        super(tileMap, Tile.BLINKY)
        this.ghostCorner = { x: tileMap.dimension.x, y: 0 }
        useGameActorMovedListener((payload) => {
            // this._targetTilePosition = this.ghostCorner
            if (payload.tile === Tile.PACMAN) {
                this._targetTilePosition = payload.position
            }
        })
    }
}
