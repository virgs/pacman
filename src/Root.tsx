import { InputComponent } from './input/InputComponent';
import { PacmanComponent } from './Game/PacmanComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import "./Root.scss"
import { GhostComponent } from './Game/GhostComponent';

export default function Root(): JSX.Element {
  return (
    <InputComponent>
      <div>
        <FontAwesomeIcon icon={faEnvelope} />
        <PacmanComponent initialPosition={{ x: 200, y: 300 }}></PacmanComponent>
        <GhostComponent initialPosition={{ x: 200, y: 200 }}></GhostComponent>
      </div>
    </InputComponent>
  )
}
