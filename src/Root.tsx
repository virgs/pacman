import './Root.scss'
import { Pacman } from './engine/Pacman'
import { GhostFactory } from './engine/ghosts/GhostFactory'
import { GhostComponent } from './game-components/GhostComponent'
import { PacmanComponent } from './game-components/PacmanComponent'
import { PowerUpComponent } from './game-components/PowerUpComponent'
import { TileMapComponent } from './game-components/TileMapComponent'
import { InputComponent } from './input/InputComponent'
import { MapStateManager } from './engine/MapStatesManager'
import { GhostTiles } from './map/Tile'
import { TileMap } from './map/TileMap'
import { TileMapParser } from './map/TileMapParser'
import { PowerUpManager } from './engine/PowerUpManager'

const tiles = await new TileMapParser().parse()
const tileMap = new TileMap(tiles)

new MapStateManager()
export default function Root(): JSX.Element {
    const powerUpManager = new PowerUpManager(tileMap)
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
