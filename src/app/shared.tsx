import Login from './login'
import YourMove from './yourmove'
import Current from './current'
import Recent from './recent'
import About from './about'
import Webview from './webview'
import Game from './game'

import React from 'react'
import ReactDOM from 'react-dom'

declare var electron:any;

export default class Shared {

	public static VERSION:string = "v0.2.0";

    public static GetCmdArg = (pos:number):string => {
        var args = electron.remote.process.argv;
        if (pos >= 0 && pos < args.length) {
            return args[pos];
        }
        return "";
    }

    private static clearPage = () => {
        ReactDOM.render(
            <div />,
            document.getElementById('content')
        );
    }

    public static ShowWebview = (url:string, gameintercept:boolean) => {
        Shared.clearPage();
        var id = "wv" + (Math.floor(Math.random()*999999999)+999999);
        ReactDOM.render(<Webview id={id} url={url} gameintercept={gameintercept}></Webview>, document.getElementById("content"));
    }

    public static ShowAbout = () => {
        ReactDOM.render(
            <About />,
            document.getElementById('content')
        );
    }

    public static ShowGame = (id:number) => {
        Shared.clearPage();
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
        Shared.clearPage();
        ReactDOM.render(
            <YourMove />,
            document.getElementById('content')
        );
    }

    public static ShowCurrent = () => {
        Shared.clearPage();
        ReactDOM.render(
            <Current />,
            document.getElementById('content')
        );
    }

    public static ShowRecent = () => {
        Shared.clearPage();
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
