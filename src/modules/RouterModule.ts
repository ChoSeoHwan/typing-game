import { History } from 'history';
import {
    createActionCreators,
    createReducerFunction,
    ImmerReducer
} from 'immer-reducer';

interface Path {
    pathname: string;
    expect: boolean;
}

interface RouterModuleState {
    history: History | null;
    location: History['location'] | null;
    paths: Path[];
}

const initialState: RouterModuleState = {
    history: null,
    location: null,
    paths: []
};

class RouterModule extends ImmerReducer<RouterModuleState> {
    /**
     * history 데이터 세팅
     * @param history
     */
    setHistory(history: History) {
        this.draftState.history = history;
        this.setLocation(history.location);
    }

    /**
     * location 세팅
     * @param location
     */
    setLocation(location: History['location']) {
        this.draftState.location = location;
    }

    /**
     * path 리스트 추가
     * @param pathname
     * @param expect
     */
    addPaths(pathname: string, expect: boolean) {
        this.draftState.paths.push({
            pathname,
            expect
        });
    }
}

export const routerReducer = createReducerFunction(RouterModule, initialState);
export const routerAction = createActionCreators(RouterModule);
