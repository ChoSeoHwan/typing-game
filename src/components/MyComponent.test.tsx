import React from 'react';
import { fireEvent } from '@testing-library/dom';

import render from 'libs/testUtils';

import MyComponent from 'components/MyComponent';

describe('Components | <MyComponent />', () => {
    const text = 'SeoHwan Cho';

    const renderComponent = () => render(<MyComponent text={text} />);

    it('기본 정보 텍스트 노출', () => {
        const { getByText } = renderComponent();

        const component = getByText('This is Test Component');

        expect(component).toBeInTheDocument();
    });

    it('버튼 클릭 시 등록한 텍스트 노출', async () => {
        const { getByText, findByText } = renderComponent();

        const button = getByText('click button');
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        const textBox = await findByText(text, undefined, {
            timeout: 3000
        });

        expect(textBox).toBeInTheDocument();
    });
});
