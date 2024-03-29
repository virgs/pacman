import { createEvent } from 'react-event-hook'
import { Direction } from '../direction/Direction'
import { GhostState } from '../engine/ghosts/GhostState'
import { Tile } from '../map/Tile'
import { Point } from '../math/Point'

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
    duration: number
}

export type PowerUpPositionedEventType = {
    position: Point
    duration: number
}

export type PacmanTouchedGhostEventType = {
    ghost: Tile
}

export type PacmanDiedEventType = {
    ghost: Tile
}

export type FinalScoreEventType = {
    score: number
}
export const { useGhostStateChangedListener, emitGhostStateChanged } =
    createEvent('ghost-state-changed')<GhostStateChangedEventType>()
export const { useHeroActionListener, emitHeroAction } = createEvent('hero-action')<HeroActionEventType>()
export const { usePacmanTouchedGhostListener, emitPacmanTouchedGhost } =
    createEvent('pacman-touched-ghost')<PacmanTouchedGhostEventType>()
export const { usePacmanPoweredUpListener, emitPacmanPoweredUp } = createEvent('pacman-powered-up')<void>()
export const { usePowerUpPositionedListener, emitPowerUpPositioned } =
    createEvent('power-up-positioned')<PowerUpPositionedEventType>()
export const { usePacmanDiedListener, emitPacmanDied } = createEvent('pacman-died')<PacmanDiedEventType>()
export const { useFinalScoreListener, emitFinalScore } = createEvent('final-score')<FinalScoreEventType>()
export const { useGameActorMovedListener, emitGameActorMoved } =
    createEvent('game-actor-moved')<GameActorMovedEventType>()
