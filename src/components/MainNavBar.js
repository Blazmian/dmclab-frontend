import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const MainNavBar = () => {
    
    const navigate = useNavigate()

    return (
        <>
            <Navbar style={{ backgroundColor: '#1D3A69' }}>
                <Container>
                    <Navbar.Brand style={{ color: 'white', fontSize: 30 }}><strong>TECNM</strong> Campus Hermosillo</Navbar.Brand>
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