import { InputComponent } from './input/InputComponent';
import { PacmanComponent } from './Game/PacmanComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import "./Root.scss"

export default function Root(): JSX.Element {
  return (
    <div>
      <InputComponent>
        <div>
          <h1>Virgs</h1>
          <h2>Virgs</h2>
          <h3>Virgs</h3>
          <FontAwesomeIcon icon={faEnvelope} />
          <PacmanComponent></PacmanComponent>
        </div>
      </InputComponent>
    </div>
  )
}
