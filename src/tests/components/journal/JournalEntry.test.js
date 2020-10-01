import React from 'react';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk' //es nuestro middleware
const { mount } = require("enzyme")
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../action/notes';


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {}
//creacion del store
let store = mockStore(initialState)
//simulacion de dispatch
store.dispatch=jest.fn()

const note={
    id:1,
    date:0,
    title:'Hola',
    body:'Mundo',
    url:'hhtps:unafoto.jpg'
}

const wrapper = mount(
    <Provider store={store}>
        
            <JournalEntry {...note}/>
        
    </Provider>
)


describe('Pruebas en journalEntry', () => {
    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })
    test('debe disparar activenote', () => {
        wrapper.find('.journal__entry').prop('onClick')();
        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(note.id,{...note})
        )
    })
    
})
