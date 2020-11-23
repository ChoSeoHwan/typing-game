import React, { ReactElement } from 'react';
import { Story } from '@storybook/react';

import { Link, NotFound, Route, Router, useLocation } from 'libs/router';

export default {
    title: 'Libraries/Router/NotFound',
    description: '경로에 해당하는 Route 가 없을 경우 노출할 페이지',
    component: NotFound,
    decorators: [
        (Story: Story): ReactElement => (
            <Router>
                <Story />
            </Router>
        )
    ]
};

export const DefaultNotFound: Story = () => <NotFound>Not Found Page</NotFound>;

DefaultNotFound.storyName = 'Default';

export const ExampleNotFound: Story = () => {
    const location = useLocation();

    return (
        <>
            <p>current pathname: {location.pathname}</p>

            <ul>
                <li>
                    <Link to="/main">Go Main</Link>
                </li>
                <li>
                    <Link to="/sub1">Go Sub 1</Link>
                </li>
                <li>
                    <Link to="/sub2">Go Sub 2</Link>
                </li>
                <li>
                    <Link to={`/unknown${Math.floor(Math.random() * 10)}`}>
                        Go Undefined Page
                    </Link>
                </li>
            </ul>

            <div>
                <Route path="/main">Main Page</Route>

                <Route path="/sub1">Sub1 Page</Route>

                <Route path="/sub2">Sub2 Page</Route>

                <NotFound>Not Found Page</NotFound>
            </div>
        </>
    );
};

ExampleNotFound.storyName = 'Example';
