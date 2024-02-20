import { faLemon } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { GameConfig } from '../config'
import { PowerUpManager } from '../engine/PowerUpManager'
import './PowerUpComponent.scss'
import { usePowerUpPositionedListener } from '../events/Events'

type PowerUpComponentProps = {
    powerUpManager: PowerUpManager
}

export const PowerUpComponent = (props: PowerUpComponentProps): JSX.Element => {
    const tileSize = GameConfig.getTileSizeInPixels()
    const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({
        left: props.powerUpManager.position.x * tileSize + 'px',
        top: props.powerUpManager.position.y * tileSize + 'px',
    })

    usePowerUpPositionedListener((payload) => {
        setContainerStyle({
            left: payload.position.x * tileSize + 'px',
            top: payload.position.y * tileSize + 'px',
        })
    })

    return (
        <div className="power-up-container d-flex align-items-center" style={containerStyle}>
            <FontAwesomeIcon icon={faLemon} className="power-up-body fa-beat mx-auto" />
        </div>
    )
}
