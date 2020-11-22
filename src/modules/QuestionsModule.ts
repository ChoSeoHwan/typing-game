import {
    createActionCreators,
    createReducerFunction,
    ImmerReducer
} from 'immer-reducer';
import Question from 'types/data/Question';

import Status from 'constants/Status';

interface QuestionsModuleState {
    status: Status;
    data: Question[];
    error: null | string;
}

const initialState: QuestionsModuleState = {
    status: Status.CLEAR,
    data: [],
    error: null
};

class QuestionsModule extends ImmerReducer<QuestionsModuleState> {
    /**
     * question 리스트 로딩 시작
     */
    fetchQuestions() {
        this.draftState = {
            ...initialState,
            status: Status.LOADING
        };
    }

    /**
     * question 리스트 조회 성공
     * @param data
     */
    fetchQuestionsSuccess(data: Question[]) {
        this.draftState.status = Status.SUCCESS;
        this.draftState.data = data;
    }

    /**
     * question 리스트 조회 실패
     * @param error
     */
    fetchQuestionsError(error: string) {
        this.draftState.status = Status.ERROR;
        this.draftState.error = error;
    }

    /**
     * question 초기화
     */
    resetQuestions() {
        this.draftState = initialState;
    }
}

export const questionsReducer = createReducerFunction(
    QuestionsModule,
    initialState
);
export const questionsAction = createActionCreators(QuestionsModule);
