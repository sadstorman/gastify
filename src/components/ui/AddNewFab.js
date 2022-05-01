import React from 'react'
import { useDispatch } from 'react-redux'
import { tradeRemoveActive } from '../../actions/trades'
import { uiOpenModal } from '../../actions/ui'

export const AddNewFab = () => {

    const dispatch = useDispatch()

    const openModal = () => {
        dispatch( tradeRemoveActive())
        dispatch( uiOpenModal() )
    }

    return (
        <button
            className='btn btn-primary fab animate__animated animate__backInRight'
            onClick={ openModal}
        >
            <i className='fas fa-plus'></i>
        </button>
    )
}