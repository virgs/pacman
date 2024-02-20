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
        this._tilePositions = new Map()
        this._map = this.buildTilePositions(map)
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

    private buildTilePositions(map: Tile[][]): Tile[][] {
        return map.map((line, y) =>
            line.map((tile, x) => {
                const position = { x, y }
                this._tilePositions.get(tile)?.push(position) ?? this._tilePositions.set(tile, [position])

                if (tile === Tile.PACMAN) {
                    this._tilePositions.get(Tile.EMPTY)?.push(position) ?? this._tilePositions.set(Tile.EMPTY, [position])
                    return Tile.EMPTY
                } else if (GhostTiles.includes(tile)) {
                    this._tilePositions.get(Tile.GHOST_HOUSE)?.push(position) ??
                        this._tilePositions.set(Tile.GHOST_HOUSE, [position])
                    return Tile.GHOST_HOUSE
                }
                return tile
            })
        )
    }
}
