import React from 'react';
import { Story } from '@storybook/react';

import MainLayout from 'components/MainLayout';

export default {
    title: 'Components/MainLayout',
    component: MainLayout
};

interface DefaultMainLayoutProps {
    title: string;
    copyright: string;
}

export const DefaultMainLayout: Story<DefaultMainLayoutProps> = ({
    title,
    copyright
}: DefaultMainLayoutProps) => (
    <MainLayout title={title} copyright={copyright}>
        children
    </MainLayout>
);

DefaultMainLayout.storyName = 'Default';

DefaultMainLayout.args = {
    title: 'Title Name',
    copyright: 'SeoHwan Cho'
};
