import { Point } from '../math/Point'
import { GhostTiles, Tile } from './Tile'

export class TileMap {
    private readonly _map: Tile[][]
    private readonly _tilePositions: Map<Tile, Point[]>
    private readonly _dimension: Point

    public constructor(map: Tile[][]) {
        this._dimension = {
            y: map.length,
            x: map[0].length,
        }
        this._tilePositions = this.buildTilePositions(map);
        this._map = this.removeDynamicTiles(map)
    }

    public get map(): Tile[][] {
        return this._map
    }

    public get dimension(): Point {
        return this._dimension
    }

    public get tilePositions(): Map<Tile, Point[]> {
        return this._tilePositions
    }

    public getTileOfPosition(position: { x: number; y: number }): Tile | undefined {
        if (position.x < 0 || position.x >= this.dimension.x) {
            return undefined
        }
        if (position.y < 0 || position.y >= this.dimension.y) {
            return undefined
        }
        return this.map[position.y][position.x]
    }

    public buildTilePositions(map: Tile[][]): Map<Tile, Point[]> {
        const result: Map<Tile, Point[]> = new Map();
        map.forEach((line, y) => {
            line.forEach((tile, x) => {
                result.get(tile)?.push({ x, y }) ?? result.set(tile, [{ x, y }])
            })
        })
        return result;
    }

    private removeDynamicTiles(map: Tile[][]): Tile[][] {
        return map.map((line, y) =>
            line.map((tile, x) => {
                if (tile === Tile.HERO) {
                    this._tilePositions.get(Tile.EMPTY)?.push({ x, y }) ?? this._tilePositions.set(Tile.EMPTY, [{ x, y }])
                    return Tile.EMPTY
                }
                if (GhostTiles.includes(tile)) {
                    this._tilePositions.get(Tile.GHOST_CAGE)?.push({ x, y }) ?? this._tilePositions.set(Tile.GHOST_CAGE, [{ x, y }])
                    return Tile.GHOST_CAGE
                }
                return tile
            })
        )
    }
}
