import Swal from "sweetalert2"
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types"


export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth', { email, password }, 'POST')
        const body = await resp.json()

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }

    }
}
export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth/register', { email, password, name }, 'POST');
        const body = await resp.json()

        if (body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(register({
                uid: body.uid,
                name: body.name
            }))

            Swal.fire('Ok', 'Usuario creado', 'success')
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const startCheking = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('auth/renew');
        const body = await resp.json()

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))

        } else {
            dispatch(checkingFinish())
        }
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

const register = (user) => ({
    type: types.authStartRegister,
    payload: user
})

export const startLogOut = () => {
    return (dispatch) => {
        localStorage.clear()
        dispatch(logout())
    }
}

const logout = () => ({
    type: types.authLogout
})