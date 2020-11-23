import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { createMemoryHistory } from 'history';

import { Router } from 'libs/router';
import render from 'libs/testUtils';

import Button from 'components/Button';

describe('Components | Atoms | <Button />', () => {
    const text = 'text';

    it('children 등록', () => {
        const { getByText } = render(<Button>{text}</Button>);

        expect(getByText(text)).toHaveTextContent(text);
    });

    it('link 기능 정상 동작', () => {
        const history = createMemoryHistory();

        const { getByText } = render(
            <Router history={history}>
                <Button to="/test">Go Test</Button>
            </Router>
        );

        const linkComponent = getByText('Go Test');
        fireEvent.click(linkComponent);

        expect(history.location.pathname).toBe('/test');
    });

    it('onClick 이벤트 정상 동작', () => {
        const handleClick = jest.fn();
        const { getByText } = render(
            <Button onClick={handleClick}>{text}</Button>
        );

        fireEvent.click(getByText(text));

        expect(handleClick).toBeCalled();
    });
});
