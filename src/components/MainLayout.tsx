import React, { FC, PropsWithChildren } from 'react';

import styled from 'libs/styled';

const MainLayoutStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;

    background-color: ${({ theme }) => theme.colors.bodyBackground};
`;

const WrapperStyle = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 500px;
    min-width: 300px;
`;

const TitleStyle = styled.h1`
    font-weight: bold;
    font-size: 4rem;
    color: ${({ theme }) => theme.colors.primaryText};
    text-align: center;

    margin-bottom: 20px;
`;

const ContentWrapperStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    height: 300px;
    padding: 8px;
    box-sizing: border-box;

    background: ${({ theme }) => theme.colors.contentBackground};

    box-shadow: 0 0 10px -5px ${({ theme }) => theme.colors.contentShadow};
`;

interface MainLayoutProps {
    title: string;
}

const MainLayout: FC<MainLayoutProps> = ({
    children,
    title
}: PropsWithChildren<MainLayoutProps>) => {
    return (
        <MainLayoutStyle>
            <WrapperStyle>
                <TitleStyle>{title}</TitleStyle>
                <ContentWrapperStyle>{children}</ContentWrapperStyle>
            </WrapperStyle>
        </MainLayoutStyle>
    );
};

export default MainLayout;
