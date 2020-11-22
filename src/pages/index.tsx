import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NotFound, Redirect, Route } from 'libs/router';

import { RootReducerState } from 'modules';
import { questionsAction } from 'modules/QuestionsModule';

import Status from 'constants/Status';

import Game from 'pages/game';
import NotFoundPage from 'pages/NotFound';

import Error from 'components/Error';
import Loading from 'components/Loading';
import MainLayout from 'components/MainLayout';

const Index: FC = () => {
    const dispatch = useDispatch();

    // 문제 리스트 존재 여부
    const status = useSelector<
        RootReducerState,
        RootReducerState['questionsReducer']['status']
    >(({ questionsReducer }) => questionsReducer.status);

    // 문제 리스트 로딩
    useEffect(() => {
        if (status === Status.CLEAR) {
            dispatch(questionsAction.fetchQuestions());
        }
    }, [status, dispatch]);

    // 문제 리스트 로딩 중
    if ([Status.CLEAR, Status.LOADING].includes(status)) return <Loading />;

    // 문제 리스트 조회 실패
    if (status === Status.ERROR) return <Error />;

    return (
        <MainLayout title="Typing Game" copyright="조서환(SeoHwan Cho)">
            {/* redirect '/' path to main page */}
            <Redirect path="/" to="/game" expect />

            {/* Game Page */}
            <Route path="/game" expect>
                <Game />
            </Route>

            <Route path="/result" expect>
                result
            </Route>

            {/* Not Found Page */}
            <NotFound>
                <NotFoundPage />
            </NotFound>
        </MainLayout>
    );
};

export default Index;
