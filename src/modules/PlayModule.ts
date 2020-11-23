import {
    createActionCreators,
    createReducerFunction,
    ImmerReducer
} from 'immer-reducer';
import Question from 'types/data/Question';

import Status from 'constants/Status';

interface PlayModuleState {
    status: Status;
    remainSecond: number;
    question: Question | null;
}

const initialState: PlayModuleState = {
    status: Status.CLEAR,
    remainSecond: 0,
    question: null
};

class PlayModule extends ImmerReducer<PlayModuleState> {
    /**
     * play 시작
     * @param question
     */
    startPlay(question: Question) {
        this.draftState.status = Status.LOADING;
        this.draftState.remainSecond = question.second;
        this.draftState.question = question;
    }

    /**
     * 남은 시간 변경
     * @param remainSecond
     */
    setRemainSecond(remainSecond: number) {
        this.draftState.remainSecond = remainSecond;
    }

    /**
     * 올바른 답
     */
    correctAnswer() {
        this.draftState.status = Status.SUCCESS;
    }

    /**
     * 틀린 답
     */
    wrongAnswer() {
        this.draftState.status = Status.ERROR;
    }

    /**
     * play 값 초기화
     */
    resetPlay() {
        this.draftState = initialState;
    }
}

export const playReducer = createReducerFunction(PlayModule, initialState);
export const playAction = createActionCreators(PlayModule);
