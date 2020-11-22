import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'libs/router';

import { RootReducerState } from 'modules';
import { gameAction } from 'modules/GameModule';

import Status from 'constants/Status';

import Ready from 'components/game/Ready';

const Game: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const gameStatus = useSelector<
        RootReducerState,
        RootReducerState['gameReducer']['status']
    >(({ gameReducer }) => gameReducer.status);

    // 게임 페이지 최초 진입 시 게인 기록 초기화
    useEffect(() => {
        dispatch(gameAction.resetGame());
    }, [dispatch]);

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
            {gameStatus === Status.LOADING && <div>게임중</div>}
        </>
    );
};

export default Game;
