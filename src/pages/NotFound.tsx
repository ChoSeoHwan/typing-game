import React, { FC } from 'react';

import { Link } from 'libs/router';
import styled from 'libs/styled';

import Button from 'components/Button';
import SubTitle from 'components/SubTitle';

const NotFoundStyle = styled.div`
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const DescTextStyle = styled.p`
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 1.5rem;
    margin-bottom: 20px;
`;

const NotFound: FC = () => {
    return (
        <NotFoundStyle>
            <SubTitle>페이지를 찾을 수 없습니다.</SubTitle>
            <DescTextStyle>
                메인으로 돌아가려면 아래 버튼을 클릭해 주세요.
            </DescTextStyle>

            <Button to="/">메인으로 돌아가기</Button>
        </NotFoundStyle>
    );
};

export default NotFound;
