import React from 'react';
import { createMemoryHistory, History } from 'history';

import { NotFound, Route, Router } from 'libs/router';
import render from 'libs/testUtils';

import { store } from 'modules';
import { storeAction } from 'modules/StoreModule';

const renderComponent = (): ReturnType<typeof render> & {
    history: History;
} => {
    const history = createMemoryHistory();

    const tester = render(
        <Router history={history}>
            <h1>This is Header</h1>

            <Route path="/" expect>
                <p>Home</p>
            </Route>

            <Route path="/main">
                <p>Main</p>
            </Route>

            <NotFound>
                <p>Not Found Page</p>
            </NotFound>
        </Router>
    );

    return {
        ...tester,
        history
    };
};

describe('Libs | Router | <NotFound />', () => {
    beforeEach(() => {
        store.dispatch(storeAction.resetStore());
    });

    it('Route 에 매칭되지 않은 url 일 경우 Not Found 페이지 노출', () => {
        const { history, getByText } = renderComponent();

        history.push('/unknown');

        const notFoundComponent = getByText('Not Found Page');
        expect(notFoundComponent).toBeInTheDocument();
    });

    it('Route 에 매칭된 url 일 경우 Not Found 페이지 비노출', () => {
        const { history, queryByText } = renderComponent();

        history.push('/');

        let notFoundComponent = queryByText('Not Found Page');
        expect(notFoundComponent).toBeNull();

        history.push('/main');

        notFoundComponent = queryByText('Not Found Page');
        expect(notFoundComponent).toBeNull();
    });
});
