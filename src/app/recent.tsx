import GameList from './gamelistcomponent'
import Loader from './loader'
import React from 'react';
import Shared from './shared'

export interface Props {}
export interface State { games:any }

export default class Recent extends React.Component<Props, State> {

    constructor() {
        super();
        this.state = { games:null };
    }

    public render() {
        return (
            <div id="recent">
                <h3>Recently Completed Games</h3>
                { this.state.games==null ? <Loader /> : <GameList games={this.state.games} viewOrPlay="View" /> }
            </div>
        );
    }

    private componentDidMount = () => {
        Shared.DGSRequest("quick_do.php?obj=game&cmd=list&view=finished&with=user_id&lstyle=json", (data:any)=>{
            if (JSON.stringify(data).indexOf("not_logged_in")>=0) {
                Shared.ShowLogin();
            } else {
                this.setState({ games: data.list_result });
            }            
        }, ()=>{ alert("Server error, please try again"); })
    }
}
