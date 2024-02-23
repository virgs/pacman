import { faArrowUp, faArrowLeft, faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./ArrowButtonsComponent.scss";
import { emitHeroAction } from '../events/Events';
import { Direction } from '../direction/Direction';

export const ArrowButtonsComponent = (): JSX.Element => {
    const onButtonPressed = (direction: Direction) => {
        emitHeroAction({
            direction: direction
        })
    }

    return <>
        <div className="row justify-content-center g-2">
            <div className="col-4 align-self-end">
                <button type="button" className="btn btn-outline-info arrow-button"
                    onPointerLeave={() => onButtonPressed(Direction.UP)}>
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            </div>
            <div className="col-12">
                <div className="row justify-content-center align-items-start g-2">
                    <div className="col-4">
                        <button type="button" className="btn btn-outline-info arrow-button"
                            onPointerLeave={() => onButtonPressed(Direction.LEFT)}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    </div>
                    <div className="col-4">
                        <button type="button" className="btn btn-outline-info arrow-button"
                            onPointerLeave={() => onButtonPressed(Direction.DOWN)}>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                    </div>
                    <div className="col-4">
                        <button type="button" className="btn btn-outline-info arrow-button"
                            onPointerLeave={() => onButtonPressed(Direction.RIGHT)}>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
};
