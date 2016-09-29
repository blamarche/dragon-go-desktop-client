import Shared from './shared';
import React from 'react';

export interface Props { games:Array<any>, viewOrPlay:string }
export interface State {}

export default class GameList extends React.Component<Props, State> {

    constructor() {
        super();
        this.state = { games:[] };
    }

    public render() {
        return (
            <div className="gamelist">
                {this.props.games.length == 0 ? <span>No games found.<br/></span> : ""}
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Game&nbsp;#</th>
                            <th>Black</th>
                            <th>White</th>
                            <th>Score</th>
                            <th>Size</th>
                            <th>Moves</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.games.map(function(game, i){
                        return <tr key={i}>
                                <td>{game.id}</td>
                                <td>{game.black_user.name}</td>
                                <td>{game.white_user.name}</td>
                                <td>{game.score}</td>
                                <td>{game.size}</td>
                                <td>{game.move_count}</td>
                                <td>
                                    {this.props.viewOrPlay=="Play" ? 
                                    <button data-id={game.id} onClick={this.handleClick.bind(this)} className="button-success pure-button pure-input-1 pure-button-primary" type="button">{this.props.viewOrPlay}</button>
                                    :
                                    <button data-id={game.id} onClick={this.handleClick.bind(this)} className="pure-button pure-input-1 pure-button-primary" type="button">{this.props.viewOrPlay}</button>
                                    }
                                </td>
                            </tr>;
                    }.bind(this))}
                    </tbody>
                </table>
            </div>
        );
    }

    private handleClick = (ev:MouseEvent) => {
        var target = ev.currentTarget as HTMLElement;
        var id = target.getAttribute("data-id");
        Shared.ShowGame(parseInt(id));
    }

}
