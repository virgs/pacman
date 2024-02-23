import { faHourglass, faLemon } from "@fortawesome/free-regular-svg-icons";
import { faGhost } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { GameConfig } from "../config";
import { usePacmanDiedListener, usePacmanPoweredUpListener, usePowerUpPositionedListener } from "../events/Events";
import { useInterval } from "../hooks/UseInterval";
import "./HUDComponent.scss";
import { Tile } from "../map/Tile";
import { GhostComponent } from "./GhostComponent";

const ONE_SECOND = 1000

export const HUDComponent = (): JSX.Element => {
    const [timerEnabled, setTimerEnabled] = useState<boolean>(true)
    const [elapsedMiliseconds, setElapsedMilliseconds] = useState<number>(0)
    const [powerUpCountdown, setPowerUpCountdown] = useState<number>(GameConfig.powerUpTimeInMs)
    const [frightenedModeCountDown, setFrightenedModeCountDownCountdown] = useState<number | undefined>(undefined)


    usePowerUpPositionedListener(() => {
        setPowerUpCountdown(GameConfig.powerUpTimeInMs)
    })

    usePacmanDiedListener(() => {
        setTimerEnabled(false)
    })

    usePacmanPoweredUpListener(() => {
        setFrightenedModeCountDownCountdown(GameConfig.ghostStateTimesInMs.frightened)
    })

    useInterval(
        () => {
            setFrightenedModeCountDownCountdown(current => {
                if (current !== undefined) {
                    if (current <= 0) {
                        return undefined
                    }
                    return current - 1000;
                }
            })
            setPowerUpCountdown(current => current - 1000)
            setElapsedMilliseconds((x) => x + 1000)
        },
        timerEnabled ? ONE_SECOND : undefined
    )
    const renderGhostFrightenedCountdown = (): JSX.Element => {
        if (frightenedModeCountDown === undefined) {
            return <></>
        }
        return <>
            <div className="score-icon">
                <GhostComponent dead={false} ghostName={Tile[Tile.CLYDE]} frightened={true}></GhostComponent>
            </div>
            <div className="score-text">
                {Math.floor(frightenedModeCountDown / 1000)}s
            </div>
        </>
    }

    return <div className="row m-0 w-100 justify-content-evenly g-1">
        <div className="col-3 score-info">
            <div className="score-icon">
                <FontAwesomeIcon icon={faHourglass} className="text-light" />
            </div>
            <div className="score-text">
                {Math.floor(elapsedMiliseconds / 1000)}s
            </div>
        </div>
        <div className="col-3 score-info">
            <div className="score-icon">
                <FontAwesomeIcon icon={faLemon} className="text-light" />
            </div>
            <div className="text-end score-text">
                {Math.floor(powerUpCountdown / 1000)}s
            </div>
        </div>
        <div className="col-3 score-info">
            {renderGhostFrightenedCountdown()}
        </div>
    </div>;
};
