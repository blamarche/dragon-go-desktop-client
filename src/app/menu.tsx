
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
                    </ul>
                </div>
        ); // menu-item-divided pure-menu-selected
    }

    private loginClick = () => {
        Shared.ShowLogin();
    }

    private aboutClick = () => {
        alert("DGS Electric is an open source client for the awesome Dragon Go Server. It was created by ElectricFalcon.net");
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
