export const GameConfig = {

    gameUpdateCycle: () => Number(getComputedStyle(document.body).getPropertyValue('--game-update-cycle').replace(/[^0-9]*/g, '')),
    tileSize: () => Number(getComputedStyle(document.body).getPropertyValue('--tile-size').replace(/[^0-9]*/g, '')),
    pacmanTilesPerCycle: () => Number(getComputedStyle(document.body).getPropertyValue('--pacman-tiles-per-cycle')),
    ghostTilesPerCycle: () => Number(getComputedStyle(document.body).getPropertyValue('--ghost-tiles-per-cycle'))
}