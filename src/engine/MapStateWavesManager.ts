import { GameConfig } from '../config'
import { emitGhostStateChanged, usePacmanPoweredUpListener } from '../events/Events'
import { GhostState } from './ghosts/GhostState'

export class MapStateWavesManager {
    private timer?: NodeJS.Timeout

    public constructor() {
        this.goToChaseState()
        usePacmanPoweredUpListener(() => {
            emitGhostStateChanged({ state: GhostState.FRIGHTENED })
            clearTimeout(this.timer)
            this.timer = setTimeout(() => this.goToChaseState(), GameConfig.ghostStateTimesInMs.frightened)
        })
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
