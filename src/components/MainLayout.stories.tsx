import React from 'react';
import { Story } from '@storybook/react';

import MainLayout from 'components/MainLayout';

export default {
    title: 'Components/MainLayout',
    component: MainLayout
};

interface DefaultMainLayoutProps {
    title: string;
}

export const DefaultMainLayout: Story<DefaultMainLayoutProps> = ({
    title
}: DefaultMainLayoutProps) => <MainLayout title={title}>children</MainLayout>;

DefaultMainLayout.storyName = 'Default';

DefaultMainLayout.args = {
    title: 'Title Name'
};
