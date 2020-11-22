import React from 'react';
import { Story } from '@storybook/react';

import Error from 'components/game/Error';

export default {
    title: 'Components/Game/Error',
    description: 'Game 페이지 에러 컴포넌트',
    component: Error
};

export const DefaultError: Story = () => <Error />;

DefaultError.storyName = 'Default';
