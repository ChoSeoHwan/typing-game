import {
    createActionCreators,
    createReducerFunction,
    ImmerReducer
} from 'immer-reducer';
import Question from 'types/data/Question';

import Status from 'constants/Status';

interface QuestionModuleState {
    status: Status;
    data: Question[];
    error: null | string;
}

const initialState: QuestionModuleState = {
    status: Status.CLEAR,
    data: [],
    error: null
};

class QuestionModule extends ImmerReducer<QuestionModuleState> {
    /**
     * question 리스트 로딩 시작
     */
    fetchQuestions() {
        this.draftState = initialState;
        this.draftState.status = Status.LOADING;
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
}

export const questionReducer = createReducerFunction(
    QuestionModule,
    initialState
);
export const questionAction = createActionCreators(QuestionModule);
