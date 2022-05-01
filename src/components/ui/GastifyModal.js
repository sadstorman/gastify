import { DatePicker, LocalizationProvider } from '@mui/lab'
import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { uiCloseModalUpdate } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment'
import Swal from 'sweetalert2';
import { tradeStartUpdate } from '../../actions/trades';

export const GastifyModal = () => {


    const dispatch = useDispatch()
    const { modalOpenUpdate } = useSelector(state => state.ui)
    const { activeTrade } = useSelector(state => state.trades)
    const [valid, setValid] = useState(false)
    let now = moment()
    const [fecha, setFecha] = useState(now.toDate());

    const initialForm = {
        concepto: '',
        tipo: 'Food',
        monto: '',
        fecha: now.toDate(),
        ingresoegreso: 'Egress'
    }
    const [formValues, setFormValues] = useState(initialForm)
    const { concepto, tipo, monto, ingresoegreso } = formValues
    useEffect(() => {
        if (activeTrade) {
            setFormValues(activeTrade)
        } else {
            setFormValues(initialForm)
        }
    }, [activeTrade, setFormValues])
    
    const handleInputchange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    const handleClose = () => {
        dispatch(uiCloseModalUpdate())
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
        dispatch(tradeStartUpdate(formValues))
        dispatch(uiCloseModalUpdate())
        setFormValues(initialForm)
    }
    const handleStartDateChange = (e) => {
        const { _d } = e
        setFecha(_d);
        setFormValues({
            ...formValues,
            fecha: e.toDate()
        })
    };

    return (

        <Modal className='text-center' show={modalOpenUpdate} onHide={handleClose} size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header className='blue' closeButton>
                <Modal.Title>Modify trade</Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid gris">
                <Container>
                    <Row>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className=''>
                                <Col xs={12} >
                                    <Form.Select className=" form-select text-center" name="tipo" value={tipo} onChange={handleInputchange} aria-label="Default select example">
                                        <option className='text-black' defaultValue="Food">Food</option>
                                        <option className='text-black' value="Entertainment">Entertainment</option>
                                        <option className='text-black' value="Sports">Sports</option>
                                        <option className='text-black' value="Education">Education</option>
                                        <option className='text-black' value="Salary">Salary</option>
                                        <option className='text-black' value="Other">Other</option>
                                    </Form.Select>
                                    <Form.Select className=" form-select text-center bg-grey" disabled={true} name="ingresoegreso" value={ingresoegreso} onChange={handleInputchange} aria-label="Default select example">
                                        <option className='text-black' defaultValue="Egress">Egress</option>
                                        <option className='text-black' value="Entry">Entry</option>
                                    </Form.Select>
                                </Col>
                                <Col xs={12}>
                                    <Form.Control className='form-control text-center' autoComplete='off' type="text" placeholder="Concept" name="concepto" value={concepto} onChange={handleInputchange} />
                                    <Form.Control className='form-control text-center' autoComplete='off' type="number" placeholder="Amount$" name="monto" value={monto} onChange={handleInputchange} />

                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            views={['day']}
                                            name="fecha"
                                            value={fecha}
                                            onChange={handleStartDateChange}
                                            renderInput={props => <TextField {...props} value={fecha} inputProps={{readOnly:true}} variant="filled" className="calendario text-center thisnot text-white" />}
                                        />
                                    </LocalizationProvider>
                                </Col>
                            </Form.Group>

                            <div className='mt-2 g-2'>
                                <button className='w-50 btn-danger ' onClick={handleClose}>
                                    Close
                                </button>
                                <button className='w-50 btn-primary' type="submit" onClick={handleSubmit}>
                                    Save
                                </button>
                            </div>

                        </Form>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal >
    )
}


