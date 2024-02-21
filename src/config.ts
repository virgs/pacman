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
        blinky: 415,
        inky: 500,
        pinky: 525,
        clyde: 450,
    },
    ghostStateTimesInMs: {
        chase: 40000,
        scatter: 5000,
        frightened: 5000,
    },
    ghostUnlockTimesInMs: {
        inky: 10000,
        pinky: 20000,
        clyde: 30000,
    },
}
