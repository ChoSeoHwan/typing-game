import { call, put, take } from '@redux-saga/core/effects';
import AxiosResponseError from 'errors/AxiosResponseError';
import { isQuestion } from 'types/data/Question';

import axios from 'libs/axios';

import { questionAction } from 'modules/QuestionModule';

export const fetchQuestionApi = (): ReturnType<typeof axios.get> =>
    axios.get('/kakaopay-fe/resources/words');

function* fetchQuestion() {
    try {
        const questions = yield call(fetchQuestionApi);

        // Question 객체인지 확인
        if (
            !Array.isArray(questions) ||
            !questions.every((question) => isQuestion(question))
        ) {
            throw new AxiosResponseError();
        }

        yield put(questionAction.fetchQuestionsSuccess(questions));
    } catch (error) {
        yield put(questionAction.fetchQuestionsError(error.message));
    }
}

export function* QuestionSaga(): IterableIterator<unknown> {
    yield take(questionAction.fetchQuestions.type);

    yield call(fetchQuestion);
}
