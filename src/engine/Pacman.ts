import { HeroActionEventType, useHeroActionListener, usePacmanDiedListener } from '../events/Events'
import { Tile } from '../map/Tile'
import { TileMap } from '../map/TileMap'
import { GameActor } from './GameActor'

export class Pacman extends GameActor {
    private _dead: boolean

    public constructor(tileMap: TileMap) {
        const initialPosition = tileMap.tilePositions.get(Tile.PACMAN)![0]
        super(Tile.PACMAN, tileMap, initialPosition, [Tile.WALL, Tile.GHOST_HOUSE])
        this._dead = false
        useHeroActionListener((payload: HeroActionEventType) => (this._direction = payload.direction))
        usePacmanDiedListener((_payload) => (this._dead = true))
    }

    public get dead(): boolean {
        return this._dead
    }
}
