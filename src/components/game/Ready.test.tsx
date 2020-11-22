import React from 'react';
import { fireEvent } from '@testing-library/dom';

import render from 'libs/testUtils';

import { store } from 'modules';

import Status from 'constants/Status';

import Ready from 'components/game/Ready';

const renderComponent = (): ReturnType<typeof render> & {
    handleStartGame: ReturnType<typeof jest.fn>;
} => {
    const handleStartGame = jest.fn();
    const { ...tester } = render(<Ready onStartGame={handleStartGame} />);

    return {
        handleStartGame,
        ...tester
    };
};

describe('Components | Game | <Ready />', () => {
    it('게임 준비 텍스트 노출', () => {
        const { getByText } = renderComponent();

        expect(
            getByText('게임을 시작하려면 아래 버튼을 눌러주세요.')
        ).toBeInTheDocument();
        expect(getByText('게임 시작')).toBeInTheDocument();
    });

    it('게임 시작 버튼 클릭', () => {
        const { getByText, handleStartGame } = renderComponent();

        fireEvent.click(getByText('게임 시작'));

        expect(handleStartGame).toBeCalled();
    });
});
