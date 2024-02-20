import { useEffect, useState } from 'react'
import './GhostComponent.scss'

type Props = {
    dead: boolean
    frightened: boolean
    ghostName: string
}

export const GhostComponent = (props: Props): JSX.Element => {
    const ghostBodyDefaultClasses = ['ghost-body', 'mx-auto']

    const [ghostBodyClasses, setGhostBodyClasses] = useState<string[]>(ghostBodyDefaultClasses)

    useEffect(() => {
        if (props.dead) {
            setGhostBodyClasses([...ghostBodyDefaultClasses, 'dead-ghost'])
        } else if (props.frightened) {
            setGhostBodyClasses([...ghostBodyDefaultClasses, 'frightened-ghost'])
        } else {
            setGhostBodyClasses([...ghostBodyDefaultClasses])
        }
    }, [props])

    return (
        <div data-ghost-name={props.ghostName.toString().toLowerCase()} className={ghostBodyClasses.join(' ')}>
            <div className="ghost-eyes">
                <div></div>
                <div></div>
            </div>
            <div className="ghost-top"></div>
            <div className="ghost-bottom">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}
