import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../action/notes';
import moment from 'moment'

export const NoteAppBar = () => {

    
    const dispatch = useDispatch();  
    const {active} = useSelector( state => state.notes ); //extraer la nota activa
    const {date}=active
    const noteDate = moment(date);
    const handleSave=()=>{
        dispatch(startSaveNote(active))
    }
    const handlePicture=()=>{
        //seleccionamos el input oculto
        document.querySelector('#fileSelector').click()
    }

    const handleFileChange=(e)=>{
        //obtener la img
        const file= e.target.files[0];
        if (file){
            dispatch(startUploading(file));
        }
    }
    return (
        <div className="notes__appbar">
            <span> {noteDate.format('LL')}</span>

            <input
                id="fileSelector"
                type="file"
                style={{display:'none'}}
                name="file"
                onChange={handleFileChange}
            />

            <div>
                <button className="btn"
                    onClick={handlePicture}
                > Picture</button>
                <button 
                    className="btn"
                    onClick={handleSave}
                    > Save</button>
            </div>
        </div>
    )
}
