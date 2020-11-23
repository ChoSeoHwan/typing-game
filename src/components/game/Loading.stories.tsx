import React from 'react';
import { Story } from '@storybook/react';

import Loading from 'components/game/Loading';

export default {
    title: 'Components/Game/Loading',
    description: 'Game 페이지 Loading 컴포넌트',
    component: Loading
};

export const DefaultLoading: Story = () => <Loading />;

DefaultLoading.storyName = 'Default';
