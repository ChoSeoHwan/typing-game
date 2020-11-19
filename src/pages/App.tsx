import React, { FC } from 'react';

import AppProvider from 'libs/AppProvider';

import MyComponent from 'components/MyComponent';

const App: FC = () => (
    <AppProvider>
        <h1>This is Typing Game. SeoHwan Cho</h1>
        <MyComponent text={'SeoHwan Cho'} />
    </AppProvider>
);

export default App;
