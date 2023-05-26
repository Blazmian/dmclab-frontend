import { CDBBox, CDBIcon, CDBTable, CDBTableBody, CDBTableHeader } from "cdbreact"
import axios from "axios"
import { Container, FormGroup, Form, Row, Button, Navbar } from "react-bootstrap"
import DMCLAB from '../../../img/light logo.png'
import { useLocation, useNavigate } from "react-router-dom"
import React, { useState, useEffect, useContext } from "react"
import { ApiUrls } from "../ApiUrls"
import Swal from "sweetalert2"

const OrdersMain = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const urls = useContext(ApiUrls)
    const student = location.state && location.state?.student
    const [equipmentOptions, setEquipmentOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState("equipment")
    const [selectedEquipment, setSelectedEquipment] = useState('')
    const [selectedSubject, setSelectedSubject] = useState(null)
    const [selectedTeacher, setSelectedTeacher] = useState([])
    const [equipmentList, setEquipmentList] = useState([])

    const [equipment, setEquipment] = useState([])
    const [projector, setProjector] = useState([])

    useEffect(() => {
        fetchEquipmentData()
    }, [selectedOption])

    const fetchEquipmentData = async () => {
        try {
            const resEquipment = await axios.get(urls.obtainEquipmentOrder)
            const equipmentData = resEquipment.data
            setEquipment(resEquipment.data)

            const resProjector = await axios.get(urls.obtainProjectorOrder)
            const projectorData = resProjector.data
            setProjector(resProjector.data)

            let options = []

            if (selectedOption === "equipment") {
                const equipmentNames = equipmentData.map((item) => item.equipment_name)
                options = equipmentNames.reduce((acc, name) => {
                    if (!acc.includes(name)) {
                        acc.push(name)
                    }
                    return acc
                }, [])
            } else if (selectedOption === "projector") {
                options = projectorData.map((item) => {
                    if (item.hdmi) {
                        return `HDMI - ${item.equipment_number}`
                    } else {
                        return `VGA - ${item.equipment_number}`
                    }
                })
            }
            setEquipmentOptions(options)
        } catch (error) {
            console.error("Error fetching equipment data:", error)
        }
    }

    const handleSelectSubject = (subject) => {
        if (subject.target.value !== '-1') {
            setSelectedSubject(subject.target.value)
        }
    }

    useEffect(() => {
        fetchTeacherData()
    }, [selectedSubject])

    const fetchTeacherData = async () => {
        try {
            const res = await axios.get(urls.getTeacherSubject + selectedSubject)
            setSelectedTeacher(res.data.teacher)
        } catch (error) {
            console.error("Error fetching teacher data:", error)
        }
    }

    const handleAddEquipment = () => {
        if (selectedEquipment) {
            if (selectedOption === 'equipment') {
                const existingEquipment = equipmentList.find(
                    (equipment) => equipment.name === selectedEquipment
                )

                if (existingEquipment) {
                    const updatedEquipmentList = equipmentList.map((equipment) => {
                        if (equipment.name === selectedEquipment) {
                            return {
                                ...equipment,
                                quantity: equipment.quantity + 1
                            }
                        }
                        return equipment;
                    })

                    setEquipmentList(updatedEquipmentList)
                } else {
                    const newEquipment = {
                        name: selectedEquipment,
                        quantity: 1
                    }
                    setEquipmentList([...equipmentList, newEquipment])
                }
                setSelectedEquipment('')
            } else {
                const newProjector = {
                    name: selectedEquipment,
                    quantity: 1
                }
                setEquipmentList([...equipmentList, newProjector])
                setEquipmentOptions(equipmentOptions.filter(option => option !== selectedEquipment))
                setSelectedEquipment('')
            }
        }
    }

    const handleRemoveEquipment = (index) => {
        const updatedList = [...equipmentList]
        updatedList.splice(index, 1)
        setEquipmentList(updatedList)
    }

    const UserNoExist = () => {
        Swal.fire({
            icon: 'error',
            title: 'Usuario no encontrado',
            text: 'Favor de iniciar sesión para poder solicitar pedido',
        }).then(response => {
            navigate('/')
        })
    }

    const confirmCancelLoan = () => {
        Swal.fire({
            title: 'Advertencia',
            text: "¿Estas seguro de cancelar el pedido?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
            confirmButtonColor: '#f53333',
            cancelButtonText: 'No',
            reverseButtons: true
        }).then((response) => {
            if (response.isConfirmed) {
                navigate('/')
            }
        })
    }

    const confirmOrderEquipment = () => {
        Swal.fire({
            title: 'Solicitar pedido',
            text: "Estas a punto de enviar el pedido. ¿Deseas continuar?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            reverseButtons: true
        }).then((response) => {
            if (response.isConfirmed) {
                orderEquipment()
            }
        })
    }

    const orderEquipment = async () => {
        const res = await axios.post(urls.orderEquipment, {
            hours: 1,
            class: 'S8A',
            members: 1,
            student: student.control_number,
            teacher: selectedTeacher.control_number,
            subject: Number(selectedSubject),
            equipments: equipmentList
        })

        if (res.data === true) {
            Swal.fire({
                title: 'Solicitud exitosa',
                text: `Tu pedido ha sido solicitado de manera excitosa. Por favor, acercate a caseta para recoger tu pedido.`,
                icon: 'success',
                confirmButtonText: 'Ok',
            }).then((response) => {
                navigate('/')
            })
        } else {
            Swal.fire({
                title: 'Error al solicitar',
                text: `${res.data} excede del limite en stock`,
                icon: 'error',
            })
        }
    }

    return (
        <>
            {student ? (
                <>
                    <Navbar style={{ backgroundColor: '#1D3A69' }} variant="dark" expand="lg">
                        <Container>
                            <Navbar.Brand>
                                <CDBBox display="flex" flex="fill" alignItems="center">
                                    <img
                                        alt='DMCLAB Logo'
                                        src={DMCLAB}
                                        width="45"
                                        height="45"
                                    />
                                    <h3 className="m-0 ms-3"><strong>TECNM</strong> CAMPUS HERMOSILLO</h3>
                                </CDBBox>
                            </Navbar.Brand>
                        </Container>
                    </Navbar>

                    <Container style={{ flex: 1 }}>
                        <CDBBox display="flex" flex="fill" className="mb-2" justifyContent="center">
                            <Form style={{ width: '100%' }}>
                                <h4 className="fw-bold my-4">Datos del solicitante</h4>
                                <Container>
                                    <CDBBox display="flex" flex="fill" alignItems="center" mb={2}>
                                        <h6 className="fw-bold mb-0 me-3" style={{ minWidth: '4em' }}>Nombres</h6>
                                        <p className="m-0">{student.name + " " + student.first_last_name + " " + student.second_last_name}</p>
                                    </CDBBox>

                                    <CDBBox display="flex" flex="fill" alignItems="center" mb={2}>
                                        <h6 className="fw-bold mb-0 me-3" style={{ minWidth: '4em' }}>Carrera</h6>
                                        <p className="m-0">{student && student.career && student.career.career}</p>
                                    </CDBBox>

                                    <CDBBox display="flex" flex="fill" alignItems="center" mb={2}>
                                        <h6 className="fw-bold mb-0 me-3" style={{ minWidth: '4em' }}>Materia</h6>
                                        <Form.Select onChange={handleSelectSubject}>
                                            <option value="-1">
                                                Seleccione una materia
                                            </option>
                                            {student && student.enrolled && student.enrolled.map((enrollment) => (
                                                <option key={enrollment.subject.id} value={enrollment.subject.id}>
                                                    {enrollment.subject.subject}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </CDBBox>

                                    <CDBBox display="flex" flex="fill" alignItems="center" mb={2}>
                                        <h6 className="fw-bold mb-0 me-3" style={{ minWidth: '4em' }}>Maestro</h6>
                                        <p className="m-0">{selectedTeacher ? (selectedTeacher.name + " " + selectedTeacher.first_last_name + " " + selectedTeacher.second_last_name) : ''}</p>
                                    </CDBBox>

                                    <CDBBox display="flex" alignItems="center" mb={2}>
                                        <h6 className="fw-bold mb-0 me-3" style={{ minWidth: '4em' }}>Hora</h6>
                                        <Form.Select style={{ width: 'auto' }}>
                                            <option>1</option>
                                            <option>2</option>
                                        </Form.Select>
                                    </CDBBox>
                                </Container>

                                <hr className="mx-4 my-4" />
                                <FormGroup className="mb-2 mx-5">
                                    <CDBBox display="flex" flex="fill" mb={2}>
                                        <CDBBox display="flex" flex="fill" alignItems="center">
                                            <h6 className="fw-bold mb-0" style={{ minWidth: '4em' }}>Solicitar:</h6>
                                        </CDBBox>
                                        <CDBBox display="flex" flex="fill" alignItems="center">
                                            <Form.Check
                                                type="radio"
                                                label="Equipo"
                                                name="equipmentType"
                                                className="me-3"
                                                id="equipmentOption"
                                                checked={selectedOption === "equipment"}
                                                onChange={() => setSelectedOption("equipment")}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Cañon"
                                                name="equipmentType"
                                                id="projectorOption"
                                                checked={selectedOption === "projector"}
                                                onChange={() => setSelectedOption("projector")}
                                            />
                                        </CDBBox>
                                    </CDBBox>
                                    <CDBBox display="flex" flex="fill" mb={4}>
                                        <CDBBox display="flex" flex="fill" alignItems="center">
                                            <h6 className="fw-bold mb-0" style={{ minWidth: '4em' }}>Agregar Equipo</h6>
                                        </CDBBox>
                                        <CDBBox display="flex" flex="fill">
                                            <Form.Select className="me-3" onChange={(e) => setSelectedEquipment(e.target.value)} value={selectedEquipment}>
                                                {equipmentOptions.length > 0 && (
                                                    <React.Fragment>
                                                        <option value="">Seleccione una opción</option>
                                                        {equipmentOptions.map((option, index) => (
                                                            <option key={index}>{option}</option>
                                                        ))}
                                                    </React.Fragment>
                                                )}
                                            </Form.Select>
                                            <Button variant="success" size="sm" style={{ borderRadius: '30px' }} onClick={handleAddEquipment}>
                                                <CDBIcon icon="plus" />
                                            </Button>
                                        </CDBBox>
                                    </CDBBox>
                                    <div style={{ borderRadius: '10px', overflow: 'hidden' }} className="mb-5">
                                        <CDBTable striped hover responsive maxHeight="30vh" scrollY borderless className="mb-0">
                                            <CDBTableHeader>
                                                <tr style={{ textAlign: 'center', backgroundColor: '#1D3A69', color: 'white' }}>
                                                    <th>Equipo</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </CDBTableHeader>
                                            <CDBTableBody>
                                                {equipmentList.map((equipment, index) => (
                                                    <tr key={index}>
                                                        <td style={{ verticalAlign: 'middle' }}>
                                                            {equipment.name}
                                                        </td>
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{equipment.quantity}</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <Button
                                                                variant="danger"
                                                                className="fw-bold"
                                                                size="sm"
                                                                style={{ borderRadius: '30px', height: '38px' }}
                                                                onClick={() => handleRemoveEquipment(index)}
                                                            >
                                                                <CDBIcon icon="trash" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </CDBTableBody>
                                        </CDBTable>
                                    </div>
                                    <Row className="mb-2 justify-content-end" sm="4">
                                        <Button variant="danger" size="lg" onClick={confirmCancelLoan}>Cancelar</Button>
                                    </Row>
                                    <Row className="justify-content-end" sm="4">
                                        <Button variant="success" size="lg" onClick={confirmOrderEquipment}>Solicitar</Button>
                                    </Row>

                                </FormGroup>
                            </Form>
                        </CDBBox>
                    </Container>
                </>
            ) : (
                <UserNoExist />
            )}

        </>
    )
}
export default OrdersMain