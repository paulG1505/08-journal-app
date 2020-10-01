import React from 'react';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk' //es nuestro middleware
const { mount } = require("enzyme")
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../action/notes';

//mock fingir que se llama esa accion
jest.mock('../../../action/notes',()=>({
    activeNote:jest.fn(),
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {
    auth:{
        uid:'1',
        name:'Paul'
    },
    ui:{
        loading:false,
        msgError:null
    },
    notes:{
        active:{
            id:123,
            title:'Titulo',
            body:'cuerpo',
            date:1212
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
        
            <NoteScreen />
        
    </Provider>
)


describe('Pruebas en notesscreen', () => {
    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })
    test('debe disparar el activenote', () => {
        //cuando se modifique un input
        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name:'title',
                value:'newTitle'
            }
        });
        expect(activeNote).toHaveBeenLastCalledWith(
            123,{
                body:'cuerpo',
                title:'newTitle',
                id:123,
                date:1212
            }
        )//solo cambia el input del titulo
    })
    
})
