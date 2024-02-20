import './Root.scss'
import { MapStateManager } from './engine/MapStatesManager'
import { Pacman } from './engine/Pacman'
import { PowerUpManager } from './engine/PowerUpManager'
import { GhostFactory } from './engine/ghosts/GhostFactory'
import { GameActorMovedEventType, emitPacmanPoweredUp, emitPacmanTouchedGhost, useGameActorMovedListener, usePowerUpPositionedListener } from './events/Events'
import { GhostComponent } from './game-components/GhostComponent'
import { PacmanComponent } from './game-components/PacmanComponent'
import { PowerUpComponent } from './game-components/PowerUpComponent'
import { TileMapComponent } from './game-components/TileMapComponent'
import { InputComponent } from './input/InputComponent'
import { GhostTiles, Tile } from './map/Tile'
import { TileMap } from './map/TileMap'
import { TileMapParser } from './map/TileMapParser'
import { Point, squaredDistanceBetweenPoints } from './math/Point'

const tiles = await new TileMapParser().parse()
const tileMap = new TileMap(tiles)
new MapStateManager()

export class CollisionManager {
    private static readonly COLLISION_DISTANCE_TOLLERANCE = .5

    private readonly actorsMoveTrackerMap: Map<Tile, GameActorMovedEventType>;
    private powerUpPosition: Point;

    public constructor(powerUpInitialPosition: Point) {
        this.actorsMoveTrackerMap = new Map();
        this.powerUpPosition = powerUpInitialPosition;

        usePowerUpPositionedListener(payload => {
            this.powerUpPosition = payload.position;
        })

        useGameActorMovedListener(payload => {
            this.actorsMoveTrackerMap.set(payload.tile, payload);

            const pacmanTrack = this.actorsMoveTrackerMap.get(Tile.PACMAN)
            if (pacmanTrack) {
                const roundedUpPacmanPosition = {
                    x: Math.floor(pacmanTrack.position.x),
                    y: Math.floor(pacmanTrack.position.y)
                }
                if (squaredDistanceBetweenPoints(roundedUpPacmanPosition, this.powerUpPosition) < CollisionManager.COLLISION_DISTANCE_TOLLERANCE) {
                    emitPacmanPoweredUp();
                }

                this.actorsMoveTrackerMap
                    .forEach((trackEvent, trackedActor) => {
                        if (GhostTiles.includes(trackedActor)) {
                            if (squaredDistanceBetweenPoints(roundedUpPacmanPosition, trackEvent.position) < CollisionManager.COLLISION_DISTANCE_TOLLERANCE) {
                                console.log('Ouch')
                                emitPacmanTouchedGhost({ ghost: trackedActor })
                            }
                        }
                    })
            }
        })

    }
}

export default function Root(): JSX.Element {
    const powerUpManager = new PowerUpManager(tileMap)
    new CollisionManager(powerUpManager.position)
    const ghostFactory = new GhostFactory(tileMap)
    const ghosts = GhostTiles.filter((ghostTile) => ghostFactory.hasGhost(ghostTile)).map((ghostTile) => (
        <GhostComponent ghost={ghostFactory.createGhost(ghostTile)!} />
    ))

    return (
        <InputComponent>
            <div className="mx-auto" style={{ height: '100%' }}>
                <TileMapComponent tileMap={tileMap} />
                {...ghosts}
                <PacmanComponent pacman={new Pacman(tileMap)} />
                <PowerUpComponent powerUpManager={powerUpManager} />
            </div>
        </InputComponent>
    )
}
