import React, { FC } from 'react';

import AppProvider from 'libs/AppProvider';
import { Link, Route, Router } from 'libs/router';

import MyComponent from 'components/MyComponent';

const App: FC = () => (
    <AppProvider>
        <Router>
            <h1>This is Typing Game. SeoHwan Cho</h1>
            <Link to={'/'}>goHome</Link>
            <br />
            <Link to={'/game'}>goGame</Link>
            <br />
            <Link to={'/result'}>goResult</Link>

            <Route path="/" expect>
                <p>Home</p>
            </Route>

            <Route path="/game">
                <MyComponent text={'SeoHwan Cho'} />
            </Route>

            <Route path="/result">
                <p>result</p>
            </Route>
        </Router>
    </AppProvider>
);

export default App;
