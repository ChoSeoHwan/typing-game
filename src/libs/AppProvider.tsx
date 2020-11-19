import React, { FC } from 'react';
import { Provider } from 'react-redux';

import { store } from 'modules';

const AppProvider: FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
);

export default AppProvider;
