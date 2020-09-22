import { types } from "../types/types"

export const setError=(err)=>({
    type: types.uiSetError,
    payload: err,
})
export const removeError=(err)=>({
    type: types.uiRemove
})
export const uiStartLoading=(err)=>({
    type: types.uiStartLoading,
    payload:true
})

export const uiFinishLoading=(err)=>({
    type: types.uiFinishLoading,
    payload:false,
})