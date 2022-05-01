import { types } from "../types/types";

// {
//     "tipo": "comida",
//     "concepto": "Mc donalds",
//     "monto": "600",
//     "fecha": "1000",
//     "ingresoegreso": "ingreso",
//     "user": {
//         "_id": "awd41413e54f",
//         "name": "juan"
//     },
//     "id": "66666666"
// }

const initialState = {
    trades: [],
    activeTrade: null
}

export const tradesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.tradeSetActive:
            return {
                ...state,
                activeTrade: action.payload
            }

        case types.tradeAddNew:
            return {
                ...state,
                trades: [
                    ...state.trades,
                    action.payload
                ]
            }
        case types.tradeRemoveActive:
            return {
                ...state,
                activeTrade: null
            }
        case types.tradeUpdated:
            return {
                ...state,
                trades: state.trades.map(
                    e => ( e.id === action.payload.id) ? action.payload : e
                )
            }
        case types.tradeDeleted:
            return{
                ...state,
                trades: state.trades.filter(
                    e => ( e.id !== state.activeTrade.id)
                ),
                activeTrade: null
            }
        case types.tradeLoaded:
            return {
                ...state,
                trades: [...action.payload]
            }
        case types.eventLogOut:
            return {}
        default:
            return state;
    }
}