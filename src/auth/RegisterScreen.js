import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../action/ui'
import { startLoginWithEmail } from '../action/action'


export const RegisterScreen = () => {

    //hook de dispatch
    const dispatch = useDispatch();

    //useSelector para traer el estado de la app
    const {msgError} = useSelector( state => state.ui );

    const [values, handleInputChange] = useForm({
        email: '',
        password: '',
        password2:'',
        name:'',
    })
    
    const {email,password,password2,name}=values

    const hadleRegister=(e)=>{
        e.preventDefault();
        if(isFormValid()){
            dispatch( startLoginWithEmail(email,password,name))
        }
    }
    const isFormValid=()=>{
        if(name.trim().length===0){
            dispatch(setError('Name is requider'));
            return false;
        } 
        //npm validator libreria para validaciones
        else if(!validator.isEmail(email)){
            dispatch(setError('Email no valid'));
            return false
        }else if(password !== password2 || password.length<5 ){
            dispatch(setError('Password should be at least 6 characters and compare other password' ));
            return false
        }
        dispatch (removeError())
        return true
    }

    return (
        <>
            <h3 className="auth__title" >Register</h3>
            {/* validacion si es diferente de null */}
            {
                msgError &&
                (<div className="auth__alert-error">
                    {msgError}
                </div>)
            }
            
                

            <form 
            className="animate__animated animate__fadeIn animate_faster"
            onSubmit={hadleRegister}>
            <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    value={name}
                    onChange={handleInputChange}
                />
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
                    autoComplete="off"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    autoComplete="off"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                    //disabled={true}
                >
                    Register
               </button>
                

                <Link to="/auth/login" className="link"> 
                    Already registered?
                </Link>

            </form>
        </>
    )
}
