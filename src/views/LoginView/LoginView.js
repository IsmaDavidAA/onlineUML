import React from "react";
import Header from "../../components/Header/Header";
import {Body, DivForm, LoginForm,InputForm,ButtonForm} from "../../components/Form/Form.styles";
import { useState } from "react/cjs/react.development";
import { useLocation } from "react-router";
import useUser from "../../../src/User/user"
import { useEffect } from "react";

const LoginView = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [,navigate] = useLocation();
    const {login, isLogged} = useUser();

    useEffect(() => {
        if(isLogged) navigate('/'), [isLogged, navigate]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        //alert(`${username}, ${password}`);
        login({username, password});
    }

  return (
    <>
      <Header title="" theme="usuario"/>
        <Body>
            <LoginForm onSubmit={handleSubmit} action="/home">
                <DivForm>
                    <h2>Login</h2>
                </DivForm> 
                <label>
                    Gmail:
                    <DivForm>
                        <InputForm 
                            type="email"
                            placeholder="gmail"
                            name="email"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />    
                    </DivForm>   
                </label>
                <label>
                    Password: 
                    <DivForm>
                        <InputForm 
                        type="password"
                        placeholder="password"
                        name="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        />
                    </DivForm>
                </label>
                <ButtonForm 
                    type="submit"
                    value="Login"
                />
            </LoginForm>
        </Body>
    </>
  );
};

export default LoginView;
