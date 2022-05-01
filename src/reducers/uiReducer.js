import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    modalOpenUpdate: false
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }
        case types.uiOpenModalUpdate:
            return {
                ...state,
                modalOpenUpdate: true
            }
        case types.uiCloseModalUpdate:
            return {
                ...state,
                modalOpenUpdate: false
            }
        default:
            return state;
    }
}