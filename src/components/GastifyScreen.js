import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Balance } from './Balance'
import { Lista } from './Lista'
import { AddNewFab } from './ui/AddNewFab'
import moment from 'moment'
import { uiCloseModal } from '../actions/ui'
import { tradeStartAddNew, tradeStartUpdate } from '../actions/trades'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {  DateTimePicker, LocalizationProvider } from '@mui/lab'
import { TextField } from '@mui/material';
import { DeleteEventFab } from './ui/DeleteEventFab'
import Swal from 'sweetalert2'
import { GastifyModal } from './ui/GastifyModal'
import { Button, Col, Form, Row } from 'react-bootstrap'

export const GastifyScreen = () => {
  let valor;
  let valor2;
  let total
  const dispatch = useDispatch()
  const { modalOpen, modalOpenUpdate } = useSelector(state => state.ui)
  const { activeTrade, trades } = useSelector(state => state.trades)
  const [valid, setValid] = useState(false)
  let now = moment()
  const [fecha, setFecha] = useState(now.toDate());
  const suma = trades.filter(suma => suma.ingresoegreso === 'Entry')
  const resta = trades.filter(suma => suma.ingresoegreso === 'Egress')
  valor = suma.reduce((accumulator, object) => {
    const valor1 = accumulator + parseInt(object.monto, 10)
    return valor1
  }, 0)

  valor2 = resta.reduce((accumulator, object) => {
    const valor1 = accumulator + parseInt(object.monto, 10)
    return valor1
  }, 0)

  total = valor - valor2

  const initialForm = {
    concepto: '',
    tipo: 'Food',
    monto: '',
    fecha: now.toDate(),
    ingresoegreso: 'Egress'
  }

  const [formValues, setFormValues] = useState(initialForm)
  const { concepto, tipo, monto, ingresoegreso } = formValues
  const handleInputchange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }
  // const quiteDelete = (e) => {
  //   let click = e.target.toString()
  //   const word = 'HTMLTableCellElement'
  //   if(!click.includes(word)) {
  //     dispatch( tradeRemoveActive() )
  //   }
  // }
  const cancelSubmit = () => {
    dispatch(uiCloseModal())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (tipo === '') {
      Swal.fire('Error', 'Complete todos los campos', 'error')
      return setValid(false)
    } if (monto === '') {
      Swal.fire('Error', 'Complete todos los campos', 'error')
      return setValid(false)
    } if (ingresoegreso === '') {
      Swal.fire('Error', 'Complete todos los campos', 'error')
      return setValid(false)
    }

    if (activeTrade) {
      dispatch(tradeStartUpdate(formValues))
    } else {
      dispatch(tradeStartAddNew(formValues));
    }
    dispatch(uiCloseModal())
    setFormValues(initialForm)
    
  }

  useEffect(() => {
    if (activeTrade) {
      setFormValues(activeTrade)
    } else {
      setFormValues(initialForm)
    }
  }, [activeTrade, setFormValues])
  const handleStartDateChange = (e) => {
    const { _d } = e
    setFecha(_d);
    setFormValues({
      ...formValues,
      fecha: e.toDate()
    })
  };

  return (
    <div  className='container'>

      <h1 className='text-center text-white'> GASTIFY </h1>

      <Balance total={total} />

      {((modalOpen) && <div className=' formulario container animate__animated animate__bounceIn'>

        <Form onSubmit={handleSubmit}>
          {/* 
            <Col > 
            >*/}
          <Row className="align-items-center">
            <Col sm="6" md="3" lg="3" className='mt-1 mb-1'>
              <Form.Select className=" text-center" name="tipo" value={tipo} onChange={handleInputchange} aria-label="Default select example">
                <option className='text-black' defaultValue="Food">Food</option>
                <option className='text-black' value="Entertainment">Entertainment</option>
                <option className='text-black' value="Sports">Sports</option>
                <option className='text-black' value="Education">Education</option>
                <option className='text-black' value="Salary">Salary</option>
                <option className='text-black' value="Other">Other</option>
              </Form.Select>
            </Col>

            <Col sm="6" md="3" lg="3" className='mt-1 mb-1'>
              <Form.Select className=" text-center" name="ingresoegreso" value={ingresoegreso} onChange={handleInputchange} aria-label="Default select example">
                <option className='text-black' defaultValue="Egress">Egress</option>
                <option className='text-black' value="Entry">Entry</option>
              </Form.Select>
            </Col>

            <Col sm="6" md="3" lg="3" className='mt-1 mb-1'>
              <Form.Control className=' text-center' autoComplete='off' type="text" placeholder="Concept" name="concepto" value={concepto} onChange={handleInputchange} />
            </Col>

            <Col sm="6" md="3" lg="3" className='mt-1 mb-1'>
              <Form.Control className=' text-center' autoComplete='off' type="number" placeholder="Amount$" name="monto" value={monto} onChange={handleInputchange} />
            </Col>

          </Row>
          <Row className='align-items-center justify-content-center mt-2'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                views={['day']}
                name="fecha"
                value={fecha}
                showTodayButton={true}
                onChange={handleStartDateChange}
                renderInput={props => <TextField {...props} value={fecha} inputProps={{ readOnly: true }} variant="filled" className="w-50 calendario text-center thisnot text-white" />}
              />
            </LocalizationProvider>
          </Row>
          <Row className='align-items-center justify-content-center mt-2'>
          <Button variant='danger' className='button_cancel w-25' onClick={ cancelSubmit }>
              Cancel
            </Button>
            <Button type="submit" className='button_submit w-25' onClick={handleSubmit}>
              Save
            </Button>
          </Row>
        </Form>
      </div>)}
      <Lista />
      {((!modalOpen) && < AddNewFab />)}
      {(activeTrade) && <DeleteEventFab />}
      {(modalOpenUpdate) && <GastifyModal />}
    </div >
  )
}
