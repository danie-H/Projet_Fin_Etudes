import Login from './Login';
import React from 'react';
import Wrapper from './Wrapper';
import logo from '../../images/logo.png'
function User() {
    return (
      <Wrapper>
        <div className="loginBG">
         <img src={logo} alt="logo-3IL" id="img"/>
         <Login />
        </div>
      </Wrapper>
    );
}

export default User;