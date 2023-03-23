import { Col, Container, Row } from "react-bootstrap"
import { Route, Routes } from "react-router-dom"
import AdminSideBar from "./AdminSideBar"
import Users from "./api/Admin/Users/UsersInterface"

const AdminMain = () => {
    return (
        <>
            <Container fluid='true'>
                <Row>
                    <Col lg='auto' md='auto' sm='auto' xl='auto' xs='auto' xxl='auto'>
                        <AdminSideBar />
                    </Col>
                    <Col>
                        <Container fluid='true'>
                            <Routes>
                                <Route path="/reportes/*" />
                                <Route path="/usuarios/*" element={<Users />} />
                                <Route path="/material/*" />
                                <Route path="/caseteros/*" />
                            </Routes>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default AdminMain