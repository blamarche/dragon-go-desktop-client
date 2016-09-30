import Loader from './loader'
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
                {this.state.sgf=="" ? <Loader/> : ""}
                <div style={{textAlign:"center"}}>{this.state.gameData.black_user ? this.state.gameData.black_user.name : ""} vs. {this.state.gameData.white_user ? this.state.gameData.white_user.name : ""}</div>
                <div id="board"></div>
                <div id="gamebuttons">
                    { this.state.gameData.my_id && this.state.gameData.my_id == this.state.gameData.move_uid ? <button onClick={this.submitClick.bind(this)} className="button-success pure-button">Submit Move</button> : ""}
                    &nbsp;{ this.state.gameData.my_id && this.state.gameData.my_id == this.state.gameData.move_uid ? <button onClick={this.passClick.bind(this)} className="button-secondary pure-button">Pass</button> : ""}
                    &nbsp;<button onClick={this.resetClick.bind(this)} className="pure-button">Reset</button>
                </div>
                <div style={{display:"none"}}>{JSON.stringify(this.state.gameData)}</div>
                <div style={{display:"none"}}>{this.state.sgf}</div>
                {this.state.gameData.black_user ? <div className="gameinfo">
                    <h4>Game Info</h4>
                    Black: {this.state.gameData.black_user.name}<br/>
                    Prisoners (B): {this.state.gameData.black_gameinfo.prisoners}<br/>
                    Time (W): {this.state.gameData.black_gameinfo.remtime}<br/>
                    <hr/>
                    White: {this.state.gameData.white_user.name}<br/>
                    Prisoners (W): {this.state.gameData.white_gameinfo.prisoners}<br/>
                    Time (W): {this.state.gameData.white_gameinfo.remtime}<br/>
                    <hr/>
                    Komi: {this.state.gameData.komi}<br/>
                    Scoring: {this.state.gameData.ruleset}<br/>  
                    {this.state.gameData.score!="" ? "Score: "+this.state.gameData.score : ""}                  
                </div> : ""}
            </div>
        );
    }

    private passClick = (ev:MouseEvent) => {
        var btn=(ev.currentTarget as HTMLButtonElement); 
        btn.disabled=true;
        if (confirm("Are you sure you wish to pass?")) {
            var move = "pass";
            Shared.DGSRequest("quick_do.php?obj=game&cmd=move&gid="+this.state.gameData.id+"&move_id="+this.state.gameData.move_id+"&move="+move+"", (data:any) => { 
                btn.disabled=false;
                if (data.error=="") {
                    Shared.ShowYourMove();
                } else {
                    alert("Error occurred submitting move: "+data.error);
                }
            }, ()=>{ btn.disabled=false; alert("Server Error. Please try again later."); });
        }
    }

    private submitClick = (ev:MouseEvent) => {
        var btn=(ev.currentTarget as HTMLButtonElement); 
        btn.disabled=true;
        //&msg= optional
        var jboard = (window as any).jboard;
        if (jboard.firstMove!=null) {       
            var move = jboard.firstMove.toString();
            Shared.DGSRequest("quick_do.php?obj=game&cmd=move&gid="+this.state.gameData.id+"&move_id="+this.state.gameData.move_id+"&move="+move+"", (data:any) => { 
                btn.disabled=false;
                if (data.error=="") {
                    Shared.ShowYourMove();
                } else {
                    alert("Error occurred submitting move: "+data.error);
                }
            }, ()=>{ btn.disabled=false; alert("Server Error. Please try again later."); });
        } else {
            alert("You need to make a move!");
        }
    }

    private resetClick = () => {
        while (document.getElementById('board').children.length>0)  
            document.getElementById('board').children[0].remove();

        this.setupBoard(this.state.gameData, this.state.sgf);
    }

    private componentDidMount = () => {
        Shared.DGSRequest("quick_do.php?obj=game&cmd=info&gid="+this.props.gameId.toString()+"&with=user_id&lstyle=json", (data:any)=>{
            if (JSON.stringify(data).indexOf("not_logged_in")>=0) {
                Shared.ShowLogin();
            } else {
                Shared.DGSRequest("sgf.php?gid="+this.props.gameId.toString()+"&owned_comments=1&quick_mode=1&no_cache=1", (sgfdata:any)=>{
                    this.setState({ gameData: data, sgf: sgfdata });
                    this.setupBoard(data, sgfdata);
                }, ()=>{ alert("Server error, please try again"); });
            }            
        }, ()=>{ alert("Server error, please try again"); })
    }

    private setupBoard = (data:any, sgfdata:any) => {
        var JGO = (window as any).JGO;

        var jrecord = JGO.sgf.load(sgfdata, true);
        var jboard = jrecord.getBoard();// = new JGO.Board(data.size, data.size);
        var jsetup;
        JGO.BOARD.custom(data.size, window.innerWidth-180, window.innerHeight-50, {}, function(boardopt){
            jsetup = new JGO.Setup(jboard, boardopt); //JGO.BOARD.mediumWalnut);
            
            var notifier = jsetup.getNotifier();
            var lastHover = false, lastX = -1, lastY = -1; // hover helper vars
            var ko = false, lastMove = false;
            var player = (data.move_color=="W") ? JGO.WHITE : JGO.BLACK;
            var opponent = (player == JGO.BLACK) ? JGO.WHITE : JGO.BLACK;
            var moveCount = 0;
            jboard.firstMove = null;
            
            jsetup.create('board', function(canvas:any) {
                if (true) { //data.status=="PLAY") {
                    //hover effect
                    canvas.addListener('mousemove', function(coord:any, ev:MouseEvent) {
                        if (coord.i == -1 || coord.j == -1 || (coord.i == lastX && coord.j == lastY))
                            return;

                        if(lastHover) // clear previous hover if there was one
                            jboard.setType(new JGO.Coordinate(lastX, lastY), JGO.CLEAR);

                        lastX = coord.i;
                        lastY = coord.j;

                        if (jboard.getType(coord) == JGO.CLEAR && jboard.getMark(coord) == JGO.MARK.NONE) {
                            jboard.setType(coord, player == JGO.WHITE ? JGO.DIM_WHITE : JGO.DIM_BLACK);
                            lastHover = true;
                        } else
                            lastHover = false;
                    });

                    //remove hover on leave board
                    canvas.addListener('mouseout', function(ev:MouseEvent) {
                        if (lastHover)
                            jboard.setType(new JGO.Coordinate(lastX, lastY), JGO.CLEAR);
                        lastHover = false;
                    });

                    //play stone to board (not DGS server)
                    canvas.addListener('click', (coord:any, ev:MouseEvent) => {
                        if (lastHover)
                            jboard.setType(new JGO.Coordinate(lastX, lastY), JGO.CLEAR);
                        lastHover = false;
                        var play = jboard.playMove(coord, player, ko);
                        if (play.success) {
                            var node = jrecord.createNode(true);
                            node.info.captures[player] += play.captures.length; // tally captures
                            node.setType(coord, player); // play stone
                            node.setType(play.captures, JGO.CLEAR); // clear opponent's stones

                            if (lastMove)
                                node.setMark(lastMove, JGO.MARK.NONE); // clear previous mark

                            if (ko)
                                node.setMark(ko, JGO.MARK.NONE); // clear previous ko mark
                            
                            if (jboard.firstMove == null)
                                jboard.firstMove = coord;

                            node.setMark(coord, JGO.MARK.CIRCLE); // mark move
                            if (data.my_id == data.move_uid)
                                node.setMark(jboard.firstMove, JGO.MARK.SQUARE);
                            lastMove = coord;

                            if(play.ko)
                                node.setMark(play.ko, JGO.MARK.CIRCLE); // mark ko, too
                            ko = play.ko;

                            var playertmp = player;
                            player = opponent;
                            opponent = playertmp;
                        } else 
                            alert('Illegal move: ' + play.errorMsg);
                    });
                }

                if(typeof jrecord == 'string') {
                    alert('Error loading SGF: ' + jrecord);
                    return;
                }

                if(!(jrecord instanceof JGO.Record)) {
                    alert('Empty SGF or multiple games in one SGF not supported!');
                    return;
                }
                
                jrecord.normalize();
                (window as any).jrecord = jrecord;
                (window as any).jboard = jboard;
                while(jrecord.next()!=null){ moveCount++; }            
            });       
        });
    }
}
