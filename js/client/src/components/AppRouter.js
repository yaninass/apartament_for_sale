import React, { useContext } from 'react';
import {Navigate,Routes, Route } from 'react-router-dom';
import { authRoutes,publicRoutes } from '../routes';
import { MAIN_ROUTE } from '../utils/consts';
import { Context } from '../index';

const AppRouter = () => {
    const {user} = useContext(Context)

    console.log(user)
    return (
        <Routes>
            
                {user.isAuth && authRoutes.map(({path, Component})=>
                <Route key={path} path = {path} element = {<Component/>} />
                )}

                {publicRoutes.map(({path, Component})=>
                <Route key={path} path = {path} element = {<Component/>} />
                )}
                <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;