
import React from 'react';
import Shared from './shared'

export interface Props { gameId:number }
export interface State { gameData:any, sgf:string }

export default class Game extends React.Component<Props, State> {

    constructor() {
        super();
        this.state = {
            gameData:{},
            sgf:""
        }
    }

    public render() {
        return (
            <div id="game">
                {this.props.gameId}<hr/>
                {JSON.stringify(this.state.gameData)}<hr/>
                {this.state.sgf}
            </div>
        );
    }

    private componentDidMount = () => {
        Shared.DGSRequest("quick_do.php?obj=game&cmd=info&gid="+this.props.gameId.toString()+"&with=user_id&lstyle=json", (data:any)=>{
            if (JSON.stringify(data).indexOf("not_logged_in")>=0) {
                Shared.ShowLogin();
            } else {
                Shared.DGSRequest("sgf.php?gid="+this.props.gameId.toString()+"&owned_comments=1&quick_mode=1", (sgfdata:any)=>{
                    this.setState({ gameData: data, sgf: sgfdata });
                }, ()=>{ alert("Server error, please try again"); });
            }            
        }, ()=>{ alert("Server error, please try again"); })
    }
}
