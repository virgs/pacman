import { useEffect, useState } from "react"
import { GhostTiles, Tile } from "../map/Tile"
import { TileMap } from "../map/TileMap"
import { CollisionManager } from "../engine/CollisionManager"
import { MapStateWavesManager } from "../engine/MapStateWavesManager"
import { PowerUpManager } from "../engine/PowerUpManager"
import { Pacman } from "../engine/Pacman"
import { GhostFactory } from "../engine/ghosts/GhostFactory"
import { GhostGameActorComponent } from "../game-actors/GhostGameActorComponent"
import { PacmanGameActorComponent } from "../game-actors/PacmanGameActorComponent"
import { PowerUpGameActorComponent } from "../game-actors/PowerUpGameActorComponent"
import { TileMapComponent } from "../components/TileMapComponent"
import "./GameScreenComponent.scss"
import { GameConfig } from "../config"
import { Point } from "../math/Point"
import { ArrowButtonsComponent } from "../components/ArrowButtonsComponent"

type Props = {
    tiles: Tile[][]
}

export const GameScreenComponent = (props: Props): JSX.Element => {
    const [tileMap] = useState<TileMap>(new TileMap(props.tiles))
    const tileSize = GameConfig.getTileSizeInPixels();
    const [boardDimension] = useState<Point>({ x: tileMap.dimension.x * tileSize, y: tileMap.dimension.y * tileSize })
    const [mapStateWavesManager] = useState(new MapStateWavesManager())
    const [powerUpManager] = useState(new PowerUpManager(tileMap))
    const [] = useState(new CollisionManager(powerUpManager.position))

    useEffect(() => {
        return () => {
            mapStateWavesManager.clear()
        }
    }, [])

    const ghostFactory = new GhostFactory(tileMap)
    const ghosts = GhostTiles.filter((ghostTile) => ghostFactory.hasGhost(ghostTile)).map((ghostTile) => (
        <GhostGameActorComponent ghost={ghostFactory.createGhost(ghostTile)!} />
    ))
    return <div className="game-screen-component">
        <div className="row justify-content-around g-1" style={{ height: '100%' }}>
            <div className="col-12 col-md-6 p-0">
                <div className="m-2">SCORE</div>
                <div className="mx-auto board" style={{ width: boardDimension.x, height: boardDimension.y }}>
                    <TileMapComponent tileMap={tileMap} />
                    {...ghosts}
                    <PacmanGameActorComponent pacman={new Pacman(tileMap)} />
                    <PowerUpGameActorComponent powerUpManager={powerUpManager} />
                </div>
            </div>
            <div className="col-12 col-md-6 align-self-end d-lg-none px-4 pt-4 mt-5 mt-md-0" >
                <ArrowButtonsComponent />
            </div>
        </div>
    </div>
}