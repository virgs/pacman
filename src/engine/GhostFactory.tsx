import { Tile } from "../map/Tile";
import { TileMap } from "../map/TileMap";
import { Ghost } from "./Ghost";

export class GhostFactory {
    private readonly tileMap: TileMap;
    public constructor(tileMap: TileMap) {
        this.tileMap = tileMap;
    }

    public createGhost(ghostTile: Tile) {
        return new Ghost(this.tileMap, ghostTile);
    }
}
