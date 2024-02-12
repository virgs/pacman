import { Direction } from '../direction/Direction'

export enum UserInput {
    ARROW_UP = 'ArrowUp',
    ARROW_LEFT = 'ArrowLeft',
    ARROW_DOWN = 'ArrowDown',
    ARROW_RIGHT = 'ArrowRight',
}
const userInputs = Object.values(UserInput).filter((key) => isNaN(Number(key)))

export const mapKeyToUserInput = (keyCode: string): UserInput | undefined => {
    const upperKeyCode = keyCode.toUpperCase()
    return userInputs.find((input) => input.toUpperCase().split(',').includes(upperKeyCode))
}

export const mapInputToDirection = (input: UserInput): Direction | undefined => {
    switch (input) {
        case UserInput.ARROW_UP:
            return Direction.UP
        case UserInput.ARROW_LEFT:
            return Direction.LEFT
        case UserInput.ARROW_DOWN:
            return Direction.DOWN
        case UserInput.ARROW_RIGHT:
            return Direction.RIGHT
        default:
            return undefined
    }
}
