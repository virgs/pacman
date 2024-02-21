import { useEffect, useState } from 'react'
import { Direction } from '../direction/Direction'
import './PacmanComponent.scss'

type Props = {
    direction: Direction
    moving: boolean
    dead: boolean
}

export const PacmanComponent = (props: Props): JSX.Element => {
    const [previousHorizontalDirection, setPreviousHorizontalDirection] = useState<Direction>(Direction.RIGHT)
    const [bodyStyle, setBodyStyle] = useState<React.CSSProperties>({})
    const [mouthStyle, setMouthStyle] = useState<React.CSSProperties>({})

    const getBodyTransform = () => {
        if (props.dead) {
            if (previousHorizontalDirection === Direction.LEFT) {
                return 'scaleX(-1)'
            } else {
                return ''
            }
        }
        if (props.direction === Direction.LEFT) {
            return 'scaleX(-1) rotate(5deg)'
        } else if (props.direction === Direction.RIGHT) {
            return 'rotate(5deg)'
        } else {
            if (previousHorizontalDirection === Direction.LEFT) {
                if (props.direction === Direction.UP) {
                    return 'scaleX(-1) rotate(-85deg)'
                } else {
                    return 'scaleX(-1) rotate(85deg)'
                }
            } else if (previousHorizontalDirection === Direction.RIGHT) {
                if (props.direction === Direction.UP) {
                    return 'rotate(-85deg)'
                } else {
                    return 'rotate(85deg)'
                }
            }
        }
        return 'rotate(5deg)'
    }
    useEffect(() => {
        if (props.direction === Direction.LEFT || props.direction === Direction.RIGHT) {
            setPreviousHorizontalDirection(props.direction)
        }
        setBodyStyle({
            transform: getBodyTransform(),
        })
        const newMouthStyle = {
            ...mouthStyle,
            animationName: props.moving && !props.dead ? 'eat-animation' : 'none',
            borderTop: props.dead ? 'none' : '',
        }
        setMouthStyle(newMouthStyle)
    }, [props])

    const renderFace = (): JSX.Element => {
        if (props.dead) {
            return (
                <>
                    <div className="pacman-dead-eye dead"></div>
                </>
            )
        }
        return <></>
    }

    return (
        <div className="pacman-body mx-auto" style={bodyStyle}>
            <div className={`pacman-mouth ${props.dead ? 'dead' : ''}`}></div>
            <div className={`pacman-alive-eye ${props.dead ? 'dead' : ''}`}></div>
            {renderFace()}
            <div className="pacman-left-side"></div>
            <div className="pacman-right-side">
                <div className={`pacman-top-right-side ${props.dead ? 'dead' : ''}`}></div>
                <div style={mouthStyle} className="pacman-bottom-right-side"></div>
            </div>
        </div>
    )
}
