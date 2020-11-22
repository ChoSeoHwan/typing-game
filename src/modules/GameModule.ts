import {
    createActionCreators,
    createReducerFunction,
    ImmerReducer
} from 'immer-reducer';

import Status from 'constants/Status';

interface GameModuleState {
    status: Status;
    score: number;
}

const initialState: GameModuleState = {
    status: Status.CLEAR,
    score: 0
};

class GameModule extends ImmerReducer<GameModuleState> {
    /**
     * 게임 시작
     */
    startGame(initScore: number) {
        this.draftState.status = Status.LOADING;
        this.draftState.score = initScore;
    }

    /**
     * 점수 변경
     */
    setScore(score: number) {
        this.draftState.score = score;
    }

    /**
     * 게임 종료
     */
    finishGame() {
        this.draftState.status = Status.SUCCESS;
    }

    /**
     * 게임 다시 시작
     */
    resetGame() {
        this.draftState = initialState;
    }
}

export const gameReducer = createReducerFunction(GameModule, initialState);
export const gameAction = createActionCreators(GameModule);
