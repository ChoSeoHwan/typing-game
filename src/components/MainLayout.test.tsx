import React from 'react';

import render from 'libs/testUtils';

import MainLayout from 'components/MainLayout';

const title = 'This is Title';
const childrenText = 'Children Text';

const renderComponent = () =>
    render(
        <MainLayout title={title}>
            <div>{childrenText}</div>
        </MainLayout>
    );

describe('Components | <MainLayout />', () => {
    it('제목 포함', () => {
        const { getByText } = renderComponent();

        const titleComponent = getByText(title);
        expect(titleComponent).toBeInTheDocument();
    });

    it('children 포함', () => {
        const { getByText } = renderComponent();

        const childrenComponent = getByText(childrenText);
        expect(childrenComponent).toBeInTheDocument();
    });
});
