import { PacmanComponent } from './game/PacmanComponent'
import { InputComponent } from './input/InputComponent'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import './Root.scss'
import { Pacman } from './engine/Pacman'
import { GhostFactory } from './engine/ghosts/GhostFactory'
import { GhostState } from './engine/ghosts/GhostState'
import { emitGhostStateChanged } from './events/Events'
import { GhostComponent } from './game/GhostComponent'
import { TileMapComponent } from './game/TileMapComponent'
import { GhostTiles } from './map/Tile'
import { TileMap } from './map/TileMap'
import { TileMapParser } from './map/TileMapParser'

const tiles = await new TileMapParser().parse()
const tileMap = new TileMap(tiles)

class GhostStatesManager {
    private currentState: GhostState;

    public constructor() {
        this.currentState = GhostState.CHASE;
        this.goToChaseState()

    }
    private goToChaseState() {
        this.currentState = GhostState.CHASE;
        emitGhostStateChanged({ state: this.currentState })
        console.log(GhostState[this.currentState])

        setTimeout(() => this.goToScatterState(), 10000)
    }
    private goToScatterState() {
        this.currentState = GhostState.SCATTER;
        emitGhostStateChanged({ state: this.currentState })
        console.log(GhostState[this.currentState])

        setTimeout(() => this.goToChaseState(), 10000)

    }
}

new GhostStatesManager()
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
