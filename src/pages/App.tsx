import React, { FC } from 'react';

import AppProvider from 'libs/AppProvider';
import { NotFound, Route, Router } from 'libs/router';

import MainLayout from 'components/MainLayout';

const App: FC = () => (
    <AppProvider>
        <Router>
            <MainLayout title="Typing Game">
                <Route path="/" expect>
                    game
                </Route>

                <Route path="/result">result</Route>

                <NotFound>Not Found</NotFound>
            </MainLayout>
        </Router>
    </AppProvider>
);

export default App;
