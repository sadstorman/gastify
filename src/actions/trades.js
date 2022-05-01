import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareTrades } from "../helpers/prepareTrades";
import { types } from "../types/types";

export const tradeStartAddNew = (trade) => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth
        try {
            const resp = await fetchConToken('trades', trade, 'POST');
            const body = await resp.json()

            if (body.ok) {
                trade.id = body.trades.id
                trade.user = {
                    _id: uid,
                    name: name
                }

                dispatch(tradeAddNew(trade))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const tradeAddNew = (trades) => ({
    type: types.tradeAddNew,
    payload: trades
})

export const tradeSetActive = (trades) => ({
    type: types.tradeSetActive,
    payload: trades
})

export const tradeRemoveActive = () => ({
    type: types.tradeRemoveActive
})

export const tradeStartUpdate = (trades) => {
    return async (dispatch) => {

        try {

            const resp = await fetchConToken(`trades/${trades.id}`, trades, 'PUT')
            const body = await resp.json()

            if (body.ok) {
                dispatch(tradeUpdate(trades))

                Swal.fire('Trade modificado', body.msg, 'success')
            } else {
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error);
        }

    }
}

const tradeUpdate = (trades) => ({
    type: types.tradeUpdated,
    payload: trades
})

export const tradeStartDelete = (trades) => {
    return async (dispatch, getState) => {

        const { activeTrade } = getState().trades
        try {
            const resp = await fetchConToken(`trades/${activeTrade}`, {}, 'DELETE')
            const body = await resp.json()

            if (body.ok) {
                dispatch(tradeDeleted())
                Swal.fire('Trade eliminado', body.msg, 'success')
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error);
        }

    }
}
const tradeDeleted = () => ({
    type: types.tradeDeleted
})

export const tradeLogOut = () => ({
    type: types.tradeLogOut
})

export const tradeStartLoading = () => {
    return async (dispatch) => {

        try {
            const resp = await fetchConToken('trades')
            const body = await resp.json()
            const trades = prepareTrades(body.trades)
            dispatch(tradeLoaded(trades))

        } catch (error) {
            console.log(error);
        }
    }
}

const tradeLoaded = (trades) => ({
    type: types.tradeLoaded,
    payload: trades
})