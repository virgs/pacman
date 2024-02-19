export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

export const Directions = Object.values(Direction).filter((key) => isNaN(Number(key)))
export const getAdjacentDirections = (direction: Direction): Direction[] => {
    switch (direction) {
        case Direction.UP:
        case Direction.DOWN:
            return [Direction.RIGHT, Direction.LEFT]
        case Direction.LEFT:
        case Direction.RIGHT:
            return [Direction.UP, Direction.DOWN]
    }
}
export const getOppositeDirection = (direction: Direction): Direction => {
    switch (direction) {
        case Direction.UP:
            return Direction.DOWN
        case Direction.DOWN:
            return Direction.UP
        case Direction.LEFT:
            return Direction.RIGHT
        case Direction.RIGHT:
            return Direction.LEFT
    }
}
