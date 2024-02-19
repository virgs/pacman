import { HeroActionEventType, useHeroActionListener } from '../events/Events'
import { Tile } from '../map/Tile'
import { TileMap } from '../map/TileMap'
import { GameActor } from './GameActor'

export class Pacman extends GameActor {
    public constructor(tileMap: TileMap) {
        const initialPosition = tileMap.tilePositions.get(Tile.PACMAN)![0]
        super(Tile.PACMAN, tileMap, initialPosition, [Tile.WALL, Tile.GHOST_HOUSE])
        useHeroActionListener((payload: HeroActionEventType) => this._direction = payload.direction)
    }
}
