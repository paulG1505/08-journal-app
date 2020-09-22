import { db } from "../firebase/firebase-config";
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