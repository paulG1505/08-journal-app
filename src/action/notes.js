import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    //es una promesa //funciones ya para consumir
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        //documento referencial -coleccion-documento-coleccion
        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id,newNote))
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note,
    },
})
export const starLoadingNotes = (uid) => {
    return async (dispatch) => {
        //espera que traiga las notas del user
        const notes = await loadNotes(uid);

        ///cambio del estado de las notas
        dispatch(setNotes(notes))
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote=(note)=>{
    return async(dispatch,getState)=>{
        const { uid } = getState().auth;
        //si no viene url borramos ese campo para que no salte error
        if(!note.url){
            delete note.url
        }
        const noteToFirestore={...note};
        //elimino el id porque eso no necesito guardar
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)

        dispatch(refreshNote(note.id,noteToFirestore))
        
        //alerta
        Swal.fire('Saved',note.title,'success')
    }
}

//estado de nuevas notas
export const addNewNote=(id,note)=>({
    type:types.notesAddNew,
    payload:{
        id,
        ...note
    }
})


//recargar entradas cuando se guarda
export const refreshNote=(id,note)=>({
    type:types.notesUpdate,
    payload:{
        id,
        note:{
            id,
            ...note
        }
    }
})

export const startUploading=(file)=>{
    return async( dispatch,getState)=>{
        const {active:note}= getState().notes//extraer nota actual
        Swal.fire({
            title:'Uploading...',
            text:'Please wait...',
            allowOutsideClick:false,
            //funcion que muestra icono cargando infinito
            onBeforeOpen:()=>{
                Swal.showLoading();
            }
        })
        const fileUrl= await fileUpload(file)
        //le guardo el url en la nota
        note.url=fileUrl
        dispatch(startSaveNote(note))
        Swal.close()//cierra la alerta cuando se acaba de subir
    }
}

export const startDeleted=(id)=>{
    return async(dispatch,getState)=>{
        const uid=getState().auth.uid;
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        //eliminando del store
        dispatch(deleteNote(id))
    }
}

export const deleteNote=(id)=>({
    type:types.notesDelete,
    payload:id,
})

export const noteLogout=()=>({
    type:types.notesLogoutCleaning,
})

