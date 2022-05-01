import React from 'react'
import { useDispatch } from 'react-redux'
import { tradeStartDelete, tradeStartLoading } from '../../actions/trades'

export const DeleteEventFab = () => {

    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch( tradeStartDelete() )
        setTimeout(() => {
            dispatch( tradeStartLoading())
        }, 250);
        
     }

    return (
        <button
        className='btn btn-danger fab-danger animate__animated animate__backInLeft'
        onClick={ handleDelete}
        >
            <i className='fas fa-trash'></i>
            <span> Delete trade</span>
            </button>
    )
}
