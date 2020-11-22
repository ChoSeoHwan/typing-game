import React from 'react';
import { Story } from '@storybook/react';

import Ready from 'components/game/Ready';

export default {
    title: 'Components/Game/Ready',
    description: 'Game 페이지 내 게임 준비 컴포넌트',
    component: Ready
};

export const DefaultReady: Story = () => <Ready />;

DefaultReady.storyName = 'Default';
