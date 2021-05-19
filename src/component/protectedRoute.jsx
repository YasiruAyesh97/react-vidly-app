import React from 'react';
import {Route,Redirect} from "react-router-dom";
import {getCurrentUser} from "../services/userService";

const ProtectedRoute =({path,component:Component,render,...rest}) =>{
    return(
        <Route
        path={path}
        {...rest}
        render={props =>{
            if(!getCurrentUser()) return <Redirect to="/login"/>;
            return Component ? <Component {...props} /> :render(props);
        }}
        />
    );
}
export default ProtectedRoute;