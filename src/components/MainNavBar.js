import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import DMCLab from '../img/light logo.png'

const MainNavBar = () => {

    const navigate = useNavigate()

    return (
        <>
            <Navbar style={{ backgroundColor: '#1D3A69' }}>
                <Container>
                    <Navbar.Brand style={{ color: 'white', fontSize: 30 }}>
                        <img src={DMCLab} alt='DMC LAB Logo' width={45} height={45} className="d-inline-block align-top me-3" />
                        <strong>TECNM</strong> Campus Hermosillo
                    </Navbar.Brand>
                    <Nav>
                        <Button variant='success' onClick={() => navigate('/login')}>
                            Iniciar Sesión
                        </Button>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default MainNavBar