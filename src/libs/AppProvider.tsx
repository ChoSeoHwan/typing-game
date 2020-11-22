import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Global, ThemeProvider, useTheme } from '@emotion/react';

import { GlobalStyle } from 'styles/GlobalStyle';
import { GlobalTheme, globalTheme } from 'styles/Themes';

import { store } from 'modules';

const GlobalStyles = () => {
    const theme = useTheme();
    return <Global styles={GlobalStyle(theme as GlobalTheme)} />;
};

const AppProvider: FC = ({ children }) => (
    <Provider store={store}>
        <ThemeProvider theme={globalTheme}>
            <GlobalStyles />
            {children}
        </ThemeProvider>
    </Provider>
);

export default AppProvider;
