import 'modules';
import { Reducer } from 'redux';
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { fetchQuestionApi, QuestionSaga } from 'sagas/QuestionSaga';

import { RootReducerAction, RootReducerState, wrapperReducer } from 'modules';
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
            .withReducer(
                wrapperReducer as Reducer<RootReducerState, RootReducerAction>
            )
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
});
