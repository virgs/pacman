import { GhostState } from './ghosts/GhostState';
import { emitGhostStateChanged } from '../events/Events';

export class MapStateManager {
    private currentState: GhostState;

    public constructor() {
        this.currentState = GhostState.CHASE;
        this.goToChaseState();

    }
    private goToChaseState() {
        this.currentState = GhostState.CHASE;
        emitGhostStateChanged({ state: this.currentState });
        console.log(GhostState[this.currentState]);

        setTimeout(() => this.goToScatterState(), 30000);
    }

    private goToScatterState() {
        this.currentState = GhostState.SCATTER;
        emitGhostStateChanged({ state: this.currentState });
        console.log(GhostState[this.currentState]);

        setTimeout(() => this.goToFrightnedState(), 30000);
    }
    private goToFrightnedState() {
        this.currentState = GhostState.FRIGHTENED;
        emitGhostStateChanged({ state: this.currentState });
        console.log(GhostState[this.currentState]);

        setTimeout(() => this.goToEatenState(), 30000);
    }
    private goToEatenState() {
        this.currentState = GhostState.EATEN;
        emitGhostStateChanged({ state: this.currentState });
        console.log(GhostState[this.currentState]);

        setTimeout(() => this.goToChaseState(), 30000);
    }
}
