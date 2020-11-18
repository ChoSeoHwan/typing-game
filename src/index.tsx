import React from 'react';
import ReactDom from 'react-dom';

import MyComponent from 'components/MyComponent';

const root = document.getElementById('root');

const App = () => {
    return (
        <>
            <h1>This is Typing Game. SeoHwan Cho</h1>
            <MyComponent />
        </>
    );
};

ReactDom.render(<App />, root);
