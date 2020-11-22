import React, { FC } from 'react';

import AppProvider from 'libs/AppProvider';
import { NotFound, Redirect, Route, Router } from 'libs/router';

import Game from 'pages/game';
import NotFoundPage from 'pages/NotFound';

import MainLayout from 'components/MainLayout';

const App: FC = () => (
    <AppProvider>
        <Router>
            <MainLayout title="Typing Game">
                {/* redirect '/' path to main page */}
                <Redirect path="/" to="/game" expect />

                {/* Game Page */}
                <Route path="/game" expect>
                    <Game />
                </Route>

                <Route path="/result" expect>
                    result
                </Route>

                {/* Not Found Page */}
                <NotFound>
                    <NotFoundPage />
                </NotFound>
            </MainLayout>
        </Router>
    </AppProvider>
);

export default App;
