import React from 'react';
import { fireEvent } from '@testing-library/dom';

import render, { axiosMock } from 'libs/testUtils';

import { store } from 'modules';
import { questionsAction } from 'modules/QuestionsModule';

import Status from 'constants/Status';

import Error from 'components/game/Error';

describe('Components | Game | <Error />', () => {
    it('오류 텍스트 및 재시도 버튼 노출', () => {
        const { getByText } = render(<Error />);

        expect(
            getByText('문제 리스트를 가져오지 못하였습니다.')
        ).toBeInTheDocument();
        expect(getByText('재시도')).toBeInTheDocument();
    });

    it('재시도 버튼 클릭 시 question reducer 초기화', () => {
        const axios = axiosMock();
        axios.onGet('/kakaopay-fe/resources/words').networkError();

        store.dispatch(questionsAction.fetchQuestions());

        const { getByText } = render(<Error />);

        const resetButton = getByText('재시도');
        fireEvent.click(resetButton);

        expect(store.getState().questionsReducer.status).toBe(Status.CLEAR);
    });
});
