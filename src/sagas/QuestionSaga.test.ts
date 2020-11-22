import 'modules';
import AxiosResponseError from 'errors/AxiosResponseError';
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { fetchQuestionApi, QuestionSaga } from 'sagas/QuestionSaga';

import { rootReducer, RootReducerState } from 'modules';
import { questionAction } from 'modules/QuestionModule';

import Status from 'constants/Status';

const testData = [
    {
        second: 10,
        text: 'test text'
    },
    {
        second: 5,
        text: 'this is test'
    },
    {
        second: 10,
        text: 'this is another test'
    }
];

describe('Sagas | QuestionSaga', () => {
    it('question saga 테스트', async () => {
        const { storeState } = await expectSaga(QuestionSaga)
            .withReducer(rootReducer)
            .provide([[call.fn(fetchQuestionApi), testData]])
            .put(questionAction.fetchQuestionsSuccess(testData))
            .dispatch(questionAction.fetchQuestions())
            .run({ timeout: 3000 });

        const state = storeState as RootReducerState;

        expect(state.questionReducer).toStrictEqual({
            status: Status.SUCCESS,
            data: testData,
            error: null
        });
    });

    it('question saga error 테스트', async () => {
        const axiosError = new AxiosResponseError();

        const { storeState } = await expectSaga(QuestionSaga)
            .withReducer(rootReducer)
            .provide([[call.fn(fetchQuestionApi), throwError(axiosError)]])
            .put(questionAction.fetchQuestionsError(axiosError.message))
            .dispatch(questionAction.fetchQuestions())
            .run({ timeout: 3000 });

        const state = storeState as RootReducerState;

        expect(state.questionReducer).toStrictEqual({
            status: Status.ERROR,
            data: [],
            error: axiosError.message
        });
    });
});
