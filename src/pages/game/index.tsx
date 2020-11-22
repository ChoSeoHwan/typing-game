import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootReducerState } from 'modules';
import { questionAction } from 'modules/QuestionModule';

import Status from 'constants/Status';

import Error from 'components/game/Error';
import Loading from 'components/game/Loading';

const Game: FC = () => {
    const dispatch = useDispatch();

    const questionStatus = useSelector<
        RootReducerState,
        RootReducerState['questionReducer']['status']
    >(({ questionReducer }) => questionReducer.status);

    // 문제 리스트 로딩
    useEffect(() => {
        if (questionStatus === Status.CLEAR) {
            dispatch(questionAction.fetchQuestions());
        }
    }, [questionStatus, dispatch]);

    return (
        <>
            {/* 문제 리스트 로딩 중 */}
            {[Status.CLEAR, Status.LOADING].includes(questionStatus) && (
                <Loading />
            )}

            {/* 문제 리스트 조회 실패 */}
            {questionStatus === Status.ERROR && <Error />}

            {/* 문제 리스트 로딩 성공 */}
            {questionStatus === Status.SUCCESS && <div />}
        </>
    );
};

export default Game;
