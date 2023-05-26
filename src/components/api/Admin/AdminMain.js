import { CDBBox } from "cdbreact"
import { Container } from "react-bootstrap"
import { Route, Routes } from "react-router-dom"
import AdminSideBar from "./AdminSideBar"
import Equipment from "./Equipment/EquipmentInterface"
import Users from "./Users/UsersInterface"
import Auth from "../../../config/Auth"
import { useContext, useEffect, useState } from "react";
import axios from "axios"
import AdminConfiguration from "./Configuration/ConfigurationInterface"
import Semester from "./NewSemester/NewSemesterInterface"
import Students from "./Students/StudentsInterface"
import Teachers from "./Teachers/TeachersInterface"
import { ApiUrls } from "../ApiUrls"

const AdminMain = () => {

    const [user, setUser] = useState(null)
    const urls = useContext(ApiUrls)

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        const username = localStorage.getItem('user')
        const res = await axios.get(urls.obtainInfoUserLogged + username)
        setUser(res.data)
    }

    return (
        <Auth>
            <div><script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-EV6GHP7VHP');
</script></div>
            <Container fluid='true'>
                <CDBBox display="flex" flex="row">
                    <CDBBox><AdminSideBar /></CDBBox>
                    <CDBBox flex="fill">
                        <Routes>
                            <Route path="/reportes/*" />
                            <Route path="/usuarios/*" element={<Users user={user} />} />
                            <Route path="/equipo/*" element={<Equipment />} />
                            <Route path="/caseteros/*" />
                            <Route path="/alumnos/*" element={<Students />} />
                            <Route path="/docentes/*" element={<Teachers />} />
                            <Route path="/cambio-semestre" element={<Semester />} />
                            <Route path="/configuracion" element={<AdminConfiguration user={user} />} />
                        </Routes>
                    </CDBBox>
                </CDBBox>
                <CDBBox display="flex" style={{ backgroundColor: '#051532', height: '5vh', color: 'white' }}>
                    <CDBBox display="flex" flex="fill" alignItems="center" className="ms-5">
                        <h5 className="m-0">¡Bienvenido {user && (user.staff !== null ? user.staff.name : null)}!</h5>
                    </CDBBox>
                </CDBBox>
            </Container>
        </Auth>
    )
}
export default AdminMain