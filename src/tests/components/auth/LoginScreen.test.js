import React from 'react';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk' //es nuestro middleware
import {MemoryRouter} from 'react-router-dom'//sirve para simular las rutas
const { mount } = require("enzyme")
const { LoginScreen } = require("../../../components/auth/LoginScreen")
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { startGoogleLogin,startLogin } from '../../../action/action';
//mock fingir que se llama esa accion
jest.mock('../../../action/action',()=>({
    startGoogleLogin:jest.fn(),
    startLogin:jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {
    auth:{
    },
    ui:{
        loading:false,
        msgError:null
    }
}
//creacion del store
let store = mockStore(initialState)
//simulacion de dispatch
store.dispatch=jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
)

describe('Pruebas a LoginScreen', () => {

    beforeEach(() => {
        store = mockStore(initialState)
        jest.clearAllMocks()//purgar mocks
    })

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe disparar accion de starlogingoogle', () => {
        //simulamos click
        wrapper.find('.google-btn').prop('onClick')();
        //comprobar que se haya llamado la accion
        expect(startGoogleLogin).toHaveBeenCalled();
    })
    test('debe disparar accion de startLogin con sus argumentos', () => {
        wrapper.find('form').prop('onSubmit')(
            {preventDefault(){}}
        );
        //expect(startLogin).toHaveBeenLastCalledWith('','');//se haya llamado con los valores vacios
    })
      
})
