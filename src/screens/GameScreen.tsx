import { useEffect, useRef, useState } from 'react'
import { GhostTiles, Tile } from '../map/Tile'
import { TileMap } from '../map/TileMap'
import { CollisionManager } from '../engine/CollisionManager'
import { MapStateWavesManager } from '../engine/MapStateWavesManager'
import { PowerUpManager } from '../engine/PowerUpManager'
import { Pacman } from '../engine/Pacman'
import { GhostFactory } from '../engine/ghosts/GhostFactory'
import { GhostGameActorComponent } from '../game-actors/GhostGameActorComponent'
import { PacmanGameActorComponent } from '../game-actors/PacmanGameActorComponent'
import { PowerUpGameActorComponent } from '../game-actors/PowerUpGameActorComponent'
import { TileMapComponent } from '../components/TileMapComponent'
import './GameScreen.scss'
import { GameConfig } from '../config'
import { Point } from '../math/Point'
import { ArrowButtonsComponent } from '../components/ArrowButtonsComponent'
import { HUDComponent } from '../components/HUDComponent'

type Props = {
    tiles: Tile[][]
}

export const GameScreen = (props: Props): JSX.Element => {
    const hudRef = useRef(null)
    const boardRef = useRef(null)

    const [tileMap] = useState<TileMap>(new TileMap(props.tiles))
    const tileSize = GameConfig.getTileSizeInPixels()
    const [boardDimension] = useState<Point>({ x: tileMap.dimension.x * tileSize, y: tileMap.dimension.y * tileSize })
    const [mapStateWavesManager] = useState(new MapStateWavesManager())
    const [powerUpManager] = useState(new PowerUpManager(tileMap))
    const [] = useState(new CollisionManager(powerUpManager.position))

    useEffect(() => {
        //@ts-expect-error
        hudRef!.current!.style.width = boardRef!.current!.clientWidth + 'px'
        return () => {
            mapStateWavesManager.clear()
        }
    }, [])

    const ghostFactory = new GhostFactory(tileMap)
    const ghosts = GhostTiles.filter((ghostTile) => ghostFactory.hasGhost(ghostTile)).map((ghostTile) => (
        <GhostGameActorComponent ghost={ghostFactory.createGhost(ghostTile)!} />
    ))
    return (
        <div className="game-screen-component">
            <div className="row justify-content-around g-1 my-1" style={{ height: '100svh' }}>
                <div className="col-12 col-md-6 p-0">
                    <div
                        ref={boardRef}
                        className="mx-auto board"
                        style={{ width: boardDimension.x, height: boardDimension.y }}
                    >
                        <TileMapComponent tileMap={tileMap} />
                        {...ghosts}
                        <PacmanGameActorComponent pacman={new Pacman(tileMap)} />
                        <PowerUpGameActorComponent powerUpManager={powerUpManager} />
                    </div>
                    <div ref={hudRef} className="mt-2 mx-auto">
                        <HUDComponent />
                    </div>
                </div>
                <div className="col-12 col-md-6 align-self-end d-lg-none px-4 mb-5">
                    <ArrowButtonsComponent />
                </div>
            </div>
        </div>
    )
}
