import { GameConfig } from '../../config'
import { Tile } from '../../map/Tile'
import { TileMap } from '../../map/TileMap'
import { Ghost } from './Ghost'

export class BlinkyGhost extends Ghost {
    public constructor(tileMap: TileMap) {
        super(tileMap, Tile.BLINKY, { x: tileMap.dimension.x, y: 0 })
    }

    protected updateTargetPosition(): void {
        const pacmanMove = this._actorsMoveTrackerMap.get(Tile.PACMAN)
        if (pacmanMove) {
            this._targetPosition = pacmanMove.position
        }
    }

    protected get lockTimeInMs(): number {
        return GameConfig.ghostUnlockTimesInMs.blinky
    }

    public get updateCycleInMs(): number {
        return GameConfig.ghostUpdateCycleTimesInMs.blinky
    }
}
