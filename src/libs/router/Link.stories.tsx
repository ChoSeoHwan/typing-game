import React, { ReactElement } from 'react';
import { Story } from '@storybook/react';

import { Link, Router, useLocation } from 'libs/router';

export default {
    title: 'Libraries/Router/Link',
    description: '페이지 이동 컴포넌트',
    component: Link,
    decorators: [
        (Story: Story): ReactElement => (
            <Router>
                <Story />
            </Router>
        )
    ],
    argTypes: {
        to: {
            description: '이동할 경로'
        }
    }
};

export const DefaultLink: Story = () => <Link to="/main">Link Anchor</Link>;

DefaultLink.storyName = 'Default';

interface ExampleLinkProps {
    to: string;
}

export const ExampleLink: Story<ExampleLinkProps> = ({
    to
}: ExampleLinkProps) => {
    const location = useLocation();

    return (
        <>
            <p>current pathname : {location.pathname}</p>
            <Link to={to}>Link Anchor</Link>
        </>
    );
};

ExampleLink.storyName = 'Example';

ExampleLink.args = {
    to: '/main'
};

ExampleLink.argTypes = {
    to: {
        control: 'text'
    }
};
