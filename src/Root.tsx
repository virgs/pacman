import { InputComponent } from './input/InputComponent';
import { PacmanComponent } from './game/PacmanComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import "./Root.scss"
import { GhostComponent, GhostName } from './game/GhostComponent';
import { MapParser } from './map/MapParser';

await new MapParser().parse()

export default function Root(): JSX.Element {

  return (
    <InputComponent>
      <div>
        <FontAwesomeIcon icon={faEnvelope} />
        <PacmanComponent initialTilePosition={{ x: 2, y: 10 }}></PacmanComponent>
        <GhostComponent initialTilePosition={{ x: 5, y: 10 }} ghostIdentity={{ ghostName: GhostName.BLINKY }}></GhostComponent>
        <GhostComponent initialTilePosition={{ x: 7, y: 10 }} ghostIdentity={{ ghostName: GhostName.PINKY }}></GhostComponent>
        <GhostComponent initialTilePosition={{ x: 9, y: 10 }} ghostIdentity={{ ghostName: GhostName.INKY }}></GhostComponent>
        <GhostComponent initialTilePosition={{ x: 11, y: 10 }} ghostIdentity={{ ghostName: GhostName.CLYDE }}></GhostComponent>
      </div>
    </InputComponent>
  )
}
