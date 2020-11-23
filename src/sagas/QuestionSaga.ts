import { call, fork, put, take } from '@redux-saga/core/effects';
import { isQuestion } from 'types/data/Question';

import AxiosResponseError from 'errors/AxiosResponseError';

import axios from 'libs/axios';

import { questionsAction } from 'modules/QuestionsModule';

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

        yield put(questionsAction.fetchQuestionsSuccess(questions));
    } catch (error) {
        yield put(questionsAction.fetchQuestionsError(error.message));
    }
}

export function* QuestionSaga(): IterableIterator<unknown> {
    while (true) {
        yield take(questionsAction.fetchQuestions.type);

        yield fork(fetchQuestion);

        yield take(questionsAction.fetchQuestionsError.type);
        yield take(questionsAction.resetQuestions.type);
    }
}
