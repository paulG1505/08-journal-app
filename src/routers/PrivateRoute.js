import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';

export const PrivateRoute = ({
    isLogged,
    component:Component,
    ...rest//argumentos restantes
}) => {
    //dentro de rest se encuentra la ultima ruta y guardamos en el storage
    localStorage.setItem('lastPath', rest.location.pathname);
    return (
        <Route 
            {...rest}
            component={
                props=> (
                    (isLogged)
                    ?(<Component {...props}/>)//si esta autenticado el enviamos el componente y sus props
                    :(<Redirect to="/auth/login"/>)
                )
            }
        />
    )
}
PrivateRoute.propTypes={
    isLogged:PropTypes.bool.isRequired,
    component:PropTypes.func.isRequired,
}