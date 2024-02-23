import { useState } from "react";
import { Direction } from "../direction/Direction";
import { useGhostStateChangedListener, usePacmanDiedListener, usePowerUpPositionedListener } from "../events/Events";
import { useInterval } from "../hooks/UseInterval";
import { Tile } from "../map/Tile";
import { FruitComponent } from "./FruitComponent";
import { GhostComponent } from "./GhostComponent";
import "./HUDComponent.scss";
import { PacmanComponent } from "./PacmanComponent";
import { GameConfig } from "../config";

const ONE_SECOND = 1000

export const HUDComponent = (): JSX.Element => {
    const [timerEnabled, setTimerEnabled] = useState<boolean>(true)
    const [elapsedMiliseconds, setElapsedMilliseconds] = useState<number>(0)
    const [powerUpCountdown, setPowerUpCountdown] = useState<number>(GameConfig.powerUpTimeInMs)
    const [frightenedModeCountDown, setFrightenedModeCountDownCountdown] = useState<number | undefined>(undefined)


    usePowerUpPositionedListener((payload) => {
        setPowerUpCountdown(payload.duration)
    })

    usePacmanDiedListener(() => {
        setTimerEnabled(false)
    })

    useGhostStateChangedListener((payload) => {
        setFrightenedModeCountDownCountdown(payload.duration)
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

    return <div className="row m-0 w-100 justify-content-evenly g-1">
        <div className="col-3 score-info">
            <div className="score-icon">
                <PacmanComponent dead={!timerEnabled} direction={Direction.RIGHT} moving={timerEnabled} />
            </div>
            <div className="score-text">
                {Math.floor(elapsedMiliseconds / 1000)}s
            </div>
        </div>
        <div className="col-3 score-info">
            <div className="score-icon">
                <FruitComponent></FruitComponent>
            </div>
            <div className="text-end score-text">
                {Math.floor(powerUpCountdown / 1000)}s
            </div>
        </div>
        <div className={`col-3 score-info ${frightenedModeCountDown ? '' : 'fade-out'}`}>
            <div className="score-icon">
                <GhostComponent dead={false} ghostName={Tile[Tile.CLYDE]} frightened={true} />
            </div>
            <div className="score-text">
                {Math.floor((frightenedModeCountDown ?? 0) / 1000)}s
            </div>

        </div>
    </div>;
};
