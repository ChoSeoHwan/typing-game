import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { TestReducer } from 'modules/TestModule';

// combined reducer
const rootReducer = combineReducers({
    TestReducer
});

export type RootReducerState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools());
