export enum GhostState {
    CHASE, //(target system)(immediatelly turn around 180 degrees) chase hero
    SCATTER, //(target system)(immediatelly turn around 180 degrees) go to their corner where they stay for a time, or until death
    EATEN, //become eyes, go back to cage, then go back to CHASE mode
    FRIGHTENED, // (immediatelly turn around 180 degrees). choose randomly at each intersection, turn blue until death or power-up effect is over
}
