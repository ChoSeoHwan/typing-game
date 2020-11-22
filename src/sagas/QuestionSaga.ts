import { call, delay, put, take } from '@redux-saga/core/effects';
import Question from 'types/data/Question';

import { questionAction } from 'modules/QuestionModule';

const tempData = [
    {
        second: 10,
        text: 'test'
    },
    {
        second: 5,
        text: 'test2'
    }
];

export const fetchQuestionApi = (): Question[] => {
    return tempData;
};

function* fetchQuestion() {
    yield delay(1000);

    const questions = yield call(fetchQuestionApi);
    yield put(questionAction.fetchQuestionsSuccess(questions));
}

export function* QuestionSaga(): IterableIterator<unknown> {
    yield take(questionAction.fetchQuestions.type);

    yield call(fetchQuestion);
}
