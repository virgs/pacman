import { faLemon } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { GameConfig } from '../config'
import { PowerUpManager } from '../engine/PowerUpManager'
import './PowerUpGameActorComponent.scss'
import { usePowerUpPositionedListener } from '../events/Events'
import { FruitComponent } from '../components/FruitComponent'

type Props = {
    powerUpManager: PowerUpManager
}

export const PowerUpGameActorComponent = (props: Props): JSX.Element => {
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
        <div className="power-up-game-actor d-flex align-items-center mx-auto" style={containerStyle}>
            <FruitComponent ></FruitComponent>
        </div>
    )
}
