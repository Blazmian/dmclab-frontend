import { useContext, useState } from 'react';
import UserDefaultImg from '../../../../img/user-default-image.jpg'
import { onlyLetters } from '../../../../tools/InputValidator';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Form, Modal } from 'react-bootstrap';
import { CDBBox } from 'cdbreact';
import { ApiUrls } from '../../ApiUrls';

const CreateUser = ({ show, handleClose, handleAddUser }) => {

    const urls = useContext(ApiUrls)

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
        } else if (!onlyLetters(names)) {
            newErrors.names = 'Solo se aceptan letras'
        }

        if (!firstLastName || firstLastName === '') {
            newErrors.firstLastName = 'Por favor introduzca el apellido'
        } else if (!onlyLetters(firstLastName)) {
            newErrors.firstLastName = 'Solo se aceptan letras'
        }

        if (!secondLastName || secondLastName === '') {
            newErrors.secondLastName = 'Por favor introduzca el apellido'
        } else if (!onlyLetters(secondLastName)) {
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
        const res = await axios.post(urls.addStaff,
            {
                name: form.names,
                first_last_name: form.firstLastName,
                second_last_name: form.secondLastName,
                photo: imagePreview
            }
        )
        if (res.data === true) {
            toast.success('Usuario agregado con exito')
            form.names = ''
            form.firstLastName = ''
            form.secondLastName = ''
            handleAddUser()
            handleClose()
        }
    }

    const [imagePreview, setImagePreview] = useState('')

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (e) => {
            setImagePreview(e.target.result)
        }
        reader.readAsDataURL(file)
    }

    return (
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Usuarios</Modal.Title>
            </Modal.Header>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-EV6GHP7VHP');
            </script>
            <Modal.Body>
                <Form>
                    <CDBBox display="flex" flex="fill" justifyContent="center" className="mb-3">
                        {imagePreview ?
                            <img src={imagePreview} alt="Preview" style={{ height: '200px', width: '200px', borderRadius: '360px' }} />
                            :
                            <img src={UserDefaultImg} alt="Preview" style={{ height: '200px', width: '200px', borderRadius: '360px' }}></img>
                        }
                    </CDBBox>
                    <Form.Group className="mb-3 mx-5">
                        <Form.Control
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 mx-5">
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

                    <Form.Group className="mb-3 mx-5">
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

                    <Form.Group className="mb-3 mx-5">
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
    )
}

export default CreateUser