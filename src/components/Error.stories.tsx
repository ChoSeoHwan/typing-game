import React from 'react';
import { Story } from '@storybook/react';

import Error from 'components/Error';

export default {
    title: 'Components/Error',
    description: '에러 페이지 컴포넌트',
    component: Error
};

export const DefaultError: Story = () => <Error />;

DefaultError.storyName = 'Default';
