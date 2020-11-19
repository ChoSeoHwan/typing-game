import React from 'react';
import { render } from '@testing-library/react';

import MyComponent from 'components/MyComponent';

describe('Components | <MyComponent />', () => {
    const text = 'SeoHwan Cho';

    it('should have text', () => {
        const { getByText } = render(<MyComponent text={text} />);

        const component = getByText(text);

        expect(component).toBeInTheDocument();
    });
});
