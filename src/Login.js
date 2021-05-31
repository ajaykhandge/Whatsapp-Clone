import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import {auth,provider} from "./firebase"
import {useStateValue} from "./Stateprovider"
import { actionTypes } from "./reducer";

function Login() {

  const [{},dispatch] = useStateValue();

    const signIn = () =>{
        auth.signInWithPopup(provider).then(result =>{
            console.log(result.user);
            dispatch({
              type:actionTypes.SET_USER,
              user:result.user,

            });

        }).catch(error =>{
            console.log(error.message);
        });

    }
  return (
    <div className="login">
      <div className="login__container">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="This is the whatsapp image">
          </img>
        <div className="login__text">
            <h1>Sign in to Whatsapp</h1>

        </div>
        <Button onClick={signIn}>SIGN IN WITH GOOGLE </Button>
      </div>
    </div>
  );
}

export default Login;
