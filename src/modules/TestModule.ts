import {
    createActionCreators,
    createReducerFunction,
    ImmerReducer
} from 'immer-reducer';

interface TestModuleState {
    data: string;
}

const initialState: TestModuleState = {
    data: ''
};

export class TestModule extends ImmerReducer<TestModuleState> {
    /**
     * set data
     * @param data
     */
    setData(data: string) {
        this.draftState.data = data;
    }
}

export const TestReducer = createReducerFunction(TestModule, initialState);
export const TestAction = createActionCreators(TestModule);
