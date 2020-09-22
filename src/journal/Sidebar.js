import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { starLogout } from '../action/action';
import { startNewNote } from '../action/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {
    //useSelector para traer nuestro estado
    const { name } = useSelector(state => state.auth);


    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(starLogout())
    }
    const handleEntry=()=>{
        dispatch(startNewNote())
    }
    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    {/* icono de fontawsone  https://cdnjs.com/libraries/font-awesome*/}
                    <i className="far fa-moon"></i>
                    <span>  {name}</span>
                </h3>
                <button
                    onClick={handleLogout}
                    className="btn mt-5">
                    Logout
                </button>
            </div>
            <div className="journal__new-entry"
                onClick={handleEntry}
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5"> New entry</p>
            </div>
            <JournalEntries />
        </aside>
    )
}
