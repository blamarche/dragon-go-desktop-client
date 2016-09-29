
import Shared from './shared'
import React from 'react';
import ReactDOM from 'react-dom';


export default class Menu extends React.Component<{}, {}> {

    public render() {
        return (
            <div className="pure-menu">
                    <a className="pure-menu-heading">DGS Electric</a>

                    <ul className="pure-menu-list">
                        <li className="pure-menu-item"><a href="#" onClick={this.loginClick.bind(this)} className="pure-menu-link">Login</a></li>
                        <li className="pure-menu-item"><a href="#" onClick={this.aboutClick.bind(this)} className="pure-menu-link">About DGS Electric</a></li>
                        <hr />
                        <li className="pure-menu-item"><a href="#" onClick={this.yourmoveClick.bind(this)} className="pure-menu-link">Your Move</a></li>
                        <li className="pure-menu-item"><a href="#" onClick={this.currentClick.bind(this)} className="pure-menu-link">Current Games</a></li>
                        <li className="pure-menu-item"><a href="#" onClick={this.recentClick.bind(this)} className="pure-menu-link">Recently Finished</a></li>
                        <hr />
                        <li id="logoutbutton" className="pure-menu-item"><a href="#" onClick={this.logoutClick.bind(this)} className="pure-menu-link">Logout</a></li>
                        
                    </ul>
                </div>
        ); // menu-item-divided pure-menu-selected
    }
    
    private logoutClick = () => {
        Shared.DGSRequest("login.php?quick_mode=1&logout=1", (data:string) => {
            var $ = (window as any).$;
            $("#logoutbutton").hide();
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
