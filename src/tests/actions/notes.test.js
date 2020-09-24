import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk' //es nuestro middleware
import { starLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../action/notes'
import { db } from '../../firebase/firebase-config'
import { types } from '../../types/types'
import { fileUpload } from '../../helpers/fileUpload'
//crear mock para simular url de la imagen
jest.mock('../../helpers/fileUpload',()=>({
    fileUpload:jest.fn(()=>{
        return 'https:image-prueba.com'
    })
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState={
    auth:{
        uid:'TESTING'//simulando el id de un user
    },
    notes:{
        active:{
            id:'DNB6ptbDBvUIHdaVa47c',
            title:'Primera nota',
            body:'Et sunt laborum in esse nulla pariatur mollit occaecat elit ea.'
        }
    }
}
//creacion del store
let store=mockStore(initialState)

describe('Pruebas en notesAction', () => {
    //limpieza del store
    beforeEach(()=>{
        store=mockStore(initialState)
    })



    //para simular un store ocupamos redux-mock-store
    test('Debe crear una nueva nota evualuamos startNewNote', async() => {
        //simular un dispatch y comprueba con la otra base de datos
        //tener una base de datos para testing y una de produccion
        await store.dispatch(startNewNote())
        const actions= store.getActions();//creando acciones
        expect(actions[0]).toEqual({//primera accion
            type:types.notesActive,
            payload:{
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })
        expect(actions[1]).toEqual({//segunda accion
            type:types.notesAddNew,
            payload:{
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })
       
        const {id:docId}=actions[1].payload
        await db.doc(`TESTING/journal/notes/${docId}`).delete();//borrando nueva nota de prueba
    })
    
    test('start loading notes ', async() => {
        await store.dispatch(starLoadingNotes('TESTING'))
        const actions=store.getActions()
        expect(actions[0]).toEqual({
            type:types.notesLoad,
            payload:expect.any(Array)//que sea un arreglo
        })
        //comparamos el objeto del payload
        const expected={
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }
        expect(actions[0].payload[0]).toMatchObject(expected)//evaluacion de los objetos

    })
    

    test('start save note debe actualizar la nota', async () => {
        const note={
            id:'DNB6ptbDBvUIHdaVa47c',
            title:'Mi primera nota',
            body:'Officia officia aute eu nostrud.',
        }
        await store.dispatch(startSaveNote(note));
        //const actions=store.getActions();
        //obtenemos la nota
        const docRef= await db.doc(`/TESTING/journal/notes/${note.id}`).get()
        //comparamos el titulo de la nota para ver si cambio
        expect(docRef.data().title).toBe(note.title)
    })
    
    test('startUploading debe actualizar el url en la nota ',async () => {
        const file = new File([],'foto.jpg')//simulando un archivo
        await store.dispatch(startUploading(file))
        //const actions= store.getActions()
        const docRef= await db.doc(`/TESTING/journal/notes/DNB6ptbDBvUIHdaVa47c`).get()
        expect(docRef.data().url).toBe('https:image-prueba.com')
    })
    

})
