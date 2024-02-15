import { Direction } from "../direction/Direction"

export interface Point {
    x: number
    y: number
}

export const Origin: Point = { x: 0, y: 0 };

export type ApproximateDirectionOptions = {
    minLength: number
    degreesTolerance: number
}

export const pointsAreEqual = (a?: Point, b?: Point): boolean => {
    if (a === undefined || b === undefined) {
        return false
    }
    return a.x === b.x && a.y === b.y
}

export const squaredDistanceBetweenPoints = (a: Point, b: Point): number => {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2
}

export const vectorApproximateDirection = (
    vector: Point,
    options?: Partial<ApproximateDirectionOptions>
): Direction | undefined => {
    if (options?.minLength) {
        const minLengthSquared: number = options.minLength * options.minLength
        if (minLengthSquared > vector.x * vector.x + vector.y * vector.y) {
            return undefined
        }
    }
    var radianAngles = Math.atan2(vector.y, vector.x)
    var degrees = (180 * radianAngles) / Math.PI
    const positiveRoundedValue = (360 + Math.round(degrees)) % 360

    const tolerance = Math.min(45, options?.degreesTolerance || 0)

    if (positiveRoundedValue > 360 - tolerance || positiveRoundedValue < 0 + tolerance) return Direction.RIGHT
    else if (positiveRoundedValue > 90 - tolerance && positiveRoundedValue < 90 + tolerance) return Direction.DOWN
    else if (positiveRoundedValue > 180 - tolerance && positiveRoundedValue < 180 + tolerance) return Direction.LEFT
    else if (positiveRoundedValue > 270 - tolerance && positiveRoundedValue < 270 + tolerance) return Direction.UP
    return undefined
}