import Login from './login'
import YourMove from './yourmove'
import Current from './current'
import Recent from './recent'
import About from './about'
import Game from './game'

import React from 'react'
import ReactDOM from 'react-dom'

export default class Shared {

	public static VERSION:string = "v0.1.0";

    public static ShowAbout = () => {
        ReactDOM.render(
            <About />,
            document.getElementById('content')
        );
    }

    public static ShowGame = (id:number) => {
        ReactDOM.render(
            <Game gameId={id} />,
            document.getElementById('content')
        );
    }

    public static ShowLogin = () => {
        var $ = (window as any).$;
        $("#logoutbutton").hide();
        $("#loginbutton").show();
        ReactDOM.render(
            <Login />,
            document.getElementById('content')
        );
    }

    public static ShowYourMove = () => {
        ReactDOM.render(
            <YourMove />,
            document.getElementById('content')
        );
    }

    public static ShowCurrent = () => {
        ReactDOM.render(
            <Current />,
            document.getElementById('content')
        );
    }

    public static ShowRecent = () => {
        ReactDOM.render(
            <Recent />,
            document.getElementById('content')
        );
    }

    public static DGSRequest = (urlpath:string, success:(data:string)=>any, fail:()=>any) => {
        var w:any = window;
        w.$.ajax(
            {
                url:"https://www.dragongoserver.net/"+urlpath,
                xhrFields: {
                    withCredentials: true
                }
            }
        ).done(success).fail(fail);
    }

}