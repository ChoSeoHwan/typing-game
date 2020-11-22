import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'libs/styled';

import { gameAction } from 'modules/GameModule';

import Button from 'components/Button';
import SubTitle from 'components/SubTitle';

const ReadyStyle = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100%;
`;

const GameStartButton = styled(Button)`
    font-size: 2rem;
    padding: 10px 30px;
    margin-top: 20px;
`;

const Ready: FC = () => {
    const dispatch = useDispatch();

    // 게임 시작
    const handleStartGame = () => {
        dispatch(gameAction.startGame());
    };

    return (
        <ReadyStyle data-testid="game-ready">
            <SubTitle>게임을 시작하려면 아래 버튼을 눌러주세요.</SubTitle>
            <GameStartButton onClick={handleStartGame}>
                게임 시작
            </GameStartButton>
        </ReadyStyle>
    );
};

export default Ready;
