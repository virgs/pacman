import { InputComponent } from './input/InputComponent';
import { PacmanComponent } from './Game/PacmanComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import "./Root.scss"

export default function Root(): JSX.Element {
  return (
    <InputComponent>
      <div>
        <FontAwesomeIcon icon={faEnvelope} />
        <PacmanComponent initialPosition={{ x: 200, y: 200 }}></PacmanComponent>
      </div>
    </InputComponent>
  )
}
