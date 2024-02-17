import { InputComponent } from './input/InputComponent';
import { PacmanComponent } from './game/PacmanComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import "./Root.scss"
import { GhostComponent, GhostName } from './game/GhostComponent';
import { TileMapParser } from './map/TileMapParser';
import { TileMap } from './map/TileMap';
import { TileMapComponent } from './game/TileMapComponent';

const tiles = await new TileMapParser().parse()
const tileMap = new TileMap(tiles)

export default function Root(): JSX.Element {

  return (
    <InputComponent>
      <div className='mx-auto' style={{ height: '100%' }}>
        <FontAwesomeIcon icon={faEnvelope} />
        <TileMapComponent tileMap={tileMap}></TileMapComponent>
        <GhostComponent initialTilePosition={tileMap.blinkyOriginalPosition} ghostIdentity={{ ghostName: GhostName.BLINKY }}></GhostComponent>
        <GhostComponent initialTilePosition={tileMap.pinkyOriginalPosition} ghostIdentity={{ ghostName: GhostName.PINKY }}></GhostComponent>
        <GhostComponent initialTilePosition={tileMap.inkyOriginalPosition} ghostIdentity={{ ghostName: GhostName.INKY }}></GhostComponent>
        <GhostComponent initialTilePosition={tileMap.clydeOriginalPosition} ghostIdentity={{ ghostName: GhostName.CLYDE }}></GhostComponent>
        <PacmanComponent tileMap={tileMap}></PacmanComponent>
      </div>
    </InputComponent>
  )
}
