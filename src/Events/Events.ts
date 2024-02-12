import { createEvent } from 'react-event-hook'
import { Direction } from '../direction/Direction'

export type HeroActionEventType = {
    direction: Direction
}

export const { useHeroActionListener, emitHeroAction } = createEvent('hero-action')<HeroActionEventType>()
