import React from 'react'
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NoteAppBar/>
            <div className="notes__content">
                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                />
                <textarea 
                    placeholder="What happen today?"
                    className="notes__textarea"
                >
                </textarea>
                <div className="notes__image">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
                        alt="imagen prueba"
                    />
                </div>
            </div>
        </div>
    )
}
