import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

import styled from 'libs/styled';

import Button, { ButtonProps, ButtonType } from 'components/Button';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        type: {
            description: 'button theme type',
            control: {
                type: 'select',
                options: {
                    FULLED: ButtonType.FULLED,
                    OUTLINE: ButtonType.OUTLINE,
                    ICON: ButtonType.ICON
                }
            }
        }
    },
    parameters: {
        docs: {
            description: {
                component: '기본 버튼 컴포넌트'
            }
        }
    }
};

export const DefaultButton: Story<ButtonProps> = ({ type }: ButtonProps) => (
    <Button type={type}>text</Button>
);

DefaultButton.args = {
    type: ButtonType.FULLED
};

DefaultButton.storyName = 'Default';

interface ExampleButtonProps {
    text: string;
    type: ButtonType;
}

export const ExampleButton: Story<ExampleButtonProps> = ({
    text,
    type
}: ExampleButtonProps) => {
    return (
        <Button type={type} onClick={action('click')}>
            {text}
        </Button>
    );
};

ExampleButton.args = {
    text: 'text',
    type: ButtonType.OUTLINE
};

ExampleButton.storyName = 'Example';

const IconButtonStyled = styled(Button)<ButtonProps>`
    width: 32px;
    height: 32px;
`;

export const IconButton: Story = () => (
    <IconButtonStyled type={ButtonType.ICON} onClick={action('click')}>
        &lt;
    </IconButtonStyled>
);

IconButton.argTypes = {
    text: {
        table: {
            disable: true
        }
    },
    type: {
        table: {
            disable: true
        }
    }
};

IconButton.parameters = {
    docs: {
        description: {
            story: '아이콘 버튼'
        }
    }
};
