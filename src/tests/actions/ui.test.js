const { setError, removeError, uiStartLoading, uiFinishLoading } = require("../../action/ui")
const { types } = require("../../types/types")

describe('Pruebas en Ui', () => {
    test('Todas las acciones deben crearse', () => {
        const action= setError('Error')
        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'Error',
        })
        const removeErrorAction= removeError();
        expect(removeErrorAction).toEqual({
            type: types.uiRemove,
        })
        const uiStartLoadingAction= uiStartLoading();
        expect(uiStartLoadingAction).toEqual({
            type: types.uiStartLoading,
            payload:true
        })
        const uiFinishLoadingAction= uiFinishLoading();
        expect(uiFinishLoadingAction).toEqual({
            type: types.uiFinishLoading,
            payload:false
        })

    })
    
})
