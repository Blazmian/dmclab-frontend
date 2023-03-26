import { CDBBox, CDBContainer, CDBInput } from "cdbreact";
import { Button, Col, Container, Row } from "react-bootstrap"
import NavBarAdmin from "../NavBarAdmin";
import ShowUsers from "./ShowUsers";

const Users = () => {


    return (
        <>
            <NavBarAdmin icon={'users'} title={'Usuarios'} />
            <Container>
                <CDBInput placeholder="Buscar usuarios" icon={<i className="fa fa-search text-dark"></i>} />
            </Container>
            <ShowUsers />
        </>
    )
}

export default Users