import axios from "axios";
import { CDBBox } from "cdbreact";
import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { toast } from "react-toastify";
import { onlyLetters, onlyNumbers, validateModel, validateSecondLastName } from "../../../../tools/InputValidator";

const ModifyStudent = ({ student, showModal, handleClose }) => {

    // For form submit 
    const [form, setForm] = useState({
        name: student.name,            // Define un valor inicial para cada input
        firstLastName: student.first_last_name,
        secondLastName: student.second_last_name,
        semester: student.semester,
        career: student.career.career
    });

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
        const { name, firstLastName, secondLastName, semester, career } = form
        const newErrors = {}

        if (!name || name === '') {
            newErrors.name = 'Por favor introduzca el nombre'
        } else if (!onlyLetters(name)) {
            newErrors.name = 'Solo se aceptan letras'
        }
        if (!firstLastName || firstLastName === '') {
            newErrors.firstLastName = 'Por favor introduzca el primer apellido'
        } else if (!onlyLetters(firstLastName)) {
            newErrors.firstLastName = 'Solo se aceptan letras'
        }
        if (!secondLastName || secondLastName === '') {
            newErrors.secondLastName = 'Por favor introduzca el segundo apellido';
        } else if (!validateSecondLastName(secondLastName)) {
            newErrors.secondLastName = 'Solo se aceptan letras';
        }        
        if (!semester || semester === '') {
            newErrors.semester = 'Por favor introduzca el número de serie'
        } else if (!onlyNumbers(semester)) {
            newErrors.semester= 'Solo se aceptan letras y numeros'
        }
        if (!career || career === '') {
            newErrors.career = 'Por favor introduzca la carrera'
        } else if (!onlyLetters(career)) {
            newErrors.career = 'Solo se aceptan letras'
        }

        return newErrors
    }

    const handleSubmit = e => {
        e.preventDefault()
        const formErrors = validateForm()

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
            console.log("AJNASJN")
        } else {
            updateStudent()
        }
    }
    const updateStudent = async () => {
        console.log("ENCHILADASA")
        const res = await axios.put('http://localhost:8000/student/update/' + student.control_number,
            {
                name: form.name,            // Define un valor inicial para cada input
                firstLastName: form.firstLastName,
                secondLastName: form.secondLastName,
                semester: form.semester,
                career: form.career
            }
        )
        if (res.data.affected === 1) {
            toast.success('Alumno actualizado con éxito');
            setForm({
                ...form,
                name: '',
                firstLastName: '',
                secondLastName: '',
                semester: '',
                career: '',
            });
            handleClose();
        } else {
            toast.error('No se pudo actualizar el alumno. Inténtalo de nuevo más tarde.');
        }
    }
    
    return (

        <Modal show={showModal} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Modificar Equipo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder={student.name}
                            maxLength={50}
                            value={form.name}
                            onChange={(e) => setField('name', e.target.value)}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Primer Apellido</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder={student.first_last_name}
                            maxLength={30}
                            value={form.firstLastName}
                            onChange={(e) => setField('firstLastName', e.target.value)}
                            isInvalid={!!errors.firstLastName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.firstLastName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Segundo Apellido</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder={student.second_last_name}
                            maxLength={30}
                            value={form.secondLastName}
                            onChange={(e) => setField('secondLastName', e.target.value)}
                            isInvalid={!!errors.secondLastName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.secondLastName}
                        </Form.Control.Feedback>

                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Carrera</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder={student.career.career}
                            maxLength={30}
                            value={form.career}
                            onChange={(e) => setField('career', e.target.value)}
                            isInvalid={!!errors.career}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.career}
                        </Form.Control.Feedback>

                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Semestre</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder={student.semester}
                            maxLength={30}
                            value={form.semester}
                            onChange={(e) => setField('semester', e.target.value)}
                            isInvalid={!!errors.semester}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.semester}
                        </Form.Control.Feedback>

                    </Form.Group>
                    <CDBBox display="flex" justifyContent="end" className="mt-4">
                        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                        <Button type="submit" variant="primary" className="ms-3" onClick={handleSubmit}>Modificar Usuario</Button>
                    </CDBBox>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ModifyStudent