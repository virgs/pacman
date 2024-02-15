import { Point } from "../math/Point"
import "./GhostComponent.scss"

export type GhostComponentProps = {
    initialPosition: Point
}

export const GhostComponent = (props: GhostComponentProps): JSX.Element => {
    return <div className='ghost-container'>
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
}