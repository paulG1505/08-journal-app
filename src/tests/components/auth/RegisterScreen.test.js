import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

// jest.mock('../../../actions/auth', () => ({
//     startGoogleLogin: jest.fn(),
//     startLoginEmailPassword: jest.fn(),
// }))


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);
// store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>

)

describe('Pruebas en RegisterScreen', () => {

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('debe mostrar error si el email esta vacio', () => {
        const emailField = wrapper.find('input[name="email"]')
        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }//cambiando el valor del input por un string vacio
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        })//simulando envio del form

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email no valid'
        })

    })

    test('debe de mostrar la caja de alerta con el error', () => {
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email no valid'//simulamos que ya existe el error
            }
        };

        const store = mockStore(initState);
        // store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>

        )
        expect(wrapper.find('.auth__alert-error').exists()).toBe(true)
        expect(wrapper.find('.auth__alert-error').text().trim()).toEqual(initState.ui.msgError)//probando texto de la caja

    })



})
