import axios from 'axios'
import { useState } from 'react'
import { Button, Col, Container, Fade, Form, FormGroup, Nav, Navbar, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const MainNavBar = () => {
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const navigate = useNavigate()

    const handleInputUsername = (e) => {
        setUser(e.target.value)
    }

    const handleInputPassword = (e) => {
        setPass(e.target.value)
    }

    const login = async () => {
        if (!open) {
            setOpen(true)
        } else {
            if ((user.length * pass.length) > 0) {
                const postData = {
                    username: user,
                    password: pass
                }
                const res = await axios.post('http://localhost:8000/auth/login', postData)
                    .catch(function (error) {
                        const statusError = error.response.status
                        if (statusError === 401 || statusError === 404) {
                            toast.error('Usuario o contraseña incorrectos')
                        } else {
                            toast.error('Ocurrio un error inesperado')
                        }
                    })
                if (res.status === 201) {
                    localStorage.setItem('token', res.data.token)
                    navigate('/admin/reportes')
                }
            } else {
                toast.error('Favor de introducir todos los datos')
            }
        }
    }

    return (
        <>
            <Navbar bg='dark' variant='dark' expand="lg">
                <Container>
                    <Navbar.Brand><strong>TECNM</strong> Campus Hermosillo</Navbar.Brand>
                    <Nav>
                        <Fade in={open}>
                            <Form id="login-controllers" className='me-5'>
                                <Row>
                                    <FormGroup as={Col}>
                                        <Form.Control value={user} onChange={handleInputUsername} type='text' maxLength={10} placeholder='Usuario'></Form.Control>
                                    </FormGroup>
                                    <FormGroup as={Col}>
                                        <Form.Control value={pass} onChange={handleInputPassword} type='password' maxLength={15} placeholder='Contraseña'></Form.Control>
                                    </FormGroup>
                                </Row>
                            </Form>
                        </Fade>
                        <Button
                            type='submit'
                            variant='success'
                            onClick={login}
                            aria-controls="login-controllers"
                            aria-expanded={open}>
                            Iniciar Sesión
                        </Button>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default MainNavBar