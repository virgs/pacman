import { useState } from 'react'
import './Root.scss'
import { MapStateWavesManager } from './engine/MapStateWavesManager'
import { Pacman } from './engine/Pacman'
import { PowerUpManager } from './engine/PowerUpManager'
import { GhostFactory } from './engine/ghosts/GhostFactory'
import { GhostComponent } from './game-components/GhostComponent'
import { PacmanComponent } from './game-components/PacmanComponent'
import { PowerUpComponent } from './game-components/PowerUpComponent'
import { TileMapComponent } from './game-components/TileMapComponent'
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
        <GhostComponent ghost={ghostFactory.createGhost(ghostTile)!} />
    ))

    return (
        <InputComponent>
            <div className="mx-auto" style={{ height: '100%' }}>
                <TileMapComponent tileMap={tileMap} />
                {...ghosts}
                <PacmanComponent pacman={new Pacman(tileMap)} />
                <PowerUpComponent powerUpManager={powerUpManager} />
            </div>
        </InputComponent>
    )
}
