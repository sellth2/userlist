import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { Button } from "primereact/button";
import { Password } from 'primereact/password';
import { InputText } from "primereact/inputtext";
import { toast } from 'react-toastify';

const Login = () => {
  const [userName, usernameUpdate] = useState('');
  const [password, passwordUpdate] = useState('');
  localStorage.removeItem('isAdmin');
  localStorage.removeItem('username');
  const usenavigate= useNavigate();

  useEffect(()=>{
    sessionStorage.clear()
  },[]);
  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch(`http://localhost:3004/users?userName=${userName}`)
        .then((res) => res.json())
        .then((users) => {
          const user = users[0];
          if (user && user.password === password) {
            toast.success('Welcome Back ' + userName + '!');
            sessionStorage.setItem('username', userName);
            sessionStorage.setItem('isAdmin', user.isAdmin);
            //console.log("in Login ",user.isAdmin);
             // Store isAdmin in session storage
            usenavigate('/table');
          } else {
            toast.warning('Username or password error!');
          }
        })
        .catch((err) => {
          toast.error('Login Failed: ' + err.message);
        });
    }
  };
  const validate = () => {
    let result = true;
    if (userName === '' || userName === null) {
        result = false;
        toast.warning('Please Enter Username');
    }
    if (password === '' || password === null) {
        result = false;
        toast.warning('Please Enter Password');
    }
    return result;
  }
  return (
    <div>
     
      <h2>Login</h2>
      <form onSubmit={ProceedLogin} className="form__group field">
        <div className="p-float-label">
          <InputText className="input-text"
            type="text"
            name="userName"
            required="required"
            value={userName}
            onChange={e => usernameUpdate(e.target.value)}
            autoComplete="off"
            
          />
          <label htmlFor="userName">Username</label>
        </div>
        <div className="p-float-label">
        <Password  
        value={password} 
        onChange={e => passwordUpdate(e.target.value)}
        feedback={false} 
        toggleMask
        />
        <label htmlFor="password">Password</label>
        </div >
        <Button  type="submit" label="Login" icon="pi pi-check" className="btn-add"></Button>
      </form>
    </div>
  );
};

export default Login;
