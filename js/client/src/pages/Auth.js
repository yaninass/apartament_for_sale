import React, { useState,useContext } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Card from "react-bootstrap/Card"
import Form from 'react-bootstrap/Form'
import "../css/auth.css"
import {Context} from '../index'
import Button from 'react-bootstrap/esm/Button';
import { NavLink ,useLocation, useNavigate} from 'react-router-dom';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { registration,login } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password,setPassword]=useState('')
  const [famname,setFamname]=useState('')
  const [number,setNumber]=useState('')

  const click = async () =>{
    try{
       let data;
    if (isLogin){
      data = await login(email,password);
    }else{
      data = await registration(email,password,famname,number);
    }
    user.setUser(user)
    user.setIsAuth(true)
    navigate(MAIN_ROUTE)

    }catch(e){
      alert(e.response.data.message)
    }
   
  }
  return (
    <div className="image-background">
      <div className="overlay"></div>
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="p-4 cart">
          <h2 className="m-auto">{isLogin? 'Авторизация' : "Регистрация"}</h2>
          <Form className="d-flex flex-column">
          {isLogin ? (
  <>
    <Form.Control className="mt-3" placeholder="Введите ваш email..." value={email} onChange={e=>setEmail(e.target.value)} type='email'  />
    <Form.Control className="mt-3" placeholder="Введите ваш пароль" value={password} onChange={e=>setPassword(e.target.value)} type='password'/>
  </>
) : (
  <>
    <Form.Control className="mt-3" placeholder="Введите ваш email..." value={email} onChange={e=>setEmail(e.target.value)} type='email' />
    <Form.Control className="mt-3" placeholder="Введите ваш пароль" value={password} onChange={e=>setPassword(e.target.value)} type='password' />
    <Form.Control className="mt-3" placeholder="Введите ваше имя и фамилию..." value={famname} onChange={e=>setFamname(e.target.value)} type='text' />
    <Form.Control className="mt-3" placeholder="Введите ваш номер телефона" value={number} onChange={e=>setNumber(e.target.value)} type='tel' />
  </>
)}
            <div className="my-button-container">
              <Button className="mt-3 my-button" variant="outline-primary" onClick={click}>
               {isLogin ? "Войти" : "Зарегистрироваться"} 
              </Button>
              {isLogin ? ( <><p className="my-paragraph mt-2">
                  Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                </p>
                </>)
                :(
                  <>
                  <p className="my-paragraph mt-2">
                  Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                </p>
                  </>
                )}
              <div className="my-paragraph-container">
                
                
              </div>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
});

export default Auth;