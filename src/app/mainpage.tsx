import YourMove from './yourmove';
import Menu from './menu';
import React from 'react';
import ReactDOM from 'react-dom';

export default class MainPage {

    show() {
        ReactDOM.render(
            <Menu />,
            document.getElementById('menu')
        );
        ReactDOM.render(
            <YourMove />,
            document.getElementById('content')
        );

        //TODO: Setup 'your move' notification job
    }
};