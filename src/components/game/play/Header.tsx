import React, { FC, useEffect, useState } from 'react';
import { css } from '@emotion/core';

import { changeColor } from 'styles/keyframes';

import styled from 'libs/styled';

const HeaderStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const InfoText = styled.span`
    font-size: 1.7rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.secondaryText};
`;

interface ScoreTextProps {
    effect: boolean;
}

const ScoreText = styled.span<ScoreTextProps>`
    ${({ effect, theme }) =>
        effect &&
        css`
            animation: ${changeColor('#e74c3c', theme.colors.secondaryText)}
                0.7s ease-out;
        `}
`;

interface HeaderProps {
    second: number;
    score: number;
}

const Header: FC<HeaderProps> = ({ score, second }: HeaderProps) => {
    const [effect, setEffect] = useState(false);

    useEffect(() => {
        setEffect(true);

        setTimeout(() => {
            setEffect(false);
        }, 700);
    }, [score]);

    return (
        <HeaderStyle>
            <InfoText>
                남은 시간 :
                <span data-testid="components-game-play-header-second">
                    {second}
                </span>
            </InfoText>
            <InfoText>
                점수 : <ScoreText effect={effect}>{score}</ScoreText>
            </InfoText>
        </HeaderStyle>
    );
};

export default Header;
