import { applyMiddleware, createStore, Reducer } from 'redux';
import { ActionFromReducer, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { gameReducer } from 'modules/GameModule';
import { playReducer } from 'modules/PlayModule';
import { questionsReducer } from 'modules/QuestionsModule';
import { routerReducer } from 'modules/RouterModule';
import { storeAction, storeReducer } from 'modules/StoreModule';

import { rootSaga } from 'sagas';

// combined reducer
export const combinedReducer = combineReducers({
    storeReducer,
    routerReducer,
    questionsReducer,
    gameReducer,
    playReducer
});

export type RootReducerState = ReturnType<typeof combinedReducer>;
export type RootReducerAction = ActionFromReducer<typeof combinedReducer>;

// reducer function 가공
const rootWrapperReducer = (
    state: RootReducerState,
    action: RootReducerAction
): ReturnType<typeof combinedReducer> => {
    // storeAction.resetStore 액션 실행 시 모든 store 의 state 를 초기화
    if (
        action.type === storeAction.resetStore.type &&
        initialStoreState !== undefined
    ) {
        return combinedReducer(initialStoreState, action);
    }

    return combinedReducer(state, action);
};

export const rootReducer = rootWrapperReducer as Reducer<
    RootReducerState,
    RootReducerAction
>;

// redux-saga middleware creator
const sagaMiddleware = createSagaMiddleware();

// store 생성
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// saga middleware 실행
sagaMiddleware.run(rootSaga);

// store 최초 생성 시 기본 state - store state 초기화 시 필요
export const initialStoreState = {
    ...store.getState()
};
