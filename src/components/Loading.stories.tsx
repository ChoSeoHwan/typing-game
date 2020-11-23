import React from 'react';
import { Story } from '@storybook/react';

import Loading from 'components/Loading';

export default {
    title: 'Components/Loading',
    description: 'Loading 컴포넌트',
    component: Loading
};

export const DefaultLoading: Story = () => <Loading />;

DefaultLoading.storyName = 'Default';
