import YourMove from './yourmove';
import Menu from './menu';
import Shared from './shared';
import React from 'react';
import ReactDOM from 'react-dom';

declare var Notification: any;
declare var process: any;
declare var electron: any;

export default class MainPage {

    private lastNotifyContent:string = ""; 
    private notifyFrequency:number = 10*60*1000; //10 minutes
    private notifyMethod:string = "native";

    show() {
        if (Shared.GetCmdArg(2)=="--short") {
            this.notifyFrequency = 5000;
            console.log("Short 5 sec notify interval enabled");
        }
        if (process.platform=="win32") { //can't believe electron doesnt have their own chrome-style notifiers for windows
            this.notifyMethod = "toaster";
        }

        ReactDOM.render(
            <Menu />,
            document.getElementById('menu')
        );
        ReactDOM.render(
            <YourMove json="" />,
            document.getElementById('content')
        );

        //Setup 'your move' notification job
        setTimeout(this.checkMoveNotify.bind(this), this.notifyFrequency);
        //Setup title reset job
        setTimeout(this.resetTitle.bind(this), 3000);
    }

    private resetTitle = () => {
        if (document.title!="DGS Electric")
            document.title = "DGS Electric";
        setTimeout(this.resetTitle.bind(this), 3000);
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
                        switch(this.notifyMethod) {
                            case "alert":
                                alert("You have "+data.list_result.length+" game(s) on your move.");
                                break;

                            case "toaster":
                                var msg = {
                                    title : "DGS Electric",
                                    message : "You have "+data.list_result.length+" game(s) on your move.",
                                    width : 300,
                                    // height : 160, window will be autosized
                                    timeout : 60000,
                                    focus: false, // do not set focus back to main window
                                    show: true
                                };
                                electron.ipcRenderer.send('electron-toaster-message', msg);
                                break;

                            case "native":
                                var n = new Notification('DGS Electric', {
                                    body: "You have "+data.list_result.length+" game(s) on your move."
                                });
                                break;
                        }
                        document.title = "DGS Electric ("+data.list_result.length+")";                        
                        this.lastNotifyContent = JSON.stringify(o);
                        Shared.ShowYourMove(JSON.stringify(data));
                    }                    
                }            
            }, ()=>{ console.log("Server error checking for notifications") })
        }
        setTimeout(this.checkMoveNotify.bind(this), this.notifyFrequency);
    }
}