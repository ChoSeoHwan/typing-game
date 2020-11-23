import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import Question from 'types/data/Question';

import Play from 'components/game/Play';

export default {
    title: 'Components/Game/Play',
    description: '게임 실행 컴포넌트',
    component: Play,
    argTypes: {
        questions: {
            description: '문제 리스트'
        },
        score: {
            description: '현재 점수'
        },
        onLose: {
            description: '정답 입력 실패(시간 초과) 시 실행할 이벤트'
        },
        onEnd: {
            description: '모든 게임 종료 시 실행할 이벤트'
        },
        onReset: {
            description: '게임 초기화 이벤트'
        }
    }
};

const questions: Question[] = [
    {
        second: 10,
        text: 'text1'
    },
    {
        second: 5,
        text: 'text2'
    },
    {
        second: 8,
        text: 'text3'
    },
    {
        second: 2,
        text: 'text'
    }
];

export const DefaultPlay: Story = () => {
    return (
        <Play
            questions={questions}
            score={questions.length}
            onLose={action('lose game')}
            onEnd={action('end game')}
            onReset={action('reset game')}
        />
    );
};

DefaultPlay.storyName = 'Default';
