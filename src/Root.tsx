import { ReactNode, useState } from 'react'
import './Root.scss'
import { InputComponent } from './input/InputComponent'
import { Tile } from './map/Tile'
import { GameScreen } from './screens/GameScreen'
import SplashScreen from './screens/SplashScreen'
import { useFinalScoreListener } from './events/Events'

export default function Root(): JSX.Element {
    const [showGameScreen, setShowGameScreen] = useState<boolean>(false)
    const [lastGameScore, setLastGameScore] = useState<number | undefined>(undefined)
    const [parsedTiles, setParsedTiles] = useState<Tile[][] | undefined>(undefined)

    const render = (): ReactNode => {
        if (showGameScreen) {
            return <GameScreen tiles={parsedTiles!} />
        }
        return (
            <SplashScreen
                lastGameScore={lastGameScore}
                onRunGame={(tiles) => {
                    setParsedTiles(tiles)
                    setShowGameScreen(true)
                }}
            ></SplashScreen>
        )
    }

    useFinalScoreListener((payload) => {
        setTimeout(() => {
            setLastGameScore(payload.score)
            setShowGameScreen(false)
        }, 3000)
    })

    return (
        <InputComponent>
            <div className="container-fluid p-0">{render()}</div>
        </InputComponent>
    )
}
