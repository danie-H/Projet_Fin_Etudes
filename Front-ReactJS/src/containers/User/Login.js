import { React, useState } from "react";
import color from "../../color";
import { INITIAL_USERS } from "./User";
import Button from "../../components/Button";
import { Redirect } from "react-router-dom";


const Login = () => {

  const [isSend, setIsSend] = useState(false);
  const [fields, setField] = useState({userName: "", password: ""});
  const [errors, setErrors] = useState(false);
  const { userName, password } = fields;
  
  function handleSubmit (e) {
    e.preventDefault();
    console.log('name', userName);
    console.log('pwd', password);
    INITIAL_USERS.map(user => {
      if(user.userName === userName && user.password === password) {
         setIsSend({isSend: true});
      } 
        return setErrors(true);
    })
  }
  function handleChange (event) {
    const { target: {name, value}} = event;
    setField({
      ...fields,
      [name]: value
    })
  }


  if (isSend) {
    return <Redirect to="/parameter" />
  }
  
    return (
      <div className="container" id="loginCenter">
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <input 
              type="text" 
              placeholder="Identifiant" 
              name="userName" 
              value={userName} 
              onChange={e => handleChange(e)} 
              required 
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Mot de passe" 
              name="password" 
              value={password} 
              onChange={e => handleChange(e)} 
              required
            />
          </div>
          <Button 
            type="submit" 
            color="white" 
            background={color.orange} 
            text="Connectez-vous" 
            radius 
          />
        </form>
        {errors && <span>Login ou mot de passe érroné</span>}
      </div>
    );
}

export default Login;