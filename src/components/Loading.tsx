import React, { FC } from 'react';

import { changeColor } from 'styles/keyframes';

import styled from 'libs/styled';

const LoadingStyle = styled.article`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;

    height: 100%;
`;

const LoadingText = styled.div`
    text-align: center;

    font-weight: bold;
    font-size: 2rem;

    color: ${({ theme }) => theme.colors.primaryText};

    animation: ${({ theme }) =>
            changeColor(theme.colors.primaryText, theme.colors.lightText)}
        1s ease infinite alternate;
`;

const Loading: FC = () => {
    return (
        <LoadingStyle>
            <LoadingText>문제 리스트를 가져오는 중입니다...</LoadingText>
        </LoadingStyle>
    );
};

export default Loading;
