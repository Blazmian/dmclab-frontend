import axios from "axios";
import { CDBBox, CDBBtn, CDBContainer, CDBIcon, CDBInput } from "cdbreact";
import React, { useEffect, useState } from "react";
import { Button, Collapse, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { onlyLetters } from "../../../../tools/InputValidator";
import NavBarAdmin from "../NavBarAdmin";
import ShowUsers from "./ShowUsers";

const Users = () => {

    // Data of users table
    const [users, setUsers] = useState([])
    useEffect(() => {
        getUsers()
    }, [])

    async function getUsers() {
        const res = await axios.get('http://localhost:8000/staff/all')
        setUsers(res.data)
    }

    // For collapse component
    const [open, setOpen] = useState(false)

    // For modal component
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // For form submit
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })

        if (!!errors[field])
            setErrors({
                ...errors,
                [field]: null
            })
    }

    const validateForm = () => {
        const { names, firstLastName, secondLastName } = form
        const newErrors = {}

        if (!names || names === '') {
            newErrors.names = 'Por favor introduzca los nombres'
        }
        if (!onlyLetters(names)) {
            newErrors.names = 'Solo se aceptan letras'
        }
        if (!firstLastName || firstLastName === '') {
            newErrors.firstLastName = 'Por favor introduzca el apellido'
        }
        if (!onlyLetters(firstLastName)) {
            newErrors.firstLastName = 'Solo se aceptan letras'
        }
        if (!secondLastName || secondLastName === '') {
            newErrors.secondLastName = 'Por favor introduzca el apellido'
        }
        if (!onlyLetters(firstLastName)) {
            newErrors.secondLastName = 'Solo se aceptan letras'
        }

        return newErrors
    }

    const handleSubmit = e => {
        e.preventDefault()

        const formErrors = validateForm()

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
        } else {
            addUser()
        }
    }

    const addUser = async () => {
        const res = await axios.post('http://localhost:8000/staff',
            {
                name: form.names,
                first_last_name: form.firstLastName,
                second_last_name: form.secondLastName
            }
        )
        if (res.data === true) {
            toast.success('Usuario agregado con exito')
            form.names = ''
            form.firstLastName = ''
            form.secondLastName = ''
            handleClose()
            getUsers()
        }
    }

    return (
        <>
            <NavBarAdmin icon={'users'} title={'Usuarios'} />
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Usuarios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Introduce los nombres"
                                maxLength={50}
                                value={form.names}
                                onChange={(e) => setField('names', e.target.value)}
                                isInvalid={!!errors.names}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.names}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Primer apellido</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Introduce el primer apellido"
                                maxLength={30}
                                value={form.firstLastName}
                                onChange={(e) => setField('firstLastName', e.target.value)}
                                isInvalid={!!errors.firstLastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.firstLastName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Segundo apellido</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Introduce el segundo apellido"
                                maxLength={30}
                                value={form.secondLastName}
                                onChange={(e) => setField('secondLastName', e.target.value)}
                                isInvalid={!!errors.secondLastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.secondLastName}
                            </Form.Control.Feedback>

                        </Form.Group>
                        <CDBBox display="flex" justifyContent="end" className="mt-4">
                            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                            <Button type="submit" variant="primary" className="ms-3" onClick={handleSubmit}>Agregar Usuario</Button>
                        </CDBBox>
                    </Form>
                </Modal.Body>
            </Modal>
            <CDBContainer className="mt-5 mb-3">
                <CDBBox display="flex">
                    <CDBBox display="flex" justifyContent="start">
                        <CDBBtn style={{ borderRadius: '12px' }} onClick={handleShow}>
                            <CDBIcon icon="user-plus" className="me-2" />
                            Agregar usuario
                        </CDBBtn>
                    </CDBBox>
                    <CDBBox display="flex" flex="fill" justifyContent="end">
                        <CDBInput style={{ borderRadius: '12px' }} placeholder="Buscar usuarios" className="mx-3 w-50" icon={<i className="fa fa-search text-dark"></i>} />
                        <CDBBtn style={{ borderRadius: '12px' }} outline color="dark" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} >
                            <CDBIcon icon="filter" className="me-2" />
                            Filtrar
                        </CDBBtn>
                    </CDBBox>

                </CDBBox>
                <Collapse in={open} className='mt-3'>
                    <CDBContainer fluid>
                        <CDBBox display="flex">
                            <CDBBox display="flex" justifyContent="start">
                                <h6>Tipo de usuarios</h6>
                            </CDBBox>
                            <CDBBox display="flex" flex="fill" justifyContent="end">
                                <h6>Por nombre</h6>
                            </CDBBox>
                        </CDBBox>
                    </CDBContainer>

                </Collapse>
            </CDBContainer>
            <ShowUsers users={users} setUsers={setUsers} />
        </>
    )
}

export default Users