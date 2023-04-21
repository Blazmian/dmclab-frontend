import { CDBSidebar, CDBSidebarHeader, CDBSidebarFooter, CDBSidebarContent, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact"
import { Button } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

const AdminSideBar = () => {

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
                    <strong>TECNM</strong>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink to="/admin/reportes" className={({ isActive }) => isActive ? 'activeClicked' : ""}>
                            <CDBSidebarMenuItem icon="book">Reportes</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/admin/usuarios" className={({ isActive }) => isActive ? 'activeClicked' : ""}>
                            <CDBSidebarMenuItem icon="users">Usuarios</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/admin/equipo" className={({ isActive }) => isActive ? 'activeClicked' : ""}>
                            <CDBSidebarMenuItem icon="archive">Equipo</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/admin/configuracion" className={({ isActive }) => isActive ? 'activeClicked' : ""}>
                            <CDBSidebarMenuItem icon="wrench">Configuración</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <CDBSidebarMenu>
                        <NavLink onClick={handleLogout}>
                            <CDBSidebarMenuItem icon='sign-out-alt'>Cerrar Sesión</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarFooter>

            </CDBSidebar>
        </div>
    )
}

export default AdminSideBar