const { shallow } = require("enzyme")
import React from 'react';
import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas al auth Reducer', () => {
    test('debe retornar un nuevo state con el login', () => {
        const newAuth={
            uid:123123123,
            displayName:'Bryan'
        }
        const action={
            type:types.login,
            payload:newAuth
        }
        const state = authReducer({uid:1,displayName:'Paul'}, action);
        
        expect(state).toEqual({
            uid:123123123,
            name:'Bryan'
        })
    })
    test('estado vacio en el logout', () => {
        const action={
            type:types.logout,
        }
        const state = authReducer({uid:1,displayName:'Paul'}, action);
        expect(state).toEqual({})
    })
    test('accion no valida y regresa el estado por defecto', () => {
        const action={
            type:types.invalid,
        }
        const state = authReducer({uid:1,displayName:'Paul'}, action);
        expect (state).toEqual({uid:1,displayName:'Paul'})
    })
    
    
})
