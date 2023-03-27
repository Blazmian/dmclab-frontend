import { CDBBox } from "cdbreact"
import { Container } from "react-bootstrap"
import { Route, Routes } from "react-router-dom"
import AdminSideBar from "./AdminSideBar"
import Equipment from "./api/Admin/Equipment/EquipmentInterface"
import Users from "./api/Admin/Users/UsersInterface"

const AdminMain = () => {
    return (
        <>
            <Container fluid='true'>
                <CDBBox display="flex" flex="row">
                    <CDBBox><AdminSideBar /></CDBBox>
                    <CDBBox flex="fill">
                        <Routes>
                            <Route path="/reportes/*" />
                            <Route path="/usuarios/*" element={<Users />} />
                            <Route path="/equipo/*" element={<Equipment />} />
                            <Route path="/caseteros/*" />
                        </Routes>
                    </CDBBox>
                </CDBBox>
            </Container>
        </>
    )
}
export default AdminMain