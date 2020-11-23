import React from 'react';

import render from 'libs/testUtils';

import SubTitle from 'components/SubTitle';

describe('Components | <SubTitle />', () => {
    it('텍스트 존재', () => {
        const { getByText } = render(<SubTitle>서브 타이틀</SubTitle>);

        expect(getByText('서브 타이틀')).toBeInTheDocument();
    });
});
