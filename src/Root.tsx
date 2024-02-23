import { ReactNode, useState } from 'react'
import './Root.scss'
import { InputComponent } from './input/InputComponent'
import { Tile } from './map/Tile'
import { GameScreenComponent } from './screens/GameScreenComponent'
import SplashScreenComponent from './screens/SplashScreen'

export default function Root(): JSX.Element {
    const [showGameScreen, setShowGameScreen] = useState<boolean>(false);
    const [parsedTiles, setParsedTiles] = useState<Tile[][] | undefined>(undefined);

    const render = (): ReactNode => {
        if (showGameScreen) {
            return <GameScreenComponent tiles={parsedTiles!} />
        }
        return <SplashScreenComponent onRunGame={tiles => {
            setParsedTiles(tiles)
            setShowGameScreen(true)
        }}></SplashScreenComponent>
    }

    return (
        <InputComponent>
            <div className='container-fluid p-0'>
                {render()}
            </div>
        </InputComponent>
    )
}
