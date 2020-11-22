import React from 'react';
import { Story } from '@storybook/react';

import { Route, Router } from 'libs/router';

import Screen from 'components/game/Screen';

export default {
    title: 'Components/Game/Screen',
    description: 'Game 페이지의 게임 관리 컴포넌트',
    component: Screen
};

export const DefaultScreen: Story = () => (
    <Router>
        <Screen />

        <Route path="/result">게임 결과</Route>
    </Router>
);

DefaultScreen.storyName = 'Default';
