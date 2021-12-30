import React from "react";
import Header from "../../components/Header/Header";
import {Body, DivForm, LoginForm,InputForm,ButtonForm} from "../../components/Form/Form.styles";

const LoginView = (props) => {
  return (
    <>
      <Header title="Maria" theme="usuario"/>
        <Body>
            <LoginForm action="/home">
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
