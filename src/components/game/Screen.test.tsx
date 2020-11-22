import React from 'react';
import { createMemoryHistory, History } from 'history';

import { Router } from 'libs/router';
import render from 'libs/testUtils';

import { store } from 'modules';
import { gameAction } from 'modules/GameModule';

import Screen from 'components/game/Screen';

const renderComponent = (): ReturnType<typeof render> & {
    history: History;
} => {
    const history = createMemoryHistory();

    const { ...tester } = render(
        <Router history={history}>
            <Screen />
        </Router>
    );

    return {
        ...tester,
        history
    };
};

describe('Components | Game | <Screen />', () => {
    it('준비 페이지 노출', () => {
        const { getByTestId } = renderComponent();

        expect(getByTestId('game-screen-ready')).toBeInTheDocument();
    });

    it('게임 페이지 노출', () => {
        const { getByTestId } = renderComponent();

        store.dispatch(gameAction.startGame());

        expect(getByTestId('game-screen-play')).toBeInTheDocument();
    });
});
