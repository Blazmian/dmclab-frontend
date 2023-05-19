import { CDBBox } from "cdbreact"
import axios from "axios"
import { Container, FormGroup, Form, Row, Col, FormLabel, Button, Navbar } from "react-bootstrap"
import DMCLAB from '../../../img/light logo.png'
import { useLocation } from "react-router-dom"
import React, { useState, useEffect } from "react"



const OrdersMain = () => {

    //ALUMNO
    const location = useLocation();
    const student = location.state && location.state?.student;
    //EQUIPO
    const [equipmentOptions, setEquipmentOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedEquipment, setSelectedEquipment] = useState('');
    const [equipmentList, setEquipmentList] = useState([]);
    

    const fetchEquipmentData = async () => {
        try {
            const resEquipment = await axios.get("http://localhost:8000/equipment/equipment-order");
            const equipmentData = resEquipment.data;
            const resProjector = await axios.get("http://localhost:8000/equipment/projector-order");
            const projectorData = resProjector.data;
            let options = []
            // Procesa los datos recibidos y obtén las opciones para el Form.Select
            if (selectedOption === "equipment") {
                options = equipmentData.map((item) => item.equipment_name);
            } else if (selectedOption === "projector") {
                options = projectorData.map((item) => item.equipment_name);
            }


            // Establece las opciones en el estado
            setEquipmentOptions(options);
        } catch (error) {
            console.error("Error fetching equipment data:", error);
        }
    };

    useEffect(() => {
        fetchEquipmentData();
    }, [selectedOption]);



    const handleAddEquipment = () => {
        if (selectedEquipment) {
            setEquipmentList([...equipmentList, selectedEquipment]);
            setSelectedEquipment('');
        }
    };
    const handleRemoveEquipment = (index) => {
        const updatedList = [...equipmentList];
        updatedList.splice(index, 1);
        setEquipmentList(updatedList);
      };

    return (
        <Container fluid className="p-0">

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

            <Container fluid>
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
                                <p className="m-0">Carrera</p>
                            </CDBBox>

                            <CDBBox display="flex" flex="fill" alignItems="center" mb={2}>
                                <h6 className="fw-bold mb-0 me-3" style={{ minWidth: '4em' }}>Materia</h6>
                                <Form.Select>
                                    {student && student.enrolled && student.enrolled.map((enrollment) => (
                                        <option key={enrollment.subject}>
                                            {enrollment.subject.subject}
                                        </option>
                                    ))}
                                </Form.Select>
                            </CDBBox>

                            <CDBBox display="flex" flex="fill" alignItems="center" mb={2}>
                                <h6 className="fw-bold mb-0 me-3" style={{ minWidth: '4em' }}>Maestro</h6>
                                <Form.Select>
                                    {student && student.enrolled && student.enrolled.map((enrollment) => (
                                        <option key={enrollment.subject.teacher.control_number}>
                                            {enrollment.subject.teacher.name + " " + enrollment.subject.teacher.first_last_name + " " + enrollment.subject.teacher.second_last_name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </CDBBox>

                            <CDBBox display="flex" alignItems="center" mb={2}>
                                <h6 className="fw-bold mb-0 me-3" style={{ minWidth: '4em' }}>Hora</h6>
                                <Form.Select style={{ width: 'auto' }}>
                                    <option>1</option>
                                    <option>2</option>
                                </Form.Select>
                            </CDBBox>
                        </Container>

                        <hr className="mx-4" />
                        <FormGroup className="mb-2 mx-5">
                            <Row className="d-flex mb-2">
                                <Col>
                                    <h6 className="fw-bold mb-0" style={{ minWidth: '4em' }}>Solicitar:</h6>
                                </Col>
                                <Col className="d-flex">
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
                                </Col>
                            </Row>
                            <Row className="d-flex mb-3">
                                <Col className="d-flex">
                                    <h6 className="fw-bold mb-0" style={{ minWidth: '4em' }}>Agregar Equipo</h6>

                                </Col>
                                <Col>
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
                                </Col>


                                <Col >
                                    <Button variant="success" style={{ borderRadius: '30px' }} onClick={handleAddEquipment}>+</Button>
                                </Col>
                            </Row>
                            <Container>
                                <Row className="d-flex mb-2">
                                    <Col><Form.Label>Equipo</Form.Label></Col>
                                    <Col><Form.Label>Cantidad</Form.Label></Col>
                                    <hr />
                                </Row>
                                <Row>
                                    
                                    <Col> {equipmentList.map((equipment, index) => (
                                        
                                        <Row key={index} className="d-flex mb-2">
                                        <Col className="mb-3">
                                          <label>{equipment}</label>
                                        </Col>
                                       <Col></Col> 
                                        <Col>
                                          <Button
                                            variant="danger"
                                            style={{ borderRadius: '30px' }}
                                            onClick={() => handleRemoveEquipment(index)}
                                          >
                                            -
                                          </Button>
                                        </Col>
                                      </Row>
                                    ))}</Col>
                                </Row>
                                <Row className="d-flexx mb-2">
                                </Row>
                            </Container>
                            <Container className="mt-5">
                                <Row className="mb-2 justify-content-end" sm="4">
                                    <Button variant="danger" size="lg">Cancelar</Button>
                                </Row>
                                <Row className="justify-content-end" sm="4">
                                    <Button variant="success" size="lg">Solicitar</Button>
                                </Row>
                            </Container>
                        </FormGroup>
                    </Form>
                </CDBBox>
            </Container>
        </Container>
    )
}
export default OrdersMain