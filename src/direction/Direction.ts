export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

export const Directions = Object.values(Direction).filter((key) => isNaN(Number(key)))
