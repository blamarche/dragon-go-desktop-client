
import React from 'react';
import Shared from './shared'

export default class Login extends React.Component<{}, {}> {

    public render() {
        return (
            <div id="login">
                <form className="pure-form">
                    DGS Electric
                    <fieldset className="pure-group">

                        <input id="user" type="text" className="pure-input-1" placeholder="Username" />
                        <input id="pass" type="password" className="pure-input-1" placeholder="Password" />
                    </fieldset>

                    <fieldset className="pure-group">
                        <button type="submit" onClick={this.handleLogin.bind(this)} id="loginbutton" className="button-xlarge pure-button pure-input-1 pure-button-primary">Login</button>
                        <span style={{textAlign: "center", lineHeight:"80px", display:"block", fontStyle:"italic"}} >
                            <a target="_blank" href="https://www.dragongoserver.net/register.php">Don't have an account? Sign up here.</a>
                        </span>
                    </fieldset>
                </form>
            </div>
        );
    }

    private handleLogin = (ev:MouseEvent) => {
        var t = (ev.currentTarget as HTMLButtonElement);
        t.disabled=true;

        var user = document.getElementById("user") as HTMLInputElement;
        var pass = document.getElementById("pass") as HTMLInputElement;
        
        Shared.DGSRequest("login.php?quick_mode=1&userid="+user.value+"&passwd="+pass.value, (data:string)=>{
            t.disabled = false;
            if (data.indexOf("Ok")>=0) {
                Shared.ShowYourMove();
            } else {
                if (data.indexOf("wrong_password")>=0)
                    alert("Error logging in: Incorrect user name or password.");
                else
                    alert("Error logging in: "+ data);
            }
        }, ()=>{ alert("Server Error, please try again later"); });

        ev.preventDefault();
        return false;
    }

}
