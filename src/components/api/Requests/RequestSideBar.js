import { CDBSidebar, CDBSidebarHeader, CDBSidebarFooter, CDBSidebarContent, CDBSidebarMenu, CDBSidebarMenuItem, CDBBox } from "cdbreact"
import { NavLink, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import DMCLABLOGO from '../../../img/DMC LAB LIGHT LOGO.png'

const RequestSideBar = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        Swal.fire({
            title: '¿Estas seguro de cerrar sesion?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Cerrar sesión',
            confirmButtonColor: '#f53333',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((response) => {
            if (response.isConfirmed) {
                window.localStorage.clear()
                navigate('/')
            }
        })
    }

    return (
        <div style={{ display: 'flex', height: '95vh', overflow: 'scroll initial' }}>
            <CDBSidebar backgroundColor="#193158" textColor="#fff" toggled>
                <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
                    <CDBBox display="flex" alignItems="center">
                        <img src={DMCLABLOGO} alt="DMC LAB LOGO" style={{ width: '150px' }} />
                    </CDBBox>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink to="/solicitar-equipo/" className={({ isActive }) => isActive ? 'activeClicked' : ""}>
                            <CDBSidebarMenuItem icon="book">Reportes</CDBSidebarMenuItem>
                        </NavLink>
                        
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <CDBSidebarMenu>
                        <NavLink>
                            <CDBSidebarMenuItem icon='bullhorn'>Acerca de Nosotros</CDBSidebarMenuItem>
                        </NavLink>
                        
                        <NavLink onClick={handleLogout}>
                            <CDBSidebarMenuItem icon='sign-out-alt'>Cerrar Sesión</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarFooter>

            </CDBSidebar>
        </div>
    )
}

export default RequestSideBar