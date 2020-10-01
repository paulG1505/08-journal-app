import React from 'react';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk' //es nuestro middleware
import { MemoryRouter } from 'react-router-dom'//sirve para simular las rutas
const { mount } = require("enzyme")
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { login } from '../../action/action';
import {firebase} from '../../firebase/firebase-config'
import { AppRouter } from '../../routers/AppRouter';
import { act } from '@testing-library/react';

//mock fingir que se llama esa accion
jest.mock('../../action/action', () => ({
    login: jest.fn(),
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {
    auth: {
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes:{
        active:{
            id:'asd',
        },
        notes:[],
    }
}
//creacion del store
let store = mockStore(initialState)
//simulacion de dispatch
store.dispatch = jest.fn()


describe('Pruebas en approuter', () => {
    test('debe llamar el login si se autentica', async () => {

        let user;

        await act(async() => {
            const userCred= await firebase.auth().signInWithEmailAndPassword('test@test.com','123456')
            user=userCred.user;
            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            )
        });
        expect(login).toHaveBeenCalled();
    })

})
