export const GameConfig = {
    tileSize: () =>
        Number(
            getComputedStyle(document.body)
                .getPropertyValue('--tile-size')
                .replace(/[^0-9]*/g, '')
        ),
    pacmanUpdateCycle: () =>
        Number(
            getComputedStyle(document.body)
                .getPropertyValue('--pacman-update-cycle')
                .replace(/[^0-9]*/g, '')
        ),
    ghostUpdatePerCycle: () =>
        Number(
            getComputedStyle(document.body)
                .getPropertyValue('--ghost-update-cycle')
                .replace(/[^0-9]*/g, '')
        ),
}
