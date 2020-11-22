import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootReducerState } from 'modules';
import { questionAction } from 'modules/QuestionModule';

import Status from 'constants/Status';

import Loading from 'components/game/Loading';

const Game: FC = () => {
    const dispatch = useDispatch();

    const questionStatus = useSelector<
        RootReducerState,
        RootReducerState['questionReducer']['status']
    >(({ questionReducer }) => questionReducer.status);

    // 문제 리스트 로딩
    useEffect(() => {
        dispatch(questionAction.fetchQuestions());
    }, [dispatch]);

    // 문제 리스트 로딩 중
    if (questionStatus === Status.LOADING) return <Loading />;

    return <div />;
};

export default Game;
