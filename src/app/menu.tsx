
import Shared from './shared'
import Webview from './webview'
import React from 'react';
import ReactDOM from 'react-dom';


export default class Menu extends React.Component<{}, {}> {

    public render() {
        return (
            <div className="pure-menu">
                    <a className="pure-menu-heading">
                        <img src="../css/dragon_logo.png" /><br/>
                        DGS<br/>Electric
                    </a>

                    <ul className="pure-menu-list">
                        <li id="loginbutton" className="pure-menu-item"><a href="#" onClick={this.loginClick.bind(this)} className="pure-menu-link">Login</a></li>
                        <li id="logoutbutton" className="pure-menu-item"><a href="#" onClick={this.logoutClick.bind(this)} className="pure-menu-link">Logout</a></li>
                        <li className="pure-menu-item"><a href="#" onClick={this.aboutClick.bind(this)} className="pure-menu-link">About DGS Electric</a></li>
                        <hr />
                        <li className="pure-menu-item"><a href="#" onClick={this.yourmoveClick.bind(this)} className="pure-menu-link">Your Move</a></li>
                        <li className="pure-menu-item"><a href="#" onClick={this.currentClick.bind(this)} className="pure-menu-link">Current Games</a></li>
                        <li className="pure-menu-item"><a href="#" onClick={this.recentClick.bind(this)} className="pure-menu-link">Recently Finished</a></li>
                        <hr />
                        <li className="pure-menu-item"><a onClick={this.linkClick.bind(this)} href="https://www.dragongoserver.net/new_game.php" className="pure-menu-link">New Game</a></li>
                        <li className="pure-menu-item"><a onClick={this.linkClick.bind(this)} href="https://www.dragongoserver.net/waiting_room.php" className="pure-menu-link">Join Game</a></li>
                        <li className="pure-menu-item"><a onClick={this.linkClick.bind(this)} href="https://www.dragongoserver.net/show_games.php?uid=all" className="pure-menu-link">Observe Games</a></li>                        
                    </ul>
                </div>
        ); // menu-item-divided pure-menu-selected
    }

    private linkClick = (ev:MouseEvent) => {
        ev.preventDefault();
        var targeturl = (ev.currentTarget as HTMLLinkElement).href;
        var intercept = targeturl.indexOf("show_games.php") >= 0;
        Shared.ShowWebview(targeturl, intercept);
        return false;
    }
    
    private logoutClick = () => {
        Shared.DGSRequest("login.php?quick_mode=1&logout=1", (data:string) => {
            var $ = (window as any).$;
            $("#logoutbutton").hide();
            $("#loginbutton").hide();
            Shared.ShowLogin();
        }, ()=>{ alert("Server Error, please try again"); });
    }

    private loginClick = () => {
        Shared.ShowLogin();
    }

    private aboutClick = () => {
        Shared.ShowAbout();
    }

    private currentClick = () => {
        Shared.ShowCurrent();
    }

    private yourmoveClick = () => {
        Shared.ShowYourMove();
    }

    private recentClick = () => {
        Shared.ShowRecent();
    }
}
