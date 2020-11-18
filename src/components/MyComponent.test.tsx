import React from 'react';
import { render } from '@testing-library/react';

import MyComponent from 'components/MyComponent';

describe('Components | <MyComponent />', () => {
    it('should have text', () => {
        const { getByText } = render(<MyComponent />);

        const text = getByText('This is Test Component');

        expect(text).toBeInTheDocument();
    });
});
