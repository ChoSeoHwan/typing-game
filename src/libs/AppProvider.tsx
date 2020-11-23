import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import { GlobalStyle } from 'styles/GlobalStyle';
import { globalTheme } from 'styles/Themes';

import { store } from 'modules';

const AppProvider: FC = ({ children }) => (
    <Provider store={store}>
        <ThemeProvider theme={globalTheme}>
            <Global styles={GlobalStyle} />
            {children}
        </ThemeProvider>
    </Provider>
);

export default AppProvider;
