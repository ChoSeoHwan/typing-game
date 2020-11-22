import React from 'react';
import { createMemoryHistory, History } from 'history';

import { Route, Router } from 'libs/router';
import render from 'libs/testUtils';

import { store } from 'modules';
import { storeAction } from 'modules/StoreModule';

const pages = [
    {
        url: '/main',
        text: 'Main Page'
    },
    {
        url: '/introduction',
        text: 'Introduction Page'
    },
    {
        url: '/sub',
        text: 'Sub Page'
    },
    {
        url: '/shopping',
        text: 'Shopping Page'
    }
];

const renderComponent = (): ReturnType<typeof render> & {
    history: History;
} => {
    const history = createMemoryHistory();

    const tester = render(
        <Router history={history}>
            <h1>This is Header</h1>

            {pages.map(({ url, text }) => (
                <Route path={url} key={url}>
                    <p>{text}</p>
                </Route>
            ))}
        </Router>
    );

    return {
        ...tester,
        history
    };
};

describe('Libs | Router | <Route />', () => {
    beforeEach(() => {
        store.dispatch(storeAction.resetStore());
    });

    it('Route 밖에 있는 텍스트 항시 노출', () => {
        const { history, getByText } = renderComponent();

        let headerComponent = getByText('This is Header');
        expect(headerComponent).toBeInTheDocument();

        history.push('/unknown');

        headerComponent = getByText('This is Header');
        expect(headerComponent).toBeInTheDocument();
    });

    it('각 url 에 맞는 페이지 노출', () => {
        const { history, getByText } = renderComponent();

        pages.forEach(({ url, text }) => {
            history.push(url);

            const pageComponent = getByText(text);
            expect(pageComponent).toBeInTheDocument();
        });
    });

    it('각 url 에 맞지 않은 페이지 비노출', () => {
        const { history, queryByText } = renderComponent();

        pages.forEach(({ url }) => {
            history.push(url);

            pages
                .filter(({ url: pageUrl }) => pageUrl !== url)
                .forEach(({ text }) => {
                    const emptyComponent = queryByText(text);
                    expect(emptyComponent).toBeNull();
                });
        });
    });
});
