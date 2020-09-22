import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';

export const PublicRoute = ({
    isLogged,
    component:Component,
    ...rest//argumentos restantes
}) => {
    
    return (
        <Route 
            {...rest}
            component={
                props=> (
                    (!isLogged)
                    ?(<Component {...props}/>)//si esta autenticado el enviamos el componente y sus props
                    :(<Redirect to="/"/>)
                )
            }
        />
    )
}
PublicRoute.propTypes={
    isLogged:PropTypes.bool.isRequired,
    component:PropTypes.func.isRequired,
}