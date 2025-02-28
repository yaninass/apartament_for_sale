import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { Spinner } from 'react-bootstrap';
import { check } from './http/userAPI';

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading,setLoading]=useState(true)


  useEffect(() => {
    check().then(data=>{ 
          user.setUser(data);
          user.setIsAuth(true);
        }).finally (()=> setLoading(false))
       
      },[]);

  

  if (loading) {
    return <Spinner animation={'grow'} />;
  }
  if (loading){
    return <Spinner animation={'grow'}/>
  }
  return (
    <BrowserRouter>
    <NavBar/>
      <AppRouter />
      <Footer/>
    </BrowserRouter>
  );
});
 
export default App;
