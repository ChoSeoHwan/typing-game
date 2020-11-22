import React from 'react';
import { Story } from '@storybook/react';
import { PartialPath } from 'history';

import { Link, Redirect, Router, useLocation } from 'libs/router';
import styled from 'libs/styled';

export default {
    title: 'Libraries/Router/Redirect',
    description: '페이지 자동 redirect 컴포넌트',
    component: Redirect,
    argTypes: {
        path: {
            description: '매칭할 경로'
        },
        to: {
            description: '페이지 이동할 경로'
        },
        state: {
            description: '페이지 이동 시 state'
        },
        expect: {
            description: '정확한 매칭 여부'
        }
    }
};

const LinkStyle = styled(Link)`
    display: block;
    margin-top: 15px;
    border: 1px solid #ccc;
    padding: 8px;
`;

interface DefaultRedirectProps {
    path: string;
    to: string | PartialPath;
}

export const DefaultRedirect: Story<DefaultRedirectProps> = ({
    path,
    to
}: DefaultRedirectProps) => {
    const location = useLocation();

    return (
        <Router>
            <p>current path : {location.pathname}</p>
            <Redirect path={path} to={to} />
            <LinkStyle to={path}>Go To &quot;{path}&quot; path</LinkStyle>
        </Router>
    );
};

DefaultRedirect.storyName = 'Default';

DefaultRedirect.args = {
    path: '/test',
    to: '/redirect'
};
