import {
    ActionFromReducer,
    combineReducers,
    createStore,
    Reducer
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { routerReducer } from 'modules/RouterModule';
import { storeAction, storeReducer } from 'modules/StoreModule';

// combined reducer
const rootReducer = combineReducers({
    storeReducer,
    routerReducer
});

export type RootReducerState = ReturnType<typeof rootReducer>;
export type RootReducerAction = ActionFromReducer<typeof rootReducer>;

export const wrapperReducer = (
    state: RootReducerState,
    action: RootReducerAction
): ReturnType<typeof rootReducer> => {
    if (
        action.type === storeAction.resetStore.type &&
        initialStoreState !== undefined
    ) {
        return rootReducer(initialStoreState, action);
    }

    return rootReducer(state, action);
};

export const store = createStore(
    wrapperReducer as Reducer<RootReducerState, RootReducerAction>,
    composeWithDevTools()
);

export const initialStoreState = {
    ...store.getState()
};
