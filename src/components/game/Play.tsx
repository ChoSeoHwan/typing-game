import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Question from 'types/data/Question';

import styled from 'libs/styled';

import { RootReducerState } from 'modules';
import { playAction } from 'modules/PlayModule';

import Status from 'constants/Status';

import Button from 'components/Button';
import Answer from 'components/game/play/Answer';
import Header from 'components/game/play/Header';

const PlayStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;

    height: 100%;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const GameRestartButton = styled(Button)`
    font-size: 2rem;
    padding: 10px 30px;
    margin-top: 20px;
`;

interface PlayProps {
    questions: Question[];
    score: number;
    onLose: () => void;
    onWin: (second: number) => void;
    onEnd: () => void;
    onReset: () => void;
}

const Play: FC<PlayProps> = ({
    questions,
    score,
    onLose,
    onWin,
    onEnd,
    onReset
}: PlayProps) => {
    const dispatch = useDispatch();

    const [index, setIndex] = useState(0);

    // 현재 문제 데이터 조회
    const { status, remainSecond, question } = useSelector<
        RootReducerState,
        RootReducerState['playReducer']
    >(({ playReducer }) => ({
        status: playReducer.status,
        remainSecond: playReducer.remainSecond,
        question: playReducer.question
    }));

    // 게임 시작 시 기존 데이터 초기화
    useEffect(() => {
        dispatch(playAction.resetPlay());
    }, [dispatch]);

    // 문제 등록
    useEffect(() => {
        if (status === Status.CLEAR) {
            // 마지막 문제까지 완료 시 게임 종료
            if (index === questions.length) {
                onEnd();
                return;
            }

            dispatch(playAction.startPlay(questions[index]));
        }
    }, [status, index, questions, onEnd, dispatch]);

    // 성공, 실패 시 처리
    useEffect(() => {
        if ([Status.SUCCESS, Status.ERROR].includes(status)) {
            // 실패 시 onLose 실행
            if (status === Status.ERROR) onLose();

            // 성공 시 onWin 실행
            if (status === Status.SUCCESS)
                onWin((question?.second || remainSecond) - remainSecond);

            // 다음 문제
            setIndex((index) => index + 1);
            dispatch(playAction.resetPlay());
        }
    }, [status, question, remainSecond, onLose, onWin, dispatch]);

    return (
        <PlayStyle>
            <Header second={remainSecond} score={score} />
            <Body>
                <Answer text={question?.text || ''} />
                <GameRestartButton onClick={onReset}>초기화</GameRestartButton>
            </Body>
        </PlayStyle>
    );
};

export default Play;
