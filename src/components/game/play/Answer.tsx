import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/core';

import { changeColor } from 'styles/keyframes';

import styled from 'libs/styled';

import { playAction } from 'modules/PlayModule';

interface QuestionTextProps {
    effect: boolean;
}

const QuestionText = styled.p<QuestionTextProps>`
    font-size: 4rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primaryText};
    text-align: center;

    margin-bottom: 10px;

    ${({ effect, theme }) =>
        effect &&
        css`
            animation: ${changeColor('#e74c3c', theme.colors.primaryText)} 1s
                ease;
        `}
`;

const AnswerInput = styled.input`
    font-size: 3rem;
    text-align: center;

    width: 300px;

    background: none;
    color: ${({ theme }) => theme.colors.secondaryText};

    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.secondaryText};

    &:active,
    &:focus {
        outline: none;
    }
`;

interface AnswerProps {
    text: string;
}

const Answer: FC<AnswerProps> = ({ text }: AnswerProps) => {
    const dispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState('');

    // 실패 시 효과
    const [effect, setEffect] = useState(false);

    // 자동 focus
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // 문제 변경 시 input clear
    useEffect(() => {
        setInput('');
    }, [text]);

    // 텍스트 입력
    const handleChangeInput: HTMLAttributes<HTMLInputElement>['onChange'] = (
        event
    ) => {
        const value = event.currentTarget.value;

        setInput(value);
    };

    // enter 입력
    const handleEnterInput: HTMLAttributes<HTMLInputElement>['onKeyPress'] = (
        event
    ) => {
        const key = event.key;

        if (key === 'Enter') {
            // 정답
            if (input.trim().toLowerCase() === text.trim().toLowerCase()) {
                dispatch(playAction.correctAnswer());
                return;
            }

            // 실패 시 input 초기화
            setInput('');
            setEffect(true);

            setTimeout(() => {
                setEffect(false);
            }, 1000);
        }
    };

    return (
        <>
            <QuestionText effect={effect}>{text}</QuestionText>
            <AnswerInput
                ref={inputRef}
                placeholder="텍스트를 입력해주세요."
                value={input}
                onChange={handleChangeInput}
                onKeyPress={handleEnterInput}
            />
        </>
    );
};

export default Answer;
