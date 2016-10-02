import React from 'react';
import Shared from './shared'

export interface Props { url:string, id:string, gameintercept:boolean }
export interface State {}

export default class Webview extends React.Component<Props, State> {

    public render() {
        return (
            <div id={this.props.id} className="webview-container">              
            </div>
        );
    }

    private componentDidMount = () => {
        var addWebview = (window as any).addWebview;
        addWebview(this.props.url, '#'+this.props.id);
        if (this.props.gameintercept) {
            var webview = document.getElementById(this.props.id).children[0] as any;
            webview.addEventListener("will-navigate", (ev:any)=>{
                var url:string = ev.url;
                var i = url.indexOf("game.php?gid=");
                if (i>=0) {
                    var gid = url.substring(i+("game.php?gid=").length);
                    ev.preventDefault();
                    Shared.ShowGame(parseInt(gid));
                }
            });
        }
    }
}
