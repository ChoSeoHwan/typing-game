import React, { FC } from 'react';

import AppProvider from 'libs/AppProvider';
import { Router } from 'libs/router';

import Index from 'pages';

const App: FC = () => (
    <AppProvider>
        <Router>
            <Index />
        </Router>
    </AppProvider>
);

export default App;
