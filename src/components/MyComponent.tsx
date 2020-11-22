import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootReducerState } from 'modules';
import { testAction } from 'modules/TestModule';

export interface MyComponentProps {
    text: string;
}

const MyComponent: FC<MyComponentProps> = ({ text }: MyComponentProps) => {
    const dispatch = useDispatch();

    const data = useSelector<RootReducerState, string>(
        ({ testReducer }) => testReducer.data
    );

    // 데이터 세팅
    const handleSetData = () => {
        dispatch(testAction.setData(text));
    };

    return (
        <div>
            <h2>This is Test Component</h2>
            <button onClick={handleSetData}>click button</button>
            <p>{data}</p>
        </div>
    );
};

export default MyComponent;
