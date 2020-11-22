import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useLocation } from 'libs/router';

import { RootReducerState } from 'modules';

const NotFound: FC = ({ children }) => {
    const location = useLocation();

    // 등록된 경로 조회
    const paths = useSelector<
        RootReducerState,
        RootReducerState['routerReducer']['paths']
    >(({ routerReducer }) => routerReducer.paths);

    // 등록된 경로 내 현재 주소가 있는지 확인
    const show = useMemo(() => {
        let show = true;
        paths.forEach(({ pathname, expect }) => {
            if (expect && pathname === location.pathname) {
                show = false;
                return false;
            }

            if (!expect && location.pathname.startsWith(pathname)) {
                show = false;
                return false;
            }
        });

        return show;
    }, [paths, location.pathname]);

    if (!show) return null;

    return <>{children}</>;
};

export default NotFound;
