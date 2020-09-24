const { types } = require("../../types/types")

describe('Pruebas en types', () => {
    const object={
        login:'[auth] login',
        logout:'[auth] logout',
    
        uiSetError:'[ui] setError',
        uiRemove:'[ui] removeError',
    
        uiStartLoading: '[UI] Start loading',
        uiFinishLoading: '[UI] Finish loading',
        
        notesAddNew: '[Notes] New Note',
        notesActive: '[Notes] Set actve note',
        notesLoad: '[Notes] Load notes',
        notesUpdate: '[Notes] Update note',
        notesFileUrl: '[Notes] Update image url',
        notesDelete: '[Notes] Delete note',
        notesLogoutCleaning: '[Notes] Logout Cleaning',
    }
    
    test('se espera que el objeto sea igual', () => {
        expect(types).toEqual(object)
    })
    
})
