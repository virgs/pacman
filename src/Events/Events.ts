import { createEvent } from 'react-event-hook'
import { Direction } from '../direction/Direction'
import { Tile } from '../map/Tile'
import { Point } from '../math/Point'
import { GhostState } from '../engine/ghosts/GhostState'

export type HeroActionEventType = {
    direction: Direction
}

export type GameActorMovedEventType = {
    direction: Direction
    position: Point
    tile: Tile
}

export type GhostStateChangedEventType = {
    state: GhostState
}
export const { useGhostStateChangedListener, emitGhostStateChanged } = createEvent('ghost-state-changed')<GhostStateChangedEventType>()
export const { useHeroActionListener, emitHeroAction } = createEvent('hero-action')<HeroActionEventType>()
export const { useGameActorMovedListener, emitGameActorMoved } =
    createEvent('game-actor-moved')<GameActorMovedEventType>()
