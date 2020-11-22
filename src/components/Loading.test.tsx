import React from 'react';

import render from 'libs/testUtils';

import Loading from 'components/Loading';

describe('Components | <Loading />', () => {
    it('로딩 텍스트 존재', () => {
        const { getByText } = render(<Loading />);

        expect(
            getByText('문제 리스트를 가져오는 중입니다...')
        ).toBeInTheDocument();
    });
});
