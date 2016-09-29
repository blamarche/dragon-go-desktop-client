import Loader from './loader'
import GameList from './gamelistcomponent'

import React from 'react';
import Shared from './shared'

export interface Props {}
export interface State { games:any }

export default class Current extends React.Component<Props, State> {

    constructor() {
        super();
        this.state = { games:null };
    }

    public render() {
        return (
            <div id="current">
                <h3>Currently Running Games</h3>
                { this.state.games==null ? <Loader /> : <GameList games={this.state.games} viewOrPlay="View" /> }
            </div>
        );
    }

    private componentDidMount = () => {
        Shared.DGSRequest("quick_do.php?obj=game&cmd=list&view=running&with=user_id&limit=all&lstyle=json", (data:any)=>{
            if (JSON.stringify(data).indexOf("not_logged_in")>=0) {
                Shared.ShowLogin();
            } else {
                this.setState({ games: data.list_result });
            }            
        }, ()=>{ alert("Server error, please try again"); })
    }
}
