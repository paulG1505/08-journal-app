import React, { useEffect, useRef } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleted } from '../../action/notes';
import { useForm } from '../../hooks/useForm';
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const {active:note} = useSelector(state => state.notes)//etraer estado de la nota actual
    const [formValues, handleInputChange,reset]=useForm(note);//llenar el formulario de acuerdo a la nota
    const {title,body}=formValues;//valores para los input
    //ejecuatar si el id cambia
    const activeId=useRef(note.id);//permite almacenar una variable mutable
    //para cambio de estado del useForm
    useEffect(() => {
        //si el id cambia se establece un nuevo estado
        if(note.id!==activeId.current){
            reset(note);
            activeId.current=note.id
        }
    }, [note,reset])
    //si la nota cambia esta escuchando
    useEffect(() => {
        dispatch(activeNote(formValues.id,{...formValues}))
    }, [formValues,dispatch])


    const handleDelete=()=>{
        dispatch(startDeleted(formValues.id))
    }

    return (
        <div className="notes__main-content">
            <NoteAppBar/>
            <div className="notes__content">
                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea 
                    placeholder="What happen today?"
                    className="notes__textarea"
                    value={body}
                    name='body'
                    onChange={handleInputChange}
                >
                </textarea>

              {  (note.url)&&<div className="notes__image">
                    <img
                        src={note.url}
                        alt="imagen prueba"
                    />
                </div>}

            </div>
            <button className="btn btn-danger"
                onClick={handleDelete}
            >
            Delete
            </button>
        </div>
    )
}
