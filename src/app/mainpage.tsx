import YourMove from './yourmove';
import Menu from './menu';
import Shared from './shared';
import React from 'react';
import ReactDOM from 'react-dom';

declare var Notification: any;
declare var BrowserWindow: any;

export default class MainPage {

    private lastNotifyContent:string = ""; 
    private notifyFrequency:number = 5*60*1000;

    show() {
        ReactDOM.render(
            <Menu />,
            document.getElementById('menu')
        );
        ReactDOM.render(
            <YourMove />,
            document.getElementById('content')
        );

        //Setup 'your move' notification job
        setTimeout(this.checkMoveNotify.bind(this), this.notifyFrequency);
    }

    private checkMoveNotify = () => {
        if (!document.hasFocus()) {
            Shared.DGSRequest("quick_do.php?obj=game&cmd=list&view=status&with=user_id&limit=all&lstyle=json", (data:any)=>{
                if (JSON.stringify(data).indexOf("not_logged_in")>=0) {
                    //maybe increase sleep time?
                } else {
                    var o = {};
                    for (var i=0; i<data.list_result.length; i++) {
                        o[data.list_result[i].id] = data.list_result[i].move_id; 
                    }
                    
                    if (this.lastNotifyContent != JSON.stringify(o) && data.list_result.length>0){
                        
                        var n = new Notification('DGS Electric', {
                            body: "You have "+data.list_result.length+" game(s) on your move."
                        });
                        this.lastNotifyContent = JSON.stringify(o);
                    }                    
                }            
            }, ()=>{ console.log("Server error checking for notifications") })
        }
        setTimeout(this.checkMoveNotify.bind(this), this.notifyFrequency);
    }
};