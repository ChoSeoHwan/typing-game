import React, { FC, useCallback, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'libs/router';

import { RootReducerState } from 'modules';
import { gameAction } from 'modules/GameModule';

import Status from 'constants/Status';

import Play from 'components/game/Play';
import Ready from 'components/game/Ready';

const Game: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // 현재 게임 데이터 조회
    const { status, score } = useSelector<
        RootReducerState,
        Pick<RootReducerState['gameReducer'], 'status' | 'score'>
    >(
        ({ gameReducer }) => ({
            status: gameReducer.status,
            score: gameReducer.score
        }),
        shallowEqual
    );

    // 질문 리스트 조회
    const questions = useSelector<
        RootReducerState,
        RootReducerState['questionsReducer']['data']
    >(({ questionsReducer }) => questionsReducer.data);

    // 게임 페이지 최초 진입 시 게인 기록 초기화
    useEffect(() => {
        dispatch(gameAction.resetGame());
    }, [dispatch]);

    // 게임 완료 시 결과 창으로 이동
    useEffect(() => {
        if (status === Status.SUCCESS) {
            history.push('/result');
        }
    }, [status, history]);

    // 게임 시작 이벤트
    const handleStartGame = useCallback(() => {
        dispatch(gameAction.startGame(questions.length));
    }, [dispatch, questions]);

    // 점수 변경
    const handleSetScore = useCallback(
        (score) => () => {
            dispatch(gameAction.setScore(score));
        },
        [dispatch]
    );

    return (
        <>
            {/* 게임 준비 페이지 */}
            {status === Status.CLEAR && <Ready onStartGame={handleStartGame} />}

            {/* 게임 플레이 페이지 */}
            {status === Status.LOADING && (
                <Play
                    questions={questions}
                    score={score}
                    onLose={handleSetScore(score - 1)}
                    onWin={handleSetScore(score + 1)}
                />
            )}
        </>
    );
};

export default Game;
