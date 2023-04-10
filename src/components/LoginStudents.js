import { CDBBox, CDBBtn, CDBCard, CDBCardBody, CDBContainer, CDBInput } from "cdbreact"
import { Form, FormGroup } from "react-bootstrap"
import LogoITH from '../img/ITH.png'
import MainNavBar from "./MainNavBar"

const LoginStudents = () => {
    return (
        <>
            <div className='header-main'>
                <MainNavBar />
            </div>
            <CDBContainer style={{ height: '80vh' }}>
                <CDBBox display="flex" justifyContent="center" style={{ height: '100%' }} alignItems='center'>
                    <CDBCard style={{ width: '30rem', borderRadius: '25px', boxShadow: '0px 0px 30px 5px rgba(0, 0, 0, 0.25)' }}>
                        <div style={{ background: '#1D3A69', borderRadius: '25px 25px 0px 0px' }} className="text-center text-white">
                            <p className="h2 py-4 font-weight-bold">Laboratorio de Electrónica</p>
                        </div>
                        <CDBBox display="flex" justifyContent="center" className="my-5">
                            <img
                                src={LogoITH}
                                height={150}
                                width={150}
                            />
                        </CDBBox>
                        <CDBCardBody className="mx-5">
                            <Form>
                                <FormGroup>
                                    <Form.Label>Número de control</Form.Label>
                                    <Form.Control
                                        type='text'
                                        maxLength={10}
                                        className="mb-3"
                                        placeholder='Introduce tu número de control'
                                        style={{ borderRadius: '20px' }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Form.Label>Nip</Form.Label>
                                    <Form.Control
                                        type='password'
                                        maxLength={15}
                                        className="mb-5"
                                        placeholder='Introduce tu nip'
                                        style={{ borderRadius: '20px' }}
                                    />
                                    <CDBBox display="flex" justifyContent="center">
                                        <CDBBtn
                                            style={{ backgroundColor: '#198754', width: '10rem', height: '2.5rem', borderRadius: '20px' }}
                                            className="btn-block mb-4 mx-0"
                                        >
                                            Solicitar Material
                                        </CDBBtn>
                                    </CDBBox>
                                </FormGroup>
                            </Form>
                        </CDBCardBody>
                    </CDBCard>
                </CDBBox>
            </CDBContainer>
        </>
    )
}

export default LoginStudents