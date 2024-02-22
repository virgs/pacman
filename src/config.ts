import './config.scss'

const tileSizeCalculator = document.createElement('div')
tileSizeCalculator.id = 'tile-size-calculator'
document.body.append(tileSizeCalculator)

export const GameConfig = {
    getTileSizeInPixels: () => Number(document.getElementById('tile-size-calculator')?.getBoundingClientRect().width),
    getPacmanUpdateCycleInMs: () =>
        Number(
            getComputedStyle(document.documentElement)
                .getPropertyValue('--pacman-update-cycle')
                .replace(/[^0-9]*/g, '')
        ),
    ghostUpdateCycleTimesInMs: {
        blinky: 450,
        inky: 500,
        pinky: 525,
        clyde: 475,
    },
    ghostStateTimesInMs: {
        chase: 60000,
        scatter: 10000,
        frightened: 10000,
    },
    ghostUnlockTimesInMs: {
        blinky: 5000,
        inky: 10000,
        pinky: 20000,
        clyde: 30000,
    },
}
