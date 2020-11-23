import React, { FC, useEffect, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { useHistory } from 'libs/router';
import styled from 'libs/styled';

import { RootReducerState } from 'modules';

import Status from 'constants/Status';

import Button from 'components/Button';
import SubTitle from 'components/SubTitle';

const ResultStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;
`;

const ScoreText = styled(SubTitle)`
    font-size: 2.8rem;
`;

const AverageSecondText = styled.p`
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 1.5rem;
    font-weight: bold;

    margin: 10px 0;
`;

const GameRestartButton = styled(Button)`
    font-size: 2rem;
    padding: 10px 30px;
    margin-top: 20px;
`;

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

    // 평균 답변 시간 계산
    const averageSecond = useMemo(() => {
        const averageSecond =
            seconds.length > 0
                ? seconds.reduce((current, next) => current + next) /
                  seconds.length
                : 0;

        return Math.floor(averageSecond * 10) / 10;
    }, [seconds]);

    return (
        <ResultStyle>
            {/* 최종 결과 */}
            <ScoreText>
                당신의 점수는 <span>{score}</span>점 입니다.
            </ScoreText>

            {/* 평균 답변 시간 */}
            <AverageSecondText>
                단어당 평균 답변 시간은 {averageSecond}초입니다.
            </AverageSecondText>

            {/* 다시 시작 버튼 */}
            <GameRestartButton to="/">다시 시작</GameRestartButton>
        </ResultStyle>
    );
};

export default Result;
