import React from 'react';
import ReactDom from 'react-dom';

import Test from 'components/Test';

const root = document.getElementById('root');

const App = () => {
    return (
        <>
            <h1>This is Typing Game. SeoHwan Cho</h1>
            <Test />
        </>
    );
};

ReactDom.render(<App />, root);
