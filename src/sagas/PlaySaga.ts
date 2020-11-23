import { cancel, delay, fork, put, take } from '@redux-saga/core/effects';
import { Task } from 'redux-saga';

import { playAction } from 'modules/PlayModule';

function* countSecond(second: number): IterableIterator<unknown> {
    // 카운트 시작
    for (let current = second; current > 0; current--) {
        yield put(playAction.setSecond(current));
        yield delay(1000);
    }

    // 시간 초과
    yield put(playAction.wrongAnswer());
}

export function* PlaySaga(): IterableIterator<unknown> {
    while (true) {
        const { payload } = ((yield take(
            playAction.startPlay.type
        )) as unknown) as ReturnType<typeof playAction.startPlay>;

        const countSecondTask = ((yield fork(
            countSecond,
            payload.second
        )) as unknown) as Task;

        yield take([
            playAction.correctAnswer.type,
            playAction.wrongAnswer.type,
            playAction.resetPlay.type
        ]);
        yield cancel(countSecondTask);
    }
}
