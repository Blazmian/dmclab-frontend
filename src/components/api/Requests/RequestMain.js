import { CDBBox, CDBBtn, CDBContainer, CDBDropDown, CDBIcon, CDBInput } from "cdbreact"
import { Container, Dropdown, FormGroup, Form, Row, Col, FormLabel, Button, Navbar } from "react-bootstrap"
import { Route, Routes } from "react-router-dom"
import RequestSideBar from './RequestSideBar'
import Auth from "../../../config/Auth"

const RequestsMain = (props) => {




    return (



        <Container fluid className="full-width-container" >

            <Navbar style={{ backgroundColor: '#1D3A69' }} variant="dark">
                <Container>
                    <Navbar.Brand>
                        <CDBIcon icon={props.icon} />{'    '}
                        <strong>{props.title}</strong>
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <Container fluid className="full-width-container justify-content-center">
                <CDBBox display="flex" flex="fill" className="mb-2">
                    <Form className="full-screen-form">
                        <Form.Group controlId="info-usuario">
                            <Row className="my-4">
                            <Col>
                                    <Form.Label style={{
                                        font: 'Montserrat',
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "20px",
                                        lineHeight: "22px",
                                    }} >Datos del solicitante</Form.Label>
                                </Col>
                            </Row>
                            <Row className="mb-2 mx-5">
                                
                                <Col sm={2}>
                                    <Form.Label style={{
                                        font: 'Montserrat',
                                        fontStyle: "normal",
                                        fontWeight: "500",
                                        fontSize: "14px",
                                        lineHeight: "22px",
                                    }} >Nombre</Form.Label>
                                </Col>
                                <Col sm={4} offset={1}>
                                    <Form.Control type="text" placeholder="" />
                                </Col>
                                <Col>
                                    <Form.Label style={{
                                        font: 'Montserrat',
                                        fontStyle: "normal",
                                        fontWeight: "500",
                                        fontSize: "14px",
                                        lineHeight: "22px",
                                    }} column sm={0} className="mx-5"  >Hora</Form.Label>
                                </Col>
                                <Col >
                                    <Form.Select>
                                        <option> 1</option>
                                        <option> 2</option>
                                    </Form.Select>
                                </Col>

                            </Row>
                            <Row className="align-items-center mb-2 mx-5">

                                <Form.Label style={{
                                    font: 'Montserrat',
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    lineHeight: "22px",
                                }} column sm={2}>Carrera</Form.Label>
                                <Col sm={4}>
                                    <Form.Control type="text" placeholder="" />
                                </Col>
                            </Row>
                            <Row className="align-items-centermb-2 mx-5 mb-2">
                                <Form.Label style={{
                                    font: 'Montserrat',
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    lineHeight: "22px",
                                }} column sm={2}>Materia</Form.Label>
                                <Col sm={4}>
                                    <Form.Select>
                                        <option> A</option>
                                        <option> B</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className="align-items-center mb-2 mx-5">
                                <Form.Label style={{
                                    font: 'Montserrat',
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    lineHeight: "22px",
                                }} column sm={2}>Maestro</Form.Label>
                                <Col sm={4}>
                                    <Form.Select>
                                        <option> A</option>
                                        <option> B</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>

                        <hr />
                        <FormGroup controlId="equipo" className="me-3 mb-2 mx-5" display="flex" flex="fill" >
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
                </CDBBox>
            </Container>

        </Container>


    )
}
export default RequestsMain