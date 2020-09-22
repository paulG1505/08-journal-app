import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import {  startGoogleLogin, startLogin } from '../action/action';
import { removeError, setError } from '../action/ui';
import { useForm } from '../hooks/useForm'

export const LoginScreen = () => {
    //hook de dispatch
    const dispatch = useDispatch();
     //useSelector para traer el estado de la app
     const {msgError,loading} = useSelector( state => state.ui );

    const [values, handleInputChange] = useForm({
        email: '',
        password: ''
    })
    const { email, password } = values;

    const handeLogin=(e)=>{
        e.preventDefault();
        if(isFormValid()){
            dispatch(startLogin(email,password))
        }
    }

    const handleGoogleLogin=()=>{
        dispatch(startGoogleLogin());
    }

    const isFormValid=()=>{
        
        //npm validator libreria para validaciones
        if(!validator.isEmail(email)){
            dispatch(setError('Email no valid'));
            return false
        }else if(password.length<5 ){
            dispatch(setError('Password should be at least 6 characters ' ));
            return false
        }
        dispatch (removeError())
        return true
    }


    return (
        <>
            <h3 className="auth__title" >Login</h3>
            <form 
            className="animate__animated animate__fadeIn animate_faster"
            onSubmit={handeLogin}>
            {
                msgError &&
                (<div className="auth__alert-error">
                    {msgError}
                </div>)
            }

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
               </button>

                <div className="auth__socialn-networks">
                    <p>Login with social networks</p>
                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className="link">
                    Create new Account
                </Link>

            </form>
        </>
    )
}
