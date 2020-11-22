import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'libs/styled';

import { questionsAction } from 'modules/QuestionsModule';

import Button from 'components/Button';
import SubTitle from 'components/SubTitle';

const ErrorStyle = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100%;
`;

const ResetButton = styled(Button)`
    margin-top: 10px;
`;

const Error: FC = () => {
    const dispatch = useDispatch();

    const handleResetQuestion = () => {
        dispatch(questionsAction.resetQuestions());
    };

    return (
        <ErrorStyle>
            <SubTitle>문제 리스트를 가져오지 못하였습니다.</SubTitle>
            <ResetButton onClick={handleResetQuestion}>재시도</ResetButton>
        </ErrorStyle>
    );
};

export default Error;
