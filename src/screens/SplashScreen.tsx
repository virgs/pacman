import { useEffect } from 'react'
import { Tile } from '../map/Tile'
import { TileMapParser } from '../map/TileMapParser'

type Props = {
    onRunGame: (tiles: Tile[][]) => void
}

export default function SplashScreenComponent(props: Props): JSX.Element {
    const loadMap = async () => {
        props.onRunGame(await new TileMapParser().parse())
    }

    useEffect(() => {
        loadMap()
    }, [])

    return (
        <div className='row'>
            <div className='col-12'>
            </div>
        </div>
    )
}
