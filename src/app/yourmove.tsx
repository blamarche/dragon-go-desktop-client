import Loader from './loader'
import GameList from './gamelistcomponent'

import React from 'react';
import Shared from './shared'

export interface Props { json:string }
export interface State { games:any, firstload:boolean }

export default class YourMove extends React.Component<Props, State> {

    constructor() {
        super();
        this.state = { games:null, firstload: true };
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
        console.log(this.props.json);
        if (this.state.firstload && this.props.json!=""){
            this.populateList(JSON.parse(this.props.json));
        } else {
            Shared.DGSRequest("quick_do.php?obj=game&cmd=list&view=status&with=user_id&limit=all&lstyle=json", (data:any)=>{
                this.populateList(data);
            }, ()=>{ alert("Server error, please try again"); })
        }
    }

    private populateList = (data:any) => {
        var $ = (window as any).$;
        if (JSON.stringify(data).indexOf("not_logged_in")>=0) {
            $("#logoutbutton").hide();
            $("#loginbutton").show();
            Shared.ShowLogin();
        } else {                
            $("#logoutbutton").show();
            $("#loginbutton").hide();
            this.setState({ games: data.list_result, firstload:false });
        }
    }   
}
