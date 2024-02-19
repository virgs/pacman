import { useGameActorMovedListener } from '../../events/Events'
import { Tile } from '../../map/Tile'
import { TileMap } from '../../map/TileMap'
import { Origin, Point, moveTowardsDirection, subtractPoints, sumPoints } from '../../math/Point'
import { Ghost } from './Ghost'

//chases 4 positions in front pacmans position
export class InkyGhost extends Ghost {
    private static readonly TILES_IN_FRONT_PACMAN = 2
    private inFrontOfPacmanPosition: Point
    private blinkGhostPosition: Point
    private readonly ghostCorner: Point

    public constructor(tileMap: TileMap) {
        super(tileMap, Tile.INKY)
        this.ghostCorner = tileMap.dimension
        this.inFrontOfPacmanPosition = Origin
        this.blinkGhostPosition = Origin
        useGameActorMovedListener((payload) => {
            const movedActorTile = payload.tile
            if (movedActorTile === Tile.PACMAN || movedActorTile === Tile.BLINKY) {
                if (movedActorTile === Tile.PACMAN) {
                    this.inFrontOfPacmanPosition = moveTowardsDirection(
                        payload.position,
                        payload.direction,
                        InkyGhost.TILES_IN_FRONT_PACMAN
                    )
                } else {
                    this.blinkGhostPosition = payload.position
                }
                const subtractionVector = subtractPoints(this.inFrontOfPacmanPosition, this.blinkGhostPosition)
                this._targetTilePosition = sumPoints(this.inFrontOfPacmanPosition, subtractionVector)
            }
            // this._targetTilePosition = this.ghostCorner
        })
    }
}
