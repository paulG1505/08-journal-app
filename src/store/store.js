import { authReducer } from "../reducers/authReducer";
import thunk from 'redux-thunk';
import { uiReducer } from "../reducers/uiReducer";
import { notesReducer } from "../reducers/notesReducer";
const { createStore,combineReducers, applyMiddleware,compose } = require("redux");

//recibe solo un reducer asi que combinamos aparte varios
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer,
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;//linea para devtools de redux

export const store= createStore(
    reducers,
    //configuracion para manejar acciones asincronas
    composeEnhancers(
        applyMiddleware(thunk)
    )
);