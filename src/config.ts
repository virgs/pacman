export const GameConfig = {
    gameUpdateCycle: () => Number(getComputedStyle(document.body).getPropertyValue('--game-update-cycle').replace(/[^0-9]*/g, '')),
    pacmanPixelsPerCycle: () => Number(getComputedStyle(document.body).getPropertyValue('--pacman-pixels-per-cycle').replace(/[^0-9]*/g, ''))
}