import { types } from "../types/types"
import {firebase, googleProvider} from '../firebase/firebase-config'
import { uiFinishLoading, uiStartLoading } from "./ui"
import Swal from 'sweetalert2'


//generando accion asincrona
export const startLogin=(email, password)=>{
    return(dispatch)=>{
        dispatch(uiStartLoading())
       firebase.auth().signInWithEmailAndPassword(email,password)

       .then(({user})=>{
           dispatch(login(user.uid,user.displayName))
           dispatch(uiFinishLoading())
       })
       .catch(e=>{
           dispatch(uiFinishLoading())
           //ALERTA
           Swal.fire('Error', e.message, 'error')
       })
    }
}

//login with email and password
export const startGoogleLogin=()=>{
    return(dispatch)=>{
        firebase.auth().signInWithPopup(googleProvider)
        .then(({user})=>{//desestructuracion del user de google
            dispatch(
                login(user.uid, user.displayName)
            )
        })
    }
}
//login with email register
export const startLoginWithEmail=(email,password,name)=>{
    return(dispatch)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(async({user})=>{
            //espera obtener el usuario para modificar el nombre
            await user.updateProfile({displayName:name})
            dispatch(
                login(user.uid, user.displayName)
            )
        })
        //capturamos el error 
        .catch(e=> {
            console.log(e)
            Swal.fire('Error', e.message, 'error')
        });
    }
}

export const login=(uid,displayName)=>({
        type:types.login,
        payload:{
            uid, displayName
        }
    }
)

//logout de firebase
export const starLogout=()=>{
    return async(dispatch)=>{
        await firebase.auth().signOut();
        dispatch(logout())//restablece el estado
    }
}

export const logout=()=>({
    type:types.logout
})