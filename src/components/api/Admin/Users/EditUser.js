import axios from "axios";
import { CDBBox } from "cdbreact";
import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { toast } from "react-toastify";
import { onlyLetters } from "../../../../tools/InputValidator";
import UserDefaultImg from '../../../../img/user-default-image.jpg'

const EditUser = ({ user, showModal, handleClose }) => {

    // For form submit

    const [imageUser, setImageUser] = useState(UserDefaultImg)
    useEffect(() => {
        if (user.id) {
            obtainImageUser();
        }
        // eslint-disable-next-line
    }, [user.id]);
    const obtainImageUser = async () => {
        if (user.length !== 0) {
            console.log(user.id)
            const res = await axios.get('http://localhost:8000/staff/one/photo/' + user.id, { responseType: 'arraybuffer' })
            if (res.data.byteLength > 0) {
                let binary = '';
                const bytes = new Uint8Array(res.data);
                const len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                setImageUser(binary)
            } else {
                setImageUser(UserDefaultImg)
            }
        }
    }
    const [form, setForm] = useState({
        names: user.name,            // Define un valor inicial para cada input
        firstLastName: user.first_last_name,
        secondLastName: user.second_last_name,
        photo: imageUser
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
        } else if (!onlyLetters(firstLastName)) {
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
            updateUser()
        }
    }
    const [imagePreview, setImagePreview] = useState('')

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result); // Asignar los datos binarios de la imagen
            };
            reader.readAsDataURL(file);
        }
    };

    const updateUser = async () => {
        const res = await axios.put('http://localhost:8000/staff/update/' + user.id,
            {
                name: form.names,
                first_last_name: form.firstLastName,
                second_last_name: form.secondLastName,
                photo: imagePreview || imageUser
            }
        )
        if (res.data.affected === 1) {
            toast.success('Usuario actualizado con éxito');
            setForm({
                ...form,
                names: '',
                firstLastName: '',
                secondLastName: '',
            });
            handleClose();
        } else {
            toast.error('No se pudo actualizar el usuario. Inténtalo de nuevo más tarde.');
        }
    }

    return (

        <Modal show={showModal} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Modificar Usuario</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <CDBBox display="flex" flex="fill" justifyContent="center" className="mb-3">
                        {imagePreview ?
                            <img src={imagePreview} alt="Preview" style={{ height: '200px', width: '200px', borderRadius: '360px' }} />
                            :
                            <img src={imageUser} alt="Preview" style={{ height: '200px', width: '200px', borderRadius: '360px' }}></img>
                        }
                    </CDBBox>
                    <Form.Group className="mb-3 mx-5">
                        <Form.Control
                            type="file"                            
                            onChange={handleImageChange}
                            accept="image/*"
                        />

                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder={user.name}
                            maxLength={50}
                            value={form.names}
                            onChange={(e) => setField('names', e.target.value)}
                            isInvalid={!!errors.names}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.names}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Primer apellido</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder={user.first_last_name}
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
                        <Form.Label>Segundo apellido</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder={user.second_last_name}
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
                        <Button type="submit" variant="primary" className="ms-3" onClick={handleSubmit}>Modificar Usuario</Button>
                    </CDBBox>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditUser