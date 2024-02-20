import { PacmanComponent } from './game/PacmanComponent'
import { InputComponent } from './input/InputComponent'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import './Root.scss'
import { Pacman } from './engine/Pacman'
import { GhostFactory } from './engine/ghosts/GhostFactory'
import { GhostComponent } from './game/GhostComponent'
import { TileMapComponent } from './game/TileMapComponent'
import { GhostTiles } from './map/Tile'
import { TileMap } from './map/TileMap'
import { TileMapParser } from './map/TileMapParser'
import { MapStateManager } from './map/MapStatesManager'

const tiles = await new TileMapParser().parse()
const tileMap = new TileMap(tiles)

new MapStateManager()
export default function Root(): JSX.Element {
    const ghostFactory = new GhostFactory(tileMap)
    const ghosts = GhostTiles.filter((ghostTile) => ghostFactory.hasGhost(ghostTile)).map((ghostTile) => (
        <GhostComponent ghost={ghostFactory.createGhost(ghostTile)!} />
    ))

    return (
        <InputComponent>
            <div className="mx-auto" style={{ height: '100%' }}>
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <TileMapComponent tileMap={tileMap}></TileMapComponent>
                {...ghosts}
                <PacmanComponent pacman={new Pacman(tileMap)} />
            </div>
        </InputComponent>
    )
}
