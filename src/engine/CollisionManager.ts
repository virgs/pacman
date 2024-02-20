import {
    GameActorMovedEventType,
    emitPacmanPoweredUp,
    emitPacmanTouchedGhost,
    useGameActorMovedListener,
    usePowerUpPositionedListener,
} from '../events/Events'
import { GhostTiles, Tile } from '../map/Tile'
import { Point, squaredDistanceBetweenPoints } from '../math/Point'

export class CollisionManager {
    private static readonly COLLISION_DISTANCE_TOLLERANCE = 0.5

    private readonly actorsMoveTrackerMap: Map<Tile, GameActorMovedEventType>
    private powerUpPosition: Point

    public constructor(powerUpInitialPosition: Point) {
        this.actorsMoveTrackerMap = new Map()
        this.powerUpPosition = powerUpInitialPosition

        usePowerUpPositionedListener((payload) => {
            this.powerUpPosition = payload.position
        })

        useGameActorMovedListener((payload) => {
            this.actorsMoveTrackerMap.set(payload.tile, payload)

            const pacmanTrack = this.actorsMoveTrackerMap.get(Tile.PACMAN)
            if (pacmanTrack) {
                const roundedUpPacmanPosition = {
                    x: Math.floor(pacmanTrack.position.x),
                    y: Math.floor(pacmanTrack.position.y),
                }
                if (
                    squaredDistanceBetweenPoints(roundedUpPacmanPosition, this.powerUpPosition) <
                    CollisionManager.COLLISION_DISTANCE_TOLLERANCE
                ) {
                    emitPacmanPoweredUp()
                }

                this.actorsMoveTrackerMap.forEach((trackEvent, trackedActor) => {
                    if (GhostTiles.includes(trackedActor)) {
                        if (
                            squaredDistanceBetweenPoints(roundedUpPacmanPosition, trackEvent.position) <
                            CollisionManager.COLLISION_DISTANCE_TOLLERANCE
                        ) {
                            emitPacmanTouchedGhost({ ghost: trackedActor })
                        }
                    }
                })
            }
        })
    }
}
