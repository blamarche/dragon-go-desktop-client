import React from 'react';
import Shared from './shared'

export interface Props {}
export interface State {}

export default class About extends React.Component<Props, State> {

    public render() {
        return (
            <div id="about">
                DGS Electric is an open source client for the awesome Dragon Go Server.<br/> 
                It was created by <a target="_blank" href="http://www.electricfalcon.net">Electric Falcon</a><br/>
                <br/>
                <a target="_blank" href="https://github.com/blamarche/dragon-go-desktop-client" >Github Project</a>
                <br/>
                Special Thanks: DGS Team, Electron, jGoBoard, React, and many more great open source projects!
            </div>
        );
    }
}
