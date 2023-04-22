import { Container } from "react-bootstrap"
import NavBarAdmin from "../NavBarAdmin"

const AdminConfiguration = ({ user }) => {

    return (
        <>
            <NavBarAdmin icon={'wrench'} title={'Configuración'} />
            <Container fluid>

            </Container>
        </>
    )
}

export default AdminConfiguration