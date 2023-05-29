import { CDBBox } from "cdbreact"
import EquipmentDefaultImg from '../../../../img/equipment-default-image.jpg'
import { useContext, useState } from "react"
import { Button, ButtonGroup, Container, Dropdown, DropdownButton, Form, InputGroup, Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { ApiUrls } from "../../ApiUrls"
import { onlyNumbers } from "../../../../tools/InputValidator"
import axios from "axios"

const CreateEquipment = ({ show, handleClose, handleUpdateEquipment }) => {

    const urls = useContext(ApiUrls)

    const [selectedOption, setSelectedOption] = useState('equipment')
    const [isDisabled, setIsDisabled] = useState(false)
    const [brandModelDisplay, setBrandModelDisplay] = useState('flex')
    const [isHDMI, setIsHDMI] = useState(false)

    const handleEquipmentOption = () => {
        setSelectedOption('equipment')
        form.equipment = ''
        setIsDisabled(false)
        setBrandModelDisplay('flex')
        setIsHDMI(false)
    }

    const handleProjectorOption = (type) => {
        setSelectedOption('projector')
        form.equipment = 'Proyector'
        setIsDisabled(true)
        setBrandModelDisplay('flex')
        if (type === 'hdmi') {
            setIsHDMI(true)
        } else {
            setIsHDMI(false)
        }
    }

    const handleExtensionOption = () => {
        setSelectedOption('extension')
        setIsDisabled(true)
        form.equipment = 'Extensión'
        setIsHDMI(false)
        setBrandModelDisplay('none')
    }

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
        const { equipment, number, brand, model, serial_number } = form
        const newErrors = {}

        if (!equipment || equipment === '') {
            newErrors.equipment = 'Por favor introduzca el equipo'
        }

        if (!number || number === '') {
            newErrors.number = ''
        } else if (!onlyNumbers(number)) {
            newErrors.number = 'Solo números'
        }

        if (selectedOption !== 'extension') {
            if (!brand || brand === '') {
                newErrors.brand = 'Por favor introduzca la marca'
            }

            if (!model || model === '') {
                newErrors.model = 'Por favor introduzca el modelo'
            }
        }

        if (!serial_number || serial_number === '') {
            newErrors.serial_number = 'Por favor introduzca el número serial'
        }

        return newErrors
    }

    const handleSubmit = e => {
        e.preventDefault()

        const formErrors = validateForm()

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
        } else {
            createEquipment()
        }
    }

    const createEquipment = async () => {
        var brand = '', model = '', projector = false, extension = false
        if (selectedOption !== 'extension') {
            brand = form.brand
            model = form.model
            if (selectedOption === 'projector') {
                projector = true
            }
        } else {
            extension = true
        }

        const res = await axios.post(urls.addEquipment,
            {
                equipment_name: form.equipment,
                equipment_number: form.number,
                brand: form.brand,
                model: form.model,
                serial_number: form.serial_number,
                projector: projector,
                extension: extension,
                hdmi: isHDMI,
                photo: imagePreview
            }
        )
        if (res.data === true) {
            handleUpdateEquipment()
            toast.success('Equipo agregado con exito')
            handleEquipmentOption()
            form.number = ''
            form.brand = ''
            form.model = ''
            form.serial_number = ''
            setImagePreview(EquipmentDefaultImg)
            handleClose()
        }
    }

    // For Equipment Photo
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

    const handleChangeEquipment = (event) => {
        if (event.target.value !== "-1") {
            form.equipment = event.target.value
        }
    }

    return (
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Equipos</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Container fluid>
                        <CDBBox display="flex" flex="fill" justifyContent="center" className="my-3">
                            {imagePreview ?
                                <img src={imagePreview} alt="Preview" style={{ height: '100px', width: '100px', borderRadius: '360px' }} />
                                :
                                <img src={EquipmentDefaultImg} alt="Preview" style={{ height: '100px', width: '100px', borderRadius: '360px' }}></img>
                            }
                            <CDBBox display="flex" alignItems="center">
                                <Form.Group className="ms-4">
                                    <Form.Control
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                </Form.Group>
                            </CDBBox>
                        </CDBBox>

                        <CDBBox display="flex" justifyContent="center" className="mb-3">
                            <hr style={{ width: '50%' }} />
                        </CDBBox>

                        <CDBBox display="flex" flex="fill" justifyContent="center" className="mb-4">
                            <ButtonGroup>
                                <Button variant={selectedOption === 'equipment' ? 'primary' : 'outline-primary'} onClick={handleEquipmentOption}>Equipo</Button>
                                <DropdownButton as={ButtonGroup} title="Proyector" variant={selectedOption === 'projector' ? 'primary' : 'outline-primary'}>
                                    <Dropdown.Item eventKey="1" onClick={() => handleProjectorOption('hdmi')}>HDMI</Dropdown.Item>
                                    <Dropdown.Item eventKey="2" onClick={() => handleProjectorOption('vga')}>VGA</Dropdown.Item>
                                </DropdownButton>
                                <Button variant={selectedOption === 'extension' ? 'primary' : 'outline-primary'} onClick={handleExtensionOption}>Extensión</Button>
                            </ButtonGroup>
                        </CDBBox>

                        <CDBBox display="flex" flex="fill" className="mb-4">
                            <Form.Group className="me-3" style={{ width: '30%' }}>
                                <Form.Label>Número</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>#</InputGroup.Text>
                                    <Form.Control
                                        placeholder="Número"
                                        value={form.number}
                                        onChange={(e) => setField('number', e.target.value)}
                                        isInvalid={!!errors.number}
                                    />
                                </InputGroup>
                            </Form.Group>

                            <CDBBox flex="fill">
                                <Form.Group>
                                    <Form.Label>Equipo</Form.Label>
                                    {selectedOption === 'equipment' ? (
                                        <Form.Select
                                            required
                                            onChange={(e) => setField('equipment', e.target.value)}
                                            isInvalid={!!errors.equipment}
                                            disabled={isDisabled}
                                        >
                                            <option value={'-1'}>Seleccione un material</option>
                                            <option>Multímetro Digital</option>
                                            <option>Fuente de C.D</option>
                                            <option>Osciloscopio</option>
                                            <option>Generador de Funciones</option>
                                            <option>Trazador de Curvas</option>
                                            <option>Decada</option>
                                            <option>Medidor L.C.R</option>
                                            <option>Pluma Lógica</option>
                                            <option>Unidad PU 2000</option>
                                            <option>Tarjeta EB</option>
                                            <option>Tarjeta Lab Volt</option>
                                            <option>Programador de Memorias</option>
                                            <option>Estrenador P.16</option>
                                            <option>Accesorios P.L.C.</option>
                                            <option>Multímetro de Gancho</option>
                                            <option>Quemador de Memorias</option>
                                            <option>Tarjetas Nexys II</option>
                                            <option>Cables Banana P.L.C.</option>
                                            <option>Caimancitos</option>
                                        </Form.Select>
                                    ) : (
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Introduce el equipo"
                                            maxLength={50}
                                            value={form.equipment}
                                            onChange={(e) => setField('equipment', e.target.value)}
                                            isInvalid={!!errors.equipment}
                                            disabled={isDisabled}
                                        />
                                    )}
                                    <Form.Control.Feedback type="invalid">
                                        {errors.equipment}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </CDBBox>
                        </CDBBox>

                        <CDBBox display={brandModelDisplay} flex="fill" className="mb-4">
                            <CDBBox flex="fill">
                                <Form.Group className="me-3">
                                    <Form.Label>Marca</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Introduce la marca"
                                        maxLength={30}
                                        value={form.brand}
                                        onChange={(e) => setField('brand', e.target.value)}
                                        isInvalid={!!errors.brand}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.brand}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </CDBBox>

                            <CDBBox flex="fill">
                                <Form.Group>
                                    <Form.Label>Modelo</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Introduce el modelo"
                                        maxLength={30}
                                        value={form.model}
                                        onChange={(e) => setField('model', e.target.value)}
                                        isInvalid={!!errors.model}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.model}
                                    </Form.Control.Feedback>

                                </Form.Group>
                            </CDBBox>
                        </CDBBox>

                        <Form.Group className="mb-5">
                            <Form.Label>Número serial</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Introduce el número serial"
                                maxLength={50}
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
                            <Button type="submit" variant="primary" className="ms-3" onClick={handleSubmit}>Agregar Equipo</Button>
                        </CDBBox>
                    </Container>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default CreateEquipment