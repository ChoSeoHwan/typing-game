import { expectSaga } from 'redux-saga-test-plan';

import { rootReducer } from 'modules';
import { playAction } from 'modules/PlayModule';

import { PlaySaga } from 'sagas/PlaySaga';

describe('Sagas | PlaySaga', () => {
    it('정답 입력 실패, 타임 아웃', async () => {
        await expectSaga(PlaySaga)
            .withReducer(rootReducer)
            .put(playAction.wrongAnswer())
            .dispatch(
                playAction.startPlay({
                    second: 2,
                    text: 'text'
                })
            )
            .run({ timeout: 3000 });
    });

    it('정답 입력 성공', async () => {
        await expectSaga(PlaySaga)
            .withReducer(rootReducer)
            .not.put(playAction.wrongAnswer())
            .dispatch(
                playAction.startPlay({
                    second: 2,
                    text: 'text'
                })
            )
            .dispatch(playAction.correctAnswer())
            .run({ timeout: 3000 });
    });
});
