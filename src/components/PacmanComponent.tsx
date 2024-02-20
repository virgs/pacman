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
        if (props.direction === Direction.LEFT) {
            return 'scaleX(-1)'
        } else if (props.direction === Direction.RIGHT) {
            return ''
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
        return ''
    }
    useEffect(() => {
        if (props.direction === Direction.LEFT || props.direction === Direction.RIGHT) {
            setPreviousHorizontalDirection(props.direction)
        }
        setBodyStyle({
            transform: getBodyTransform()
        })
        setMouthStyle({
            animationName: (props.moving && !props.dead) ? 'eat-animation' : 'none'
        })


    }, [props])

    const renderEyes = (): JSX.Element => {
        return <div className="pacman-alive-eye"></div>
    }

    return (
        <div className="pacman-body mx-auto" style={bodyStyle}>
            {/* <div className='pacman-rotation' style={{ height: '100%', display: 'flex' }}> */}
            <div className="pacman-left-side"></div>
            <div className="pacman-right-side">
                <div className="pacman-top-right-side">
                    {
                        renderEyes()
                    }
                </div>
                <div style={mouthStyle} className="pacman-bottom-right-side"></div>
            </div>
            {/* </div> */}
        </div>
    )
}
