import { Tile } from '../../map/Tile'
import { TileMap } from '../../map/TileMap'
import { moveTowardsDirection, subtractPoints, sumPoints } from '../../math/Point'
import { Ghost } from './Ghost'

export class InkyGhost extends Ghost {
    private static readonly TILES_IN_FRONT_PACMAN = 2

    public constructor(tileMap: TileMap) {
        super(tileMap, Tile.INKY, tileMap.dimension)
    }

    protected updateTargetPosition(): void {
        const pacmanMove = this._actorsMoveTrackerMap.get(Tile.PACMAN)
        const blinkyGhostMove = this._actorsMoveTrackerMap.get(Tile.BLINKY)
        if (pacmanMove && blinkyGhostMove) {
            const inFrontOfPacmanPosition = moveTowardsDirection(
                pacmanMove.position,
                pacmanMove.direction,
                InkyGhost.TILES_IN_FRONT_PACMAN
            )
            const subtractionVector = subtractPoints(inFrontOfPacmanPosition, blinkyGhostMove.position)
            this._targetPosition = sumPoints(inFrontOfPacmanPosition, subtractionVector)
        }
    }
}
