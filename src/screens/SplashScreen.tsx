import { useEffect, useState } from 'react'
import { GhostTiles, Tile } from '../map/Tile'
import { TileMapParser } from '../map/TileMapParser'
import './SplashScreen.scss'
import { GhostComponent } from '../components/GhostComponent'

type Props = {
    onRunGame: (tiles: Tile[][]) => void
    lastGameScore?: number
}

export default function SplashScreen(props: Props): JSX.Element {
    const [currentBestScore, setCurrentBestScore] = useState<number | undefined>()
    const [bestScoreWasBeaten, setBestScoreWasBeaten] = useState<boolean>(false)
    const [map, setMap] = useState<Tile[][] | undefined>()
    const loadMap = async () => {
        setMap(await new TileMapParser().parse())
    }

    useEffect(() => {
        const bestPersistedScore = localStorage.getItem('bestScore')
        let numberBestScore: number
        if (bestPersistedScore !== null) {
            numberBestScore = Number(bestPersistedScore)
            setCurrentBestScore(numberBestScore)
        }
        if (props.lastGameScore) {
            if (bestPersistedScore === null) {
                setBestScoreWasBeaten(true)
                localStorage.setItem('bestScore', props.lastGameScore.toString())
            } else if (numberBestScore! < props.lastGameScore) {
                setBestScoreWasBeaten(true)
                localStorage.setItem('bestScore', props.lastGameScore.toString())
            }
        }
        loadMap()
    }, [])

    return (
        <>
            <div className="row w-100 mx-0  mx-auto" style={{ minWidth: '30svw', maxWidth: '500px', height: '100svh' }}>
                <div className="col-12">
                    <h1 className="splash-screen-title text-warning">pacman</h1>
                </div>
                <div className="col-10" style={{ maxHeight: '40px' }}>
                    <div className="splash-screen-text text-secondary" style={{ textAlign: 'left' }}>
                        {bestScoreWasBeaten ? 'New best score' : 'Current score'}
                    </div>
                </div>
                <div className="col-2" style={{ maxHeight: '40px' }}>
                    <div className="splash-screen-text text-secondary" style={{ color: 'white !important' }}>
                        {props.lastGameScore ?? '-'}
                    </div>
                </div>
                <div className="col-10" style={{ maxHeight: '40px' }}>
                    <div className="splash-screen-text text-secondary" style={{ textAlign: 'left' }}>
                        {bestScoreWasBeaten ? 'Previous best score' : 'Best score'}
                    </div>
                </div>
                <div className="col-2" style={{ maxHeight: '40px' }}>
                    <div className="splash-screen-text text-secondary" style={{ color: 'white !important' }}>
                        {currentBestScore ?? '-'}
                    </div>
                </div>
                <div className="col-12 my-2">
                    <button
                        disabled={!map}
                        onPointerUp={() => {
                            props.onRunGame(map!)
                        }}
                        type="button"
                        className="btn btn-lg btn-secondary w-100"
                        style={{ maxWidth: '450px' }}
                    >
                        Play
                    </button>
                </div>
                <div className="col-12" style={{ height: '15%', maxHeight: '125px', opacity: '0.25' }}>
                    <div className="row w-100 h-100 mx-0 g-4">
                        {GhostTiles.sort(() => Math.random() - 0.5).map((ghost) => {
                            return (
                                <div key={Tile[ghost]} className="col-3">
                                    <GhostComponent
                                        dead={false}
                                        frightened={false}
                                        ghostName={Tile[ghost]}
                                    ></GhostComponent>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
