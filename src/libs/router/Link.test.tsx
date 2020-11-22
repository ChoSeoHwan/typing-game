import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { createMemoryHistory, History } from 'history';

import { Link, Router } from 'libs/router';
import render from 'libs/testUtils';

const pages = [
    { url: '/main', text: 'Go Main' },
    { url: '/sub', text: 'Go Sub' },
    { url: '/intro', text: 'Go Intro' }
];

const renderComponent = (): ReturnType<typeof render> & {
    history: History;
    handleClick: ReturnType<typeof jest.fn>;
} => {
    const history = createMemoryHistory();

    const handleClick = jest.fn();

    const tester = render(
        <Router history={history}>
            {pages.map(({ text, url }) => (
                <Link to={url} key={url} onClick={handleClick}>
                    {text}
                </Link>
            ))}
        </Router>
    );

    return {
        ...tester,
        history,
        handleClick
    };
};

describe('Libs | Router | <Link />', () => {
    it('Link 클릭 시 페이지 이동', () => {
        const { getByText, history } = renderComponent();

        pages.forEach(({ url, text }) => {
            const linkComponent = getByText(text);
            fireEvent.click(linkComponent);
            expect(history.location.pathname).toBe(url);
        });
    });

    it('Link 클릭 시 onClick 이벤트 발동', () => {
        const { getByText, handleClick } = renderComponent();

        const linkComponent = getByText('Go Main');

        fireEvent.click(linkComponent);
        expect(handleClick).toBeCalled();
    });
});
