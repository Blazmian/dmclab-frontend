import axios from "axios";
import { CDBBox } from "cdbreact";
import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { toast } from "react-toastify";
import { onlyLetters, validateModel } from "../../../../tools/InputValidator";
import EquipmentDefaultImg from '../../../../img/equipment-default-image.jpg'

const ModifyEquipment = ({ equipment, showModal, handleClose }) => {

    // For form submit

    const [imageEquipment, setImageEquipment] = useState(EquipmentDefaultImg)
    useEffect(() => {
        if (equipment.id) {
            obtainImageEquipment();
        }
    }, [equipment.id]);
    const obtainImageEquipment = async () => {
        if (equipment.length !== 0) {
            console.log(equipment.id)
            const res = await axios.get('http://localhost:8000/equipment/one/photo/' + equipment.id, { responseType: 'arraybuffer' })
            if (res.data.byteLength > 0) {
                let binary = '';
                const bytes = new Uint8Array(res.data);
                const len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                setImageEquipment(binary)
            } else {
                setImageEquipment(EquipmentDefaultImg)
            }
        }
    }
    const [form, setForm] = useState({
        name: equipment.equipment_name,            // Define un valor inicial para cada input
        brand: equipment.brand,
        model: equipment.model,
        serial_number: equipment.serial_number,
        photo: imageEquipment
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
        const { name, brand, model, serial_number } = form
        const newErrors = {}

        if (!name || name === '') {
            newErrors.name = 'Por favor introduzca el nombre'
        } else if (!onlyLetters(name)) {
            newErrors.name = 'Solo se aceptan letras'
        }
        if (!brand || brand === '') {
            newErrors.brand = 'Por favor introduzca la marca'
        } else if (!onlyLetters(brand)) {
            newErrors.brand = 'Solo se aceptan letras'
        }
        if (!model || model === '') {
            newErrors.model = 'Por favor introduzca el modelo'
        } else if (!validateModel(model)) {
            newErrors.model= 'Solo se aceptan letras'
        }
        if (!serial_number || serial_number === '') {
            newErrors.serial_number = 'Por favor introduzca el número de serie'
        } else if (!validateModel(serial_number)) {
            newErrors.serial_number= 'Solo se aceptan letras y numeros'
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
            updateEquipment()
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

    const updateEquipment = async () => {
        const res = await axios.put('http://localhost:8000/equipment/update/' + equipment.id,
            {
                name: form.equipment_name,            // Define un valor inicial para cada input
                brand: form.brand,
                model: form.model,
                serial_number: form.serial_number,
                photo: imagePreview
            }
        )
        if (res.data.affected === 1) {
            toast.success('Equipo actualizado con éxito');
            setForm({
                ...form,
                name: '',
                brand: '',
                model: '',
                serial_number: '',
            });
            handleClose();
        } else {
            toast.error('No se pudo actualizar el equipo. Inténtalo de nuevo más tarde.');
        }
    }   
    
    return (

        <Modal show={showModal} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Modificar Equipo</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <CDBBox display="flex" flex="fill" justifyContent="center" className="mb-3">
                        {imagePreview ?
                            <img src={imagePreview} alt="Preview" style={{ height: '200px', width: '200px', borderRadius: '360px' }} />
                            :
                            <img src={imageEquipment} alt="Preview" style={{ height: '200px', width: '200px', borderRadius: '360px' }}></img>
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
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder={equipment.equipment_name}
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
                        <Form.Label>Marca</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder={equipment.brand}
                            maxLength={30}
                            value={form.brand}
                            onChange={(e) => setField('brand', e.target.value)}
                            isInvalid={!!errors.brand}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.brand}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder={equipment.model}
                            maxLength={30}
                            value={form.model}
                            onChange={(e) => setField('model', e.target.value)}
                            isInvalid={!!errors.model}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.model}
                        </Form.Control.Feedback>

                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Serial</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder={equipment.serial_number}
                            maxLength={30}
                            value={form.serial_number}
                            onChange={(e) => setField('serial_number', e.target.value)}
                            isInvalid={!!errors.serial_number}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.serial_number}
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

export default ModifyEquipment