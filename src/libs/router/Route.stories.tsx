import React from 'react';
import { Story } from '@storybook/react';

import { Route, Router } from 'libs/router';

export default {
    title: 'Libraries/Router/Route',
    component: Route,
    argTypes: {
        path: {
            description: '매칭될 경로'
        },
        expect: {
            description: '완벽 매칭 여부'
        }
    }
};

export const DefaultRoute: Story = () => (
    <Router>
        <Route path="/">Main</Route>
    </Router>
);

DefaultRoute.storyName = 'Default';
