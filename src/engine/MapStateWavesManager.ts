import { GameConfig } from '../config'
import { emitGhostStateChanged, usePacmanPoweredUpListener } from '../events/Events'
import { GhostState } from './ghosts/GhostState'

export class MapStateWavesManager {
    private timer?: NodeJS.Timeout

    public constructor() {
        usePacmanPoweredUpListener(() => {
            clearTimeout(this.timer)
            emitGhostStateChanged({ state: GhostState.FRIGHTENED })
            this.timer = setTimeout(() => {
                return this.goToChaseState();
            }, GameConfig.ghostStateTimesInMs.frightened)
        })
    }

    public clear() {
        clearTimeout(this.timer)
    }

    private goToChaseState() {
        emitGhostStateChanged({ state: GhostState.CHASE })
        this.timer = setTimeout(() => this.goToScatterState(), GameConfig.ghostStateTimesInMs.chase)
    }

    private goToScatterState() {
        emitGhostStateChanged({ state: GhostState.SCATTER })
        this.timer = setTimeout(() => this.goToChaseState(), GameConfig.ghostStateTimesInMs.scatter)
    }
}
