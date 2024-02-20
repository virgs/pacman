import { useEffect, useState } from 'react'
import { Direction } from '../direction/Direction'
import './PacmanComponent.scss'

type Props = {
    direction: Direction
    moving: boolean
    dead: boolean
}

const getHeroTransformOrientation = (direction: Direction): string => {
    switch (direction) {
        case Direction.UP:
            return 'rotate(-90deg)'
        case Direction.DOWN:
            return 'rotate(90deg)'
        case Direction.LEFT:
            return 'rotateY(180deg)'
    }
    return ''
}

export const PacmanComponent = (props: Props): JSX.Element => {
    const [bodyStyle, setBodyStyle] = useState<React.CSSProperties>({})

    useEffect(() => {
        setBodyStyle({
            transform: getHeroTransformOrientation(props.direction),
        })
    }, [props])

    return (
        <div className="pacman-body mx-auto" style={bodyStyle}>
            <div>
                <div className="pacman-top-left"></div>
                <div className="pacman-top-right"></div>
            </div>
            <div style={{ marginTop: '0px' }}>
                <div className="pacman-bottom-left"></div>
                <div className="pacman-bottom-right"></div>
            </div>
        </div>
    )
}
