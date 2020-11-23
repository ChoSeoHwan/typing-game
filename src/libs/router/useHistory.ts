import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserHistory, History } from 'history';

import { RootReducerState } from 'modules';
import { routerAction } from 'modules/RouterModule';

interface UseHistory {
    (defaultHistory?: History | null): History;
}

// get history object
const useHistory: UseHistory = (defaultHistory = null): History => {
    const dispatch = useDispatch();

    const history = useSelector<
        RootReducerState,
        RootReducerState['routerReducer']['history']
    >(({ routerReducer }) => routerReducer.history);

    return useMemo(() => {
        let currentHistory = history;

        if (history === null) {
            currentHistory = defaultHistory || createBrowserHistory();

            dispatch(routerAction.setHistory(currentHistory));
        }

        return currentHistory as History;
    }, [history, defaultHistory, dispatch]);
};

export default useHistory;
