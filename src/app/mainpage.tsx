import Login from './login';
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
            <Login />,
            document.getElementById('content')
        );

        //TODO: Setup 'your move' notification job
    }
};