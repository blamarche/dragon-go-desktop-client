import React from 'react';
import Shared from './shared'

export interface Props {}
export interface State {}

export default class About extends React.Component<Props, State> {

    public render() {
        return (
            <div id="about">
                DGS Electric is an open source client for the awesome <a href="http://www.dragongoserver.net">Dragon Go Server</a><br/> 
				Version: {Shared.VERSION}<br/><br/>
                <a target="_blank" href="https://github.com/blamarche/dragon-go-desktop-client" >DGS Electric - Github Project</a>
                <br/><br/><br/>
                Special Thanks: &nbsp;
                <a target="_blank" href="https://sourceforge.net/projects/dragongoserver/">DGS Team</a>, &nbsp; 
                <a target="_blank" href="http://electron.atom.io/">Electron</a>, &nbsp;
                <a target="_blank" href="https://github.com/jokkebk/jgoboard">jGoBoard</a>, &nbsp; 
                <a target="_blank" href="https://facebook.github.io/react/">React</a>, 
                and many more great open source projects!
                <br/><br/>
                Created by: <br/>
                <a target="_blank" href="http://www.electricfalcon.net"><img src="http://www.electricfalcon.net/eflogo.jpg" style={{width:"213px"}} /></a>
                
            </div>
        );
    }
}
