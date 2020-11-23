import React, { FC, HTMLAttributes } from 'react';

import styled from 'libs/styled';

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

interface ReadyProps {
    onStartGame: HTMLAttributes<HTMLButtonElement>['onClick'];
}

const Ready: FC<ReadyProps> = ({ onStartGame }: ReadyProps) => (
    <ReadyStyle data-testid="game-ready">
        <SubTitle>게임을 시작하려면 아래 버튼을 눌러주세요.</SubTitle>
        <GameStartButton onClick={onStartGame}>시작</GameStartButton>
    </ReadyStyle>
);

export default Ready;
