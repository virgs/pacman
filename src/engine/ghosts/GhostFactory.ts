import { Tile } from '../../map/Tile'
import { TileMap } from '../../map/TileMap'
import { BlinkyGhost } from './BlinkyGhost'
import { ClydeGhost } from './ClydeGhost'
import { Ghost } from './Ghost'
import { InkyGhost } from './InkyGhost'
import { PinkyGhost } from './PinkyGhost'

export class GhostFactory {
    private readonly ghostMap: Map<Tile, (tileMap: TileMap) => Ghost>
    private readonly tileMap: TileMap
    public constructor(tileMap: TileMap) {
        this.tileMap = tileMap
        this.ghostMap = new Map()
        this.ghostMap.set(Tile.BLINKY, () => new BlinkyGhost(this.tileMap))
        this.ghostMap.set(Tile.PINKY, () => new PinkyGhost(this.tileMap))
        this.ghostMap.set(Tile.INKY, () => new InkyGhost(this.tileMap))
        this.ghostMap.set(Tile.CLYDE, () => new ClydeGhost(this.tileMap))
    }

    public createGhost(ghostTile: Tile): Ghost | undefined {
        return this.ghostMap.get(ghostTile)?.(this.tileMap)
    }

    public hasGhost(ghostTile: Tile): boolean {
        return this.ghostMap.has(ghostTile)
    }
}
