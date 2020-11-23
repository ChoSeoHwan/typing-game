import React from 'react';
import { fireEvent } from '@testing-library/react';
import Question from 'types/data/Question';

import render from 'libs/testUtils';

import Play from 'components/game/Play';

const questions: Question[] = [
    {
        second: 1,
        text: 'text1'
    },
    {
        second: 5,
        text: 'text2'
    },
    {
        second: 8,
        text: 'text3'
    },
    {
        second: 2,
        text: 'text'
    }
];

const renderComponent = (): ReturnType<typeof render> & {
    handleLose: ReturnType<typeof jest.fn>;
    handleWin: ReturnType<typeof jest.fn>;
    handleEnd: ReturnType<typeof jest.fn>;
    handleReset: ReturnType<typeof jest.fn>;
} => {
    const handleLose = jest.fn();
    const handleWin = jest.fn();
    const handleEnd = jest.fn();
    const handleReset = jest.fn();

    const { ...tester } = render(
        <Play
            questions={questions}
            score={questions.length}
            onLose={handleLose}
            onWin={handleWin}
            onEnd={handleEnd}
            onReset={handleReset}
        />
    );

    return {
        ...tester,
        handleLose,
        handleEnd,
        handleReset
    };
};

describe('Components | Games | <Play />', () => {
    it('questions 리스트에 있는 텍스트로 게임 진행', () => {
        const {
            getByPlaceholderText,
            getByText,
            getByTestId,
            handleEnd,
            handleWin
        } = renderComponent();

        const inputComponent = getByPlaceholderText('텍스트를 입력해주세요.');

        questions.forEach((question) => {
            expect(getByText(question.text)).toBeInTheDocument();
            expect(
                getByTestId('components-game-play-header-second')
            ).toHaveTextContent(question.second + '');

            fireEvent.change(inputComponent, {
                target: { value: question.text }
            });
            fireEvent.keyPress(inputComponent, {
                key: 'Enter',
                code: 'Enter',
                charCode: 13
            });
        });

        expect(handleWin).toBeCalledTimes(questions.length);
        expect(handleEnd).toBeCalled();
    });

    it('초기화 버튼 클릭', () => {
        const { getByText, handleReset } = renderComponent();

        fireEvent.click(getByText('초기화'));

        expect(handleReset).toBeCalled();
    });
});
