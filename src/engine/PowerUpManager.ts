import { emitPowerUpPositioned } from "../events/Events";
import { Tile } from "../map/Tile";
import { TileMap } from "../map/TileMap";
import { Origin, Point, squaredDistanceBetweenPoints } from "../math/Point";


export class PowerUpManager {
    private static readonly MIN_DISTANCE_TO_PACMAN_SQUARED = 5 * 5;
    private readonly availableSpots: Point[];
    private pacmanCurrentPosition: Point;
    private _position: Point;

    public constructor(tileMap: TileMap) {
        this.availableSpots = tileMap.tilePositions.get(Tile.EMPTY) ?? [];
        this.pacmanCurrentPosition = tileMap.tilePositions.get(Tile.PACMAN)?.[0] ?? Origin;
        this._position = this.positionPowerUp();
    }

    public get position(): Point {
        return this._position;
    }

    private positionPowerUp(): Point {
        const spotsFurtherThanMinDistance = this.availableSpots
            .filter(position => squaredDistanceBetweenPoints(this.pacmanCurrentPosition, position) < PowerUpManager.MIN_DISTANCE_TO_PACMAN_SQUARED);
        const newPosition = spotsFurtherThanMinDistance[Math.floor(Math.random() * spotsFurtherThanMinDistance.length)];
        emitPowerUpPositioned({ position: newPosition });
        return newPosition;
    }
}
