import React from 'react';
import { Story } from '@storybook/react';

import MyComponent, { MyComponentProps } from 'components/MyComponent';

export default {
    title: 'Components/MyComponent',
    component: MyComponent,
    argTypes: {
        text: {
            description: '텍스트',
            control: {
                type: 'text'
            }
        }
    },
    parameters: {
        docs: {
            description: {
                component: '컴포넌트 스토리북 테스트'
            }
        }
    }
};

export const DefaultMyComponent: Story<MyComponentProps> = ({
    text
}: MyComponentProps) => <MyComponent text={text} />;

DefaultMyComponent.args = {
    text: 'test text'
};

DefaultMyComponent.storyName = 'Default';
