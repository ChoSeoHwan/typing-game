import React from 'react';
import { Story } from '@storybook/react';

import SubTitle from 'components/SubTitle';

export default {
    title: 'Components/SubTitle',
    description: '페이지 내 서브 타이틀 컴포넌트',
    component: SubTitle
};

export const DefaultSubTitle: Story = () => <SubTitle>Sub Title</SubTitle>;

DefaultSubTitle.storyName = 'Default';
