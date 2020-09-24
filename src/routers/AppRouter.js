import { firebase } from "../firebase/firebase-config";
import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { useDispatch } from "react-redux";
import { login } from "../action/action";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { starLoadingNotes } from "../action/notes";


export const AppRouter = () => {
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true)
    const [isLogged, setIsLogged] = useState(false)
    //guardar state para que se mantenga si se borra
    useEffect(() => {
        //funcion que revisa si existe un user
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setIsLogged(true)
                dispatch(starLoadingNotes(user.uid))
            } else {
                setIsLogged(false)
            }
            //si recide los datos en el estado cambia de pantalla
            setChecking(false)
        })

    }, [dispatch, setChecking, setIsLogged])

    if (checking) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <Router>
            <div>

                <Switch>
                    <PublicRoute path="/auth" component={AuthRouter} isLogged={isLogged} />
                    <PrivateRoute exact path="/" component={JournalScreen} isLogged={isLogged} />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
