import binUrl from '../assets/level-1.txt?url'
import { Tile } from './Tile'

export class TileMapParser {
    public async parse(): Promise<Tile[][]> {
        const body = (await fetch(binUrl)).body
        const content = (await body?.getReader().read())?.value
        const lines: Tile[][] = []
        const line: Tile[] = []
        for (let charCode of content!) {
            const char = String.fromCharCode(charCode)
            if (char === '\n') {
                lines.push([...line])
                line.splice(0, line.length)
            } else {
                line.push(this.getTileFromBitMap(char))
            }
        }
        if (line.length > 0) {
            lines.push(line)
        }
        return lines
    }

    private getTileFromBitMap(char: string): Tile {
        switch (char.toUpperCase()) {
            case '#':
                return Tile.WALL
            case '~':
                return Tile.GHOST_HOUSE
            case '@':
                return Tile.PACMAN
            case 'P':
                return Tile.PINKY
            case 'B':
                return Tile.BLINKY
            case 'I':
                return Tile.INKY
            case 'C':
                return Tile.CLYDE
        }
        return Tile.EMPTY
    }
}
