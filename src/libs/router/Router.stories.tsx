import React from 'react';
import { Story } from '@storybook/react';

import { Link, Route, Router, useLocation } from 'libs/router';
import NotFound from 'libs/router/NotFound';

export default {
    title: 'Libraries/Router',
    component: Router,
    parameters: {
        docs: {
            description: {
                component: 'Router 라이브러리'
            }
        }
    }
};

const SubPage = () => {
    return <p>Sub Page</p>;
};

export const ExampleRouter: Story = () => {
    const location = useLocation();

    return (
        <Router>
            <h1>Router Library Example</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Main</Link>
                    </li>
                    <li>
                        <Link to="/intro">Introduction</Link>
                    </li>
                    <li>
                        <Link to="/sub1">SubPage1</Link>
                    </li>
                    <li>
                        <Link to="/sub2">SubPage2</Link>
                    </li>
                    <li>
                        <Link to={`/unknown${Math.floor(Math.random() * 10)}`}>
                            unknown page
                        </Link>
                    </li>
                </ul>
            </nav>
            <p>current page : {location.pathname}</p>

            <div>
                {/* main page */}
                <Route path="/" expect>
                    Main Page
                </Route>

                {/* introduction page */}
                <Route path="/intro" expect>
                    Introduction Page
                </Route>

                {/* sub page 1 */}
                <Route path="/sub1" expect>
                    <SubPage />
                </Route>

                {/* sub page 2 */}
                <Route path="/sub2" expect>
                    Sub Page 2
                </Route>

                <NotFound>
                    <h2>This is not found page</h2>
                </NotFound>
            </div>
        </Router>
    );
};

ExampleRouter.storyName = '[Example]';
