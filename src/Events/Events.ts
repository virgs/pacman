import { createEvent } from 'react-event-hook'
import { Direction } from '../direction/Direction'
import { Tile } from '../map/Tile'
import { Point } from '../math/Point'

export type HeroActionEventType = {
    direction: Direction
}

export type GameActorMovedEventType = {
    direction: Direction,
    position: Point,
    tile: Tile
}

export const { useHeroActionListener, emitHeroAction } = createEvent('hero-action')<HeroActionEventType>()
export const { useGameActorMovedListener, emitGameActorMoved } = createEvent('game-actor-moved')<GameActorMovedEventType>()
