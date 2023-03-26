import { CDBIcon } from "cdbreact"
import { Container, Navbar } from "react-bootstrap"

const NavBarAdmin = (props) => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
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

export default NavBarAdmin