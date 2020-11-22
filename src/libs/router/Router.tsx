import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { History } from 'history';

import { useHistory } from 'libs/router';

import { routerAction } from 'modules/RouterModule';

interface RouterProps {
    history?: History;
}

const Router: FC<RouterProps> = ({
    children,
    history
}: PropsWithChildren<RouterProps>) => {
    const dispatch = useDispatch();

    const currentHistory = useHistory(history);

    useEffect(() => {
        // history listener 등록
        const removeListener = currentHistory.listen(({ location }) => {
            dispatch(routerAction.setLocation(location));
        });

        return () => {
            removeListener();
        };
    }, [currentHistory, dispatch]);

    return <>{children}</>;
};

export default Router;
