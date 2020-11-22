import React from 'react';
import { createMemoryHistory, History } from 'history';

import { Redirect, Router, useLocation } from 'libs/router';
import render from 'libs/testUtils';

import { store } from 'modules';
import { storeAction } from 'modules/StoreModule';

const ShowPath = () => {
    const location = useLocation();

    return <p>{location.pathname}</p>;
};

const renderComponent = (): ReturnType<typeof render> & {
    history: History;
} => {
    const history = createMemoryHistory();

    const tester = render(
        <Router history={history}>
            <ShowPath />
            <Redirect path="/original" to="/redirect1" />
            <Redirect path="/another" expect to="/redirect2" />
        </Router>
    );

    return {
        ...tester,
        history
    };
};

describe('Libs | Router | <Redirect />', () => {
    beforeEach(() => {
        store.dispatch(storeAction.resetStore());
    });

    it('expect 가 없을 경우 페이지 이동 확인', async () => {
        const { history, findByText } = renderComponent();

        history.push('/original');

        let pathComponent = await findByText('/redirect1', undefined, {
            timeout: 3000
        });
        expect(pathComponent).toBeInTheDocument();

        // 정확히 매칭이 안되어도 페이지 이동
        history.push('/original/test');

        pathComponent = await findByText('/redirect1', undefined, {
            timeout: 3000
        });
        expect(pathComponent).toBeInTheDocument();
    });

    it('expect 가 설정되어있을 경우 페이지 이동 확인', async () => {
        const { history, findByText } = renderComponent();

        history.push('/another');

        let pathComponent = await findByText('/redirect2', undefined, {
            timeout: 3000
        });
        expect(pathComponent).toBeInTheDocument();

        // 정확히 매칭이 안되었을 경우 페이지 이동하면 안됨
        history.push('/another/test');

        pathComponent = await findByText('/another/test', undefined, {
            timeout: 3000
        });
        expect(pathComponent).toBeInTheDocument();
    });
});
