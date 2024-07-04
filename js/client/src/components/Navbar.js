import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { MAIN_ROUTE,  REGISTRATION_ROUTE,ADMIN_ROUTE } from '../utils/consts';
import { LOGIN_ROUTE } from '../utils/consts';
import { Context } from '../index';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import "../css/navbars.css"
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
const NavBar = observer (() => {
  const navigate = useNavigate();
  const {user} = useContext(Context);

  const logOut = () =>{
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
    localStorage.removeItem('role'); 
  
  }
  const isAdmin = localStorage.getItem('role') ==='ADMIN' ;
  
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <NavLink className="shapka" to={MAIN_ROUTE}> FlatFinders</NavLink>
        <Nav className="ml-auto">
          <Link className='mx-3 ssilka' to="/flats">Квартиры</Link>
          <Link className='mx-3 ssilka' to="/feedback">Отзывы</Link>
          <Link className='mx-3 ssilka' to="/news">Новости</Link>
          {user.isAuth ? (
  <>
  
    {isAdmin ? (
      <NavLink to={ADMIN_ROUTE}>
        <Button className="mx-3" variant="outline-light">Панель администратора</Button>
      </NavLink>
    ) : (
      <h4>{user.email}</h4>
    )}
    <NavLink to={MAIN_ROUTE}>
    <Button variant="outline-light" onClick={() => logOut()}>Выйти</Button>
  </NavLink> </>
) : (
  <>
    <Link to={LOGIN_ROUTE}>
      <Button className="mx-3" variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>Войти</Button>
    </Link>
    <Link to={REGISTRATION_ROUTE}>
      <Button variant="outline-light">Зарегистрироваться</Button>
    </Link>
  </>
)}

          </Nav>
        </Container>
      </Navbar>)
});

export default NavBar;