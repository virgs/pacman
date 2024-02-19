import { Direction } from '../direction/Direction'
import { Point } from '../math/Point'

type GameActorTileMoverResult = {
    newTilePosition: Point
    newPosition: Point
    overlapped: boolean
}

export class GameActorTileMover {
    public move(
        position: Point,
        direction: Direction,
        mapDimension: Point,
        step: number = 1
    ): GameActorTileMoverResult {
        const newPosition = {
            x: position.x,
            y: position.y,
        }
        switch (direction) {
            case Direction.UP:
                newPosition.y -= step
                break
            case Direction.DOWN:
                newPosition.y += step
                break
            case Direction.LEFT:
                newPosition.x -= step
                break
            case Direction.RIGHT:
                newPosition.x += step
                break
        }
        const newTilePosition = {
            x: Math.floor(newPosition.x),
            y: Math.floor(newPosition.y),
        }
        let overlapped = true
        if (newPosition.x >= mapDimension.x) {
            newTilePosition.x -= mapDimension.x
            newPosition.x -= mapDimension.x
        } else if (newPosition.x <= 0) {
            newTilePosition.x += mapDimension.x
            newPosition.x += mapDimension.x
        } else if (newPosition.y >= mapDimension.y) {
            newTilePosition.y -= mapDimension.y
            newPosition.y -= mapDimension.y
        } else if (newPosition.y < 0) {
            newTilePosition.y += mapDimension.y
            newPosition.y += mapDimension.y
        } else {
            overlapped = false
        }

        return { newTilePosition: newTilePosition, newPosition: newPosition, overlapped }
    }
}
