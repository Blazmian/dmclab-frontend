import { useState } from 'react'
import { Button, Col, Container, Fade, Form, FormGroup, Nav, Navbar, Row } from 'react-bootstrap'

const MainNavBar = () => {
    const [open, setOpen] = useState(false)

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
                                <Form.Control type='text' maxLength={10} placeholder='Usuario'></Form.Control>
                            </FormGroup>
                            <FormGroup as={Col}>
                                <Form.Control type='password' maxLength={15} placeholder='Contraseña'></Form.Control>
                            </FormGroup>
                        </Row>
                    </Form>
                    </Fade>
                    <Button 
                        variant='success' 
                        onClick={() => setOpen(!open)}
                        aria-controls="login-controllers"
                        aria-expanded={open}
                        >
                            Iniciar Sesión
                    </Button>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default MainNavBar