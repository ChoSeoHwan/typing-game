import React, { FC, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { useHistory } from 'libs/router';

import { RootReducerState } from 'modules';

import Status from 'constants/Status';

const Result: FC = () => {
    const history = useHistory();

    // 현재 게임 데이터 조회
    const { status, score, seconds } = useSelector<
        RootReducerState,
        Pick<RootReducerState['gameReducer'], 'status' | 'score' | 'seconds'>
    >(
        ({ gameReducer }) => ({
            status: gameReducer.status,
            score: gameReducer.score,
            seconds: gameReducer.seconds
        }),
        shallowEqual
    );

    // 게임이 진행 안되었을 경우 메인으로 redirection
    useEffect(() => {
        if (status !== Status.SUCCESS) {
            history.replace('/');
        }
    }, [history, status]);

    return <div />;
};

export default Result;
