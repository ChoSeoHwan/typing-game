import React, { FC, PropsWithChildren, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useLocation } from 'libs/router';

import { routerAction } from 'modules/RouterModule';

interface RouteProps {
    path: string;
    expect?: boolean;
}

const Route: FC<RouteProps> = ({
    children,
    path,
    expect = false
}: PropsWithChildren<RouteProps>) => {
    const dispatch = useDispatch();

    const location = useLocation();

    const show = useMemo(
        () =>
            expect
                ? path === location.pathname
                : location.pathname.startsWith(path),
        [path, location, expect]
    );

    // 경로 추가
    useEffect(() => {
        dispatch(routerAction.addPaths(path, expect));
    }, [path, expect, dispatch]);

    if (!show) return null;

    return <>{children}</>;
};

export default Route;
