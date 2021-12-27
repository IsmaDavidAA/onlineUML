//import React, { useState } from "react";
import ButtonLink from "../../components/ButtonLink/ButtonLinkUser";
import Space from "../../components/Space/Space";
//import  from "../../components/Header/Header";
import Navbar from "../../components/Header/HeaderG";
//import FormSingup from "../../components/Form/FormLogin";

export default function Login () {


    return (
      <>
        <Navbar title="Jose" theme="gouml" />
        
        <form >
            <input 
                type="email"
                placeholder="gmail"
            />
            <input 
                type="password"
                placeholder="password"

            />
        </form>

      </>
    );
};

/*const HomeLoginView = (props) => {
  return (
    <>
      <WrapperView>
        <WrapperButton theme="Signup">
          <Space h={20} w={20}></Space>
          <ButtonLink
            texto="Sign up"
            theme="login"
            url={`/`}
          ></ButtonLink>
        </WrapperButton>
      </WrapperView>
    </>
  );
};*/

//export default HomeLoginView;
