import React, { FC } from 'react';

import AppProvider from 'libs/AppProvider';
import { Router } from 'libs/router';

import Index from 'pages';

import MainLayout from 'components/MainLayout';

const App: FC = () => (
    <AppProvider>
        <Router>
            <MainLayout title="Typing Game" copyright="조서환(SeoHwan Cho)">
                <Index />
            </MainLayout>
        </Router>
    </AppProvider>
);

export default App;
