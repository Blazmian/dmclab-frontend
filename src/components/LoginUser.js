import axios from "axios"
import { CDBBox, CDBBtn, CDBCard, CDBCardBody, CDBContainer } from "cdbreact"
import { useContext, useEffect, useState } from "react"
import { Container, Form, FormGroup, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import LogoITH from '../img/ITH.png'
import { checkAuth } from "../config/Auth"
import { ApiUrls } from "./api/ApiUrls"

const Login = () => {

    const [authenticated, setAuthenticated] = useState(checkAuth());
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const urls = useContext(ApiUrls)

    useEffect(() => {
        if (authenticated) {
            navigate("/admin/reportes")
        }
    }, [authenticated])

    const navigate = useNavigate()

    const handleInputUsername = (e) => {
        setUser(e.target.value)
    }

    const handleInputPassword = (e) => {
        setPass(e.target.value)
    }

    const login = async () => {
        if ((user.length * pass.length) > 0) {
            const postData = {
                username: user,
                password: pass
            }
            const res = await axios.post(urls.loginUser, postData)
                .catch(function (error) {
                    const statusError = error.response.status
                    if (statusError === 401 || statusError === 404) {
                        toast.error('Usuario o contraseña incorrectos')
                    } else {
                        toast.error('Ocurrio un error inesperado')
                    }
                })
            if (res.status === 201) {
                toast.success(`¡Bienvenido de nuevo ${res.data.user.staff.name}!`)
                localStorage.setItem('user', res.data.user.username)
                localStorage.setItem('token', res.data.token)
                setAuthenticated(true)
                navigate('/admin/reportes')
            }
        } else {
            toast.error('Favor de introducir todos los datos')
        }
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand style={{ fontSize: 30 }}><strong>TECNM</strong> Campus Hermosillo</Navbar.Brand>
                </Container>
            </Navbar>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-EV6GHP7VHP');
            </script>
            <CDBContainer style={{ height: '80vh' }}>
                <CDBBox display="flex" justifyContent="center" style={{ height: '100%' }} alignItems='center'>
                    <CDBCard style={{ width: '30rem', borderRadius: '10px', boxShadow: '0px 0px 30px 5px rgba(0, 0, 0, 0.25)' }}>
                        <div style={{ background: '#333', borderRadius: '10px 10px 0px 0px' }} className="text-center text-white">
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
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control
                                        value={user}
                                        onChange={handleInputUsername}
                                        type='text'
                                        maxLength={10}
                                        className="mb-3"
                                        placeholder='Introduce tu nombre de usuario'
                                        style={{ borderRadius: '20px' }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        value={pass}
                                        onChange={handleInputPassword}
                                        type='password'
                                        maxLength={15}
                                        className="mb-5"
                                        placeholder='Introduce tu contraseña'
                                        style={{ borderRadius: '20px' }}
                                    />
                                    <CDBBox display="flex" justifyContent="center">
                                        <CDBBtn
                                            style={{ backgroundColor: '#198754', width: '10rem', height: '2.5rem', borderRadius: '20px' }}
                                            className="btn-block mb-4 mx-0"
                                            onClick={() => login()}
                                        >
                                            Iniciar Sesión
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

export default Login