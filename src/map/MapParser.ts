import binUrl from '../assets/level-1.txt?url';
import { MapTiles } from './MapTiles';

export class MapParser {
    public async parse(): Promise<MapTiles[][]> {
        const body = (await fetch(binUrl)).body
        const content = (await body?.getReader().read())?.value;
        const lines: MapTiles[][] = []
        const line: MapTiles[] = []
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
        return lines;
    }

    private getTileFromBitMap(char: string): MapTiles {
        switch (char.toUpperCase()) {
            case '#': return MapTiles.WALL;
            case '@': return MapTiles.HERO;
            case 'P': return MapTiles.PINKY;
            case 'B': return MapTiles.BLINKY;
            case 'I': return MapTiles.INKY;
            case 'C': return MapTiles.CLYDE;
        }
        return MapTiles.EMPTY;
    }
}
