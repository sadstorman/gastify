import React from 'react'
import { Spinner } from 'react-bootstrap'

export const SpinnerCheck = () => {
    return (
        <div className='spiner text-center'>
            <Spinner animation="border"  variant="primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}
