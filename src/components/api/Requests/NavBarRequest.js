import { CDBIcon } from "cdbreact"
import { Container, Navbar } from "react-bootstrap"

const NavBarRequest = (props) => {
    return (
        <>
            <Navbar style={{ backgroundColor: '#1D3A69'}} variant="dark">
                <Container>
                    <Navbar.Brand>
                        <CDBIcon icon={props.icon} />{'    '}
                        <strong>{props.title}</strong>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBarRequest