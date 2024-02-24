import { useState } from "react";
import { GameConfig } from "../config";
import { GhostState } from "../engine/ghosts/GhostState";
import { useGhostStateChangedListener } from "../events/Events";
import { useInterval } from "../hooks/UseInterval";
import { FruitComponent } from "./FruitComponent";
import { GhostComponent } from "./GhostComponent";
import "./HUDComponent.scss";

const transitionIntervalInMs = 100

export const HUDComponent = (): JSX.Element => {
    const [ghostStyle, setGhostStyle] = useState<React.CSSProperties>({
        opacity: 0
    })
    const [transitionCount, setTransitionCount] = useState<number | undefined>(undefined)
    const [scoreCounter, setScoreCounter] = useState<number>(0)

    useGhostStateChangedListener((payload) => {
        if (payload.state === GhostState.FRIGHTENED) {
            setScoreCounter(score => score + 1)
            setTransitionCount(0)
            setGhostStyle({
                opacity: 1,
                filter: 'blur(0)',
            })
        }
    })

    useInterval(
        () => {
            if (transitionCount !== undefined) {
                if (transitionCount > GameConfig.powerUpEffectDurationInMs) {
                    setTransitionCount(undefined)
                } else {
                    const newTransitionValue = transitionCount + transitionIntervalInMs
                    setTransitionCount(newTransitionValue)
                    const fadeOutStartThreshold = GameConfig.powerUpEffectDurationInMs * .75;
                    if (newTransitionValue > fadeOutStartThreshold) {
                        const excedent = newTransitionValue - fadeOutStartThreshold;
                        const total = GameConfig.powerUpEffectDurationInMs - fadeOutStartThreshold;
                        console.log((1 - (excedent / total)).toFixed(1))
                        setGhostStyle({
                            opacity: (1 - (excedent / total)).toFixed(1),
                            filter: `blur(${(10 * (excedent / total)).toFixed(1)}px)`,
                        })
                    }
                }
            }
        },
        transitionIntervalInMs
    )

    return <div className="row m-0 w-100 justify-content-between g-1">
        <div className="col-3 score-info">
            <div className="score-icon">
                <FruitComponent></FruitComponent>
            </div>
            <h1 className="score-text">
                <small>x</small>
                <strong>{scoreCounter}</strong>
            </h1>
        </div>
        <div className={`col-3 score-info`}
            style={ghostStyle}>
            <div className="score-icon" style={{ position: 'absolute', right: '0' }}>
                <GhostComponent dead={false} ghostName={'John Doe'} frightened={true} />
            </div>
        </div>
    </div>;
};
