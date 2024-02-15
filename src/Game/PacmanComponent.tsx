import "./PacmanComponent.scss"

export const PacmanComponent = () => {
    return <>
        <div className="pacman-body">
            <div>
                <div className="pacman-top-left"></div>
                <div className="pacman-top-right"></div>
            </div>
            <div style={{ marginTop: '-1px' }}>
                <div className="pacman-bottom-left"></div>
                <div className="pacman-bottom-right"></div>
            </div>
        </div>
        {/* <div className="rounded-corners-gradient-borders"></div> */}
    </>
}