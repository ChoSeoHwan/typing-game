import { applyMiddleware, createStore, Reducer } from 'redux';
import { ActionFromReducer, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from 'sagas';

import { questionReducer } from 'modules/QuestionModule';
import { routerReducer } from 'modules/RouterModule';
import { storeAction, storeReducer } from 'modules/StoreModule';

// combined reducer
export const rootReducer = combineReducers({
    storeReducer,
    routerReducer,
    questionReducer
});

export type RootReducerState = ReturnType<typeof rootReducer>;
export type RootReducerAction = ActionFromReducer<typeof rootReducer>;

// reducer function 가공
export const wrapperReducer = (
    state: RootReducerState,
    action: RootReducerAction
): ReturnType<typeof rootReducer> => {
    // storeAction.resetStore 액션 실행 시 모든 store 의 state 를 초기화
    if (
        action.type === storeAction.resetStore.type &&
        initialStoreState !== undefined
    ) {
        return rootReducer(initialStoreState, action);
    }

    return rootReducer(state, action);
};

// redux-saga middleware creator
const sagaMiddleware = createSagaMiddleware();

// store 생성
export const store = createStore(
    wrapperReducer as Reducer<RootReducerState, RootReducerAction>,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// saga middleware 실행
sagaMiddleware.run(rootSaga);

// store 최초 생성 시 기본 state - store state 초기화 시 필요
export const initialStoreState = {
    ...store.getState()
};
