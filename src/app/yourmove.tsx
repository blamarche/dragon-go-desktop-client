import Loader from './loader'
import GameList from './gamelistcomponent'

import React from 'react';
import Shared from './shared'

export interface Props {}
export interface State { games:any }

export default class YourMove extends React.Component<Props, State> {

    constructor() {
        super();
        this.state = { games:null };
    }

    public render() {
        return (
            <div id="yourmoves">
                <h3>Games On Your Move</h3>
                { this.state.games==null ? <Loader /> : <GameList games={this.state.games} viewOrPlay="Play" /> }
            </div>
        );
    }

    private componentDidMount = () => {
        var $ = (window as any).$;
        Shared.DGSRequest("quick_do.php?obj=game&cmd=list&view=status&with=user_id&limit=all&lstyle=json", (data:any)=>{
            if (JSON.stringify(data).indexOf("not_logged_in")>=0) {
                $("#logoutbutton").hide();
                $("#loginbutton").show();
                Shared.ShowLogin();
            } else {                
                $("#logoutbutton").show();
                $("#loginbutton").hide();
                this.setState({ games: data.list_result });
            }            
        }, ()=>{ alert("Server error, please try again"); })
    }
}
