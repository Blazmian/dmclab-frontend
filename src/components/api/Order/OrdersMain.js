import { CDBBox } from "cdbreact"
import { Container, FormGroup, Form, Row, Col, FormLabel, Button, Navbar } from "react-bootstrap"
import DMCLAB from '../../../img/light logo.png'

const OrdersMain = () => {

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
                                <p className="m-0">Nombres Alumno</p>
                            </CDBBox>

                            <CDBBox display="flex" flex="fill" alignItems="center" mb={2}>
                                <h6 className="fw-bold mb-0 me-3" style={{ minWidth: '4em' }}>Carrera</h6>
                                <p className="m-0">Carrera</p>
                            </CDBBox>

                            <CDBBox display="flex" flex="fill" alignItems="center" mb={2}>
                                <h6 className="fw-bold mb-0 me-3" style={{ minWidth: '4em' }}>Materia</h6>
                                <Form.Select>
                                    <option> A</option>
                                    <option> B</option>
                                </Form.Select>
                            </CDBBox>

                            <CDBBox display="flex" flex="fill" alignItems="center" mb={2}>
                                <h6 className="fw-bold mb-0 me-3" style={{ minWidth: '4em' }}>Maestro</h6>
                                <Form.Select>
                                    <option> A</option>
                                    <option> B</option>
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
                                        id="option3"
                                        className="me-3"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Cañon"
                                        name="equipmentType"
                                        id="option3"
                                    />
                                </Col>
                            </Row>
                            <Row className="d-flex mb-3">
                                <Col className="d-flex">
                                    <h6 className="fw-bold mb-0" style={{ minWidth: '4em' }}>Agregar Equipo</h6>

                                </Col>
                                <Col>
                                    <Form.Select className="me-3">
                                        <option>A</option>
                                        <option>B</option>
                                    </Form.Select>
                                </Col>
                                <Col >
                                    <Button variant="success" style={{ borderRadius: '30px' }}>+</Button>
                                </Col>
                            </Row>
                            <Container>
                                <Row className="d-flex mb-2">
                                    <Col><Form.Label>Equipo</Form.Label></Col>
                                    <Col><Form.Label>Cantidad</Form.Label></Col>
                                    <hr />
                                </Row>
                                <Row className="d-flexx mb-2">
                                    <Col></Col>
                                    <Col></Col>
                                    <Col>
                                        <Button variant="danger" style={{ borderRadius: '30px' }}>-</Button>
                                    </Col>
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