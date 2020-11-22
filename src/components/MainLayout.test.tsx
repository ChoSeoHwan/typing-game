import React from 'react';

import render from 'libs/testUtils';

import MainLayout from 'components/MainLayout';

const title = 'This is Title';
const copyright = 'SeoHwan Cho';
const childrenText = 'Children Text';

const renderComponent = () =>
    render(
        <MainLayout title={title} copyright={copyright}>
            <div>{childrenText}</div>
        </MainLayout>
    );

describe('Components | <MainLayout />', () => {
    it('제목, copyright 포함', () => {
        const { getByText } = renderComponent();

        expect(getByText(title)).toBeInTheDocument();
        expect(getByText(copyright)).toBeInTheDocument();
    });

    it('children 포함', () => {
        const { getByText } = renderComponent();

        const childrenComponent = getByText(childrenText);
        expect(childrenComponent).toBeInTheDocument();
    });
});
