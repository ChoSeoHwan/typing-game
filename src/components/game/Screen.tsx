import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useHistory } from 'libs/router';

import { RootReducerState } from 'modules';

import Status from 'constants/Status';

import Ready from 'components/game/screen /Ready';

const Screen: FC = () => {
    const history = useHistory();

    const gameStatus = useSelector<
        RootReducerState,
        RootReducerState['gameReducer']['status']
    >(({ gameReducer }) => gameReducer.status);

    // 게임 완료 시 결과 창으로 이동
    useEffect(() => {
        if (gameStatus === Status.SUCCESS) {
            history.push('/result');
        }
    }, [gameStatus, history]);

    return (
        <>
            {/* 게임 준비 페이지 */}
            {gameStatus === Status.CLEAR && <Ready />}

            {/* 게임 플레이 페이지 */}
            {gameStatus === Status.LOADING && (
                <div data-testid="game-screen-play">게임 중</div>
            )}
        </>
    );
};

export default Screen;
