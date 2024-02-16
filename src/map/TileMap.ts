import { Point } from '../math/Point';
import { Tile } from './Tile';

export class TileMap {
    private readonly _map: Tile[][];
    private readonly _dimension: Point;
    private readonly _heroOriginalPosition: Point;
    private readonly _pinkyOriginalPosition: Point;
    private readonly _inkyOriginalPosition: Point;
    private readonly _blinkyOriginalPosition: Point;
    private readonly _clydeOriginalPosition: Point;

    public constructor(map: Tile[][]) {
        this._dimension = {
            y: map.length,
            x: map[0].length
        }
        this._heroOriginalPosition = this.findTilePosition(Tile.HERO, map)!
        this._pinkyOriginalPosition = this.findTilePosition(Tile.PINKY, map)!
        this._inkyOriginalPosition = this.findTilePosition(Tile.INKY, map)!
        this._blinkyOriginalPosition = this.findTilePosition(Tile.BLINKY, map)!
        this._clydeOriginalPosition = this.findTilePosition(Tile.CLYDE, map)!
        this._map = this.removeDynamicTiles(map)
    }

    public get map(): Tile[][] {
        return this._map;
    }

    public get dimension(): Point {
        return this._dimension;
    }
    public get heroOriginalPosition(): Point {
        return this._heroOriginalPosition;
    }
    public get pinkyOriginalPosition(): Point {
        return this._pinkyOriginalPosition;
    }
    public get inkyOriginalPosition(): Point {
        return this._inkyOriginalPosition;
    }
    public get blinkyOriginalPosition(): Point {
        return this._blinkyOriginalPosition;
    }
    public get clydeOriginalPosition(): Point {
        return this._clydeOriginalPosition;
    }

    public getTileOfPosition(position: { x: number; y: number; }): Tile | undefined {
        if (position.x < 0 || position.x >= this.dimension.x) {
            return undefined
        }
        if (position.y < 0 || position.y >= this.dimension.y) {
            return undefined
        }
        return this.map[position.y][position.x];
    }

    public findTilePosition(targetTile: Tile, map: Tile[][]): Point | undefined {
        let line = 0;
        for (let tileMapLine of map) {
            let column = 0;
            for (let tile of tileMapLine) {
                if (tile === targetTile) {
                    return {
                        x: column,
                        y: line
                    }
                }
                ++column
            }
            ++line
        }

    }

    private removeDynamicTiles(map: Tile[][]): Tile[][] {
        return map.map(line => line
            .map((tile) => {
                if (tile === Tile.HERO) {
                    return Tile.EMPTY;
                }
                if (tile === Tile.BLINKY ||
                    tile === Tile.PINKY ||
                    tile === Tile.INKY ||
                    tile === Tile.CLYDE) {
                    return Tile.GHOST_CAGE;
                }
                return tile;
            }))
    }
}
