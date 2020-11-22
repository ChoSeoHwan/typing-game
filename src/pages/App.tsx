import React, { FC } from 'react';

import AppProvider from 'libs/AppProvider';
import { NotFound, Route, Router } from 'libs/router';

import NotFoundPage from 'pages/NotFound';

import MainLayout from 'components/MainLayout';

const App: FC = () => (
    <AppProvider>
        <Router>
            <MainLayout title="Typing Game">
                <Route path="/" expect>
                    game
                </Route>

                <Route path="/result">result</Route>

                {/* Not Found Page */}
                <NotFound>
                    <NotFoundPage />
                </NotFound>
            </MainLayout>
        </Router>
    </AppProvider>
);

export default App;
