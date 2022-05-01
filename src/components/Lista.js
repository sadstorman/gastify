import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { tradeSetActive, tradeStartLoading } from '../actions/trades'
import { uiOpenModalUpdate } from '../actions/ui'
import { Tooltip } from './ui/Tooltip'

export const Lista = () => {

    const trades = useSelector(state => state.trades.trades)
    const dispatch = useDispatch()

    const handleDoubleClick = (id) => {
        dispatch(tradeSetActive(id))
        dispatch(uiOpenModalUpdate())
    }
    const handleSelect = (id) => {
        dispatch(tradeSetActive(id))
    }
    useEffect(() => {
        dispatch(tradeStartLoading())
    }, [dispatch])

    return (
        <div className='container'>
            <div className='text-white  last-move  '>
                <h2 className='mb-4'>LAST MOVES: <Tooltip/> </h2>
                <Table striped hover size='sm' responsive="sm" variant="dark">
                    <thead className="text-center animate__animated animate__backInDown"><tr><th >TYPE</th><th >CONCEPT</th><th >MOVE</th><th>AMOUNT</th><th >DATE</th></tr> </thead>
                    <tbody className='' >
                        {trades.map(lista => (<tr tabIndex={1} key={lista.id} onDoubleClick={() => { handleDoubleClick(lista) }} onClick={() => { handleSelect(lista.id) }} className={` text-center trades animate__animated animate__backInRight `}><td >{lista.tipo}</td> <td >{(lista.concepto) ? lista.concepto : '-'}</td> <td className={`${(lista.ingresoegreso === 'Egress') ? 'text-danger' : 'text-success'}`}>{lista.ingresoegreso}</td><td >{lista.monto} $</td><td>{lista.fecha.toDateString()}</td></tr>))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
