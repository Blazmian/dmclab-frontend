import { Button, Container, Navbar } from "react-bootstrap"
import LogoDMC from '../../../img/DMC LAB LIGHT LOGO.png'
import { CDBBox } from "cdbreact"
import { Route, Routes } from "react-router-dom"
import Orders from "./Orders/OrdersInterface"
import ReceptionistSideBar from "./ReceptionistSideBar"

const ReceptionistMain = () => {
    return (
        <CDBBox display="flex" flex="column" style={{ height: '100vh' }}>
            <div>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-EV6GHP7VHP');
</script>
            </div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar>
                        <CDBBox display="flex" alignItems="center">
                            <img
                                alt="DMCLAB Logo"
                                src={LogoDMC}
                                height="35px"
                            />
                        </CDBBox>
                    </Navbar>
                    <CDBBox display="flex" className="me-3" alignItems="center">
                        <h6 className="mb-0 me-3" style={{ color: 'white' }}>¡Bienvenido Casetero!</h6>
                        <Button variant="danger">Cerrar Sesión</Button>
                    </CDBBox>
                </Container>
            </Navbar>
            <CDBBox display="flex" flex="fill">
                <ReceptionistSideBar />
                <Routes>
                    <Route path="/pedidos" element={<Orders />} />
                    <Route path="/solicitudes" />
                    <Route path="/reportes" />
                </Routes>
            </CDBBox>
        </CDBBox>

    )
}

export default ReceptionistMain