import { CDBBox } from "cdbreact"
import { Container, FormGroup, Form, Row, Col, FormLabel, Button, Navbar } from "react-bootstrap"
import DMCLAB from '../../../img/light logo.png'

const RequestsMain = () => {

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
                    <Form >
                        <Form.Group>
                            <h4 className="fw-bold my-4">Datos del solicitante</h4>
                            <CDBBox display="flex" flex="fill">
                                <Container>
                                    <CDBBox display="flex" flex="fill">
                                        <Form.Label><h6 className="fw-bold">Nombres</h6></Form.Label>
                                        <p></p>
                                    </CDBBox>

                                    <CDBBox display="flex" flex="fill">
                                        <Form.Label>Carrera</Form.Label>
                                        <Form.Control type="text" placeholder="" />
                                    </CDBBox>

                                    <CDBBox display="flex" flex="fill">
                                        <Form.Label>Materia</Form.Label>
                                        <Form.Select>
                                            <option> A</option>
                                            <option> B</option>
                                        </Form.Select>
                                    </CDBBox>

                                    <CDBBox display="flex" flex="fill">
                                        <Form.Label>Maestro</Form.Label>
                                        <Form.Select>
                                            <option> A</option>
                                            <option> B</option>
                                        </Form.Select>
                                    </CDBBox>

                                    <CDBBox display="flex" flex="fill">
                                        <Form.Label>Hora</Form.Label>
                                        <Form.Select>
                                            <option> 1</option>
                                            <option> 2</option>
                                        </Form.Select>
                                    </CDBBox>
                                </Container>
                            </CDBBox>
                        </Form.Group>

                        <hr />
                        <FormGroup className="me-3 mb-2 mx-5" display="flex" flex="fill" >
                            <Row className="d-flex mb-2">
                                <Col>
                                    <FormLabel style={{
                                        font: 'Montserrat',
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "16px",
                                        lineHeight: "22px",
                                    }} >Solicitar:</FormLabel>
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="radio"
                                        label="Equipo"
                                        name="radioOptions"
                                        id="option3"
                                    /></Col>
                                <Col><Form.Check
                                    type="radio"
                                    label="Cañon"
                                    name="radioOptions"
                                    id="option3"
                                /></Col>
                            </Row>
                            <Row className="d-flex mb-2">
                                <Col>
                                    <Form.Label>Agregar Equipo</Form.Label></Col>
                                <Col><Form.Select>
                                    <option>A</option>
                                    <option>B</option>
                                </Form.Select>
                                </Col>
                                <Col><Button>+</Button></Col>
                            </Row>
                            <Row className="d-flex mb-2">
                                <Col><Form.Label>Equipo</Form.Label></Col>
                                <Col><Form.Label>Cantidad</Form.Label></Col>
                                <hr />
                            </Row>
                            <Row className="d-flex mb-2">
                                <Col></Col>
                                <Col></Col>
                                <Col><Button>-</Button></Col>
                            </Row>
                            <Row className="justify-content-end mb-2" sm="4" >
                                <Button className="fixed-button">Cancelar</Button>
                            </Row>
                            <Row className="justify-content-end mb-2" sm="4" >
                                <Button className="fixed-button">Solicitar</Button>
                            </Row>
                        </FormGroup>


                    </Form>
                </CDBBox >
            </Container >

        </Container >


    )
}
export default RequestsMain