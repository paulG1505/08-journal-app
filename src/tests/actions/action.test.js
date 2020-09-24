import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk' //es nuestro middleware
const { login,logout, starLogout, startLogin } = require("../../action/action");
const { types } = require("../../types/types");
//simulacion del store
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState={ }
//creacion del store
let store=mockStore(initialState)

describe('Pruebas en Auth', () => {
    //limpieza del store
    beforeEach(()=>{
        store=mockStore(initialState)
    })
    test('Login y Logout deben crear accion respectiva', () => {
        
        const newAuth={
            uid:123123123,
            displayName:'Bryan'
        }
       
        const loginAuth = login(newAuth.uid,newAuth.displayName);
        //console.log(state);
        expect(loginAuth).toEqual({
            type:types.login,
            payload:{
                uid:newAuth.uid, 
                displayName:newAuth.displayName
            }
        })
        const logoutAuth= logout()
    
        expect (logoutAuth).toEqual({type:types.logout})

    })
    
    test('debe de realizar el startlogout', async() => {
        await store.dispatch(starLogout())
        const actions= store.getActions();//creando acciones
        expect(actions[0]).toEqual({
            type:types.logout
        })//comprueba que se llame a esa accion del reducer
        expect(actions[1]).toEqual({
            type:types.notesLogoutCleaning
        })
    })

    test('startlogin login principal de la app   ', async() => {

        await store.dispatch(startLogin('test@test.com','123456'))
        const actions= store.getActions();
        expect(actions[1]).toEqual({
            type:types.login,
            payload:{
                uid:'vcIVDKQxdzbXx7OYX5N9kn5OiON2',
                displayName:null
            }
        })
    })
    
    

})
