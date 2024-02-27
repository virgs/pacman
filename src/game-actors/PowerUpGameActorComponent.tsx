import { useState } from 'react'
import { GameConfig } from '../config'
import { PowerUpManager } from '../engine/PowerUpManager'
import './PowerUpGameActorComponent.scss'
import { usePowerUpPositionedListener } from '../events/Events'
import { FruitComponent } from '../components/FruitComponent'
import { useInterval } from '../hooks/UseInterval'

type Props = {
    powerUpManager: PowerUpManager
}

export const PowerUpGameActorComponent = (props: Props): JSX.Element => {
    const tileSize = GameConfig.getTileSizeInPixels()
    const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({
        left: props.powerUpManager.position.x * tileSize + 'px',
        top: props.powerUpManager.position.y * tileSize + 'px',
    })
    const [powerUpCountdown, setPowerUpCountdown] = useState<number>(
        Math.floor(GameConfig.powerUpRepositioningTimeInMs / 1000)
    )

    usePowerUpPositionedListener((payload) => {
        setPowerUpCountdown(Math.floor(payload.duration / 1000))
        setContainerStyle({
            left: payload.position.x * tileSize + 'px',
            top: payload.position.y * tileSize + 'px',
        })
    })

    useInterval(() => {
        setPowerUpCountdown((current) => current - 1)
    }, 1000)

    return (
        <div
            className={`power-up-game-actor d-flex align-items-center mx-auto ${powerUpCountdown < 5 ? 'fa-shake' : ''}`}
            style={containerStyle}
        >
            <FruitComponent></FruitComponent>
        </div>
    )
}
