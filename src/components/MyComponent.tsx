import React, { FC } from 'react';

export interface MyComponentProps {
    text: string;
}

const MyComponent: FC<MyComponentProps> = ({ text }: MyComponentProps) => {
    return (
        <div>
            This is Test Component<p>{text}</p>
        </div>
    );
};

export default MyComponent;
