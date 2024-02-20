import { useState } from 'react'
import './Root.scss'
import { MapStateWavesManager } from './engine/MapStateWavesManager'
import { Pacman } from './engine/Pacman'
import { PowerUpManager } from './engine/PowerUpManager'
import { GhostFactory } from './engine/ghosts/GhostFactory'
import { GhostGameActorComponent } from './game-actors/GhostGameActorComponent'
import { PacmanGameActorComponent } from './game-actors/PacmanGameActorComponent'
import { PowerUpGameActorComponent } from './game-actors/PowerUpGameActorComponent'
import { TileMapComponent } from './components/TileMapComponent'
import { InputComponent } from './input/InputComponent'
import { GhostTiles } from './map/Tile'
import { TileMap } from './map/TileMap'
import { TileMapParser } from './map/TileMapParser'
import { CollisionManager } from './engine/CollisionManager'

const tiles = await new TileMapParser().parse()
const tileMap = new TileMap(tiles)

export default function Root(): JSX.Element {
    const [powerUpManager] = useState(new PowerUpManager(tileMap))
    useState(new MapStateWavesManager())
    useState(new CollisionManager(powerUpManager.position))

    const ghostFactory = new GhostFactory(tileMap)
    const ghosts = GhostTiles.filter((ghostTile) => ghostFactory.hasGhost(ghostTile)).map((ghostTile) => (
        <GhostGameActorComponent ghost={ghostFactory.createGhost(ghostTile)!} />
    ))

    return (
        <InputComponent>
            <div className="mx-auto" style={{ height: '100%' }}>
                <TileMapComponent tileMap={tileMap} />
                {...ghosts}
                <PacmanGameActorComponent pacman={new Pacman(tileMap)} />
                <PowerUpGameActorComponent powerUpManager={powerUpManager} />
            </div>
        </InputComponent>
    )
}
