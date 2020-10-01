import React from 'react';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk' //es nuestro middleware
const { mount } = require("enzyme")
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { starLogout } from '../../../action/action';
import { startNewNote } from '../../../action/notes';
import { Sidebar } from '../../../components/journal/Sidebar';

//mock fingir que se llama esa accion
jest.mock('../../../action/action',()=>({
    starLogout:jest.fn(),
}))
jest.mock('../../../action/notes',()=>({
    startNewNote:jest.fn(),
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {
    auth:{
    },
    ui:{
        loading:false,
        msgError:null
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
store.dispatch=jest.fn()

const wrapper = mount(
    <Provider store={store}>
        
            <Sidebar />
        
    </Provider>
)

describe('Pruebas en Sidebar', () => {
    beforeEach(() => {
        store = mockStore(initialState)
        jest.clearAllMocks()//purgar mocks
    })

    test('debe mostrarse correctamente', () => {
        //snapshot
        expect(wrapper).toMatchSnapshot();
    })
    test('debe llamar al startLogout', () => {
        //accionstartlogout
        wrapper.find('button').prop('onClick')();
        expect(starLogout).toHaveBeenCalled();
    })
    test('debe llamar a startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')()
        expect(startNewNote).toHaveBeenCalled()
    })
    
})
