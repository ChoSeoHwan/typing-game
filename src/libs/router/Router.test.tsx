import React from 'react';
import { createMemoryHistory, History } from 'history';

import { Router, useLocation } from 'libs/router';
import render from 'libs/testUtils';

const ShowPathComponent = () => {
    const location = useLocation();

    return <p>{location.pathname}</p>;
};

const renderComponent = (): ReturnType<typeof render> & {
    history: History;
} => {
    const history = createMemoryHistory();

    const { ...tester } = render(
        <Router history={history}>
            <ShowPathComponent />
        </Router>
    );
    return {
        ...tester,
        history
    };
};

describe('Libs | Router | <Router />', () => {
    it('Router 사용 시 history 등록', () => {
        const { getByText, history } = renderComponent();

        const currentPath = history.location.pathname;

        const pathComponent = getByText(currentPath);
        expect(pathComponent).toBeInTheDocument();
    });

    it('경로 변경 시 등록 된 history 갱신', () => {
        const { getByText, history } = renderComponent();

        history.push('/text');

        const currentPath = history.location.pathname;

        const pathComponent = getByText(currentPath);
        expect(pathComponent).toBeInTheDocument();
    });
});
