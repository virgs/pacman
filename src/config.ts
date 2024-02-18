import "./config.scss"

const tileSizeCalculator = document.createElement('div');
tileSizeCalculator.id = 'tile-size-calculator';
document.body.append(tileSizeCalculator);

export const GameConfig = {
    getTileSizeInPixels: () =>
        Number(document.getElementById('tile-size-calculator')?.getBoundingClientRect().width),
    getPacmanUpdateCycleInMs: () =>
        Number(
            getComputedStyle(document.documentElement)
                .getPropertyValue('--pacman-update-cycle')
                .replace(/[^0-9]*/g, '')
        ),
    getGhostUpdatePerCycleInMs: () =>
        Number(
            getComputedStyle(document.documentElement)
                .getPropertyValue('--ghost-update-cycle')
                .replace(/[^0-9]*/g, '')
        ),
}
