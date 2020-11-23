import { all, call } from 'redux-saga/effects';

import { PlaySaga } from 'sagas/PlaySaga';
import { QuestionSaga } from 'sagas/QuestionSaga';

// root saga
export function* rootSaga(): IterableIterator<unknown> {
    yield all([call(QuestionSaga), call(PlaySaga)]);
}
