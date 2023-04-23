import { CDBSidebar, CDBSidebarHeader, CDBSidebarFooter, CDBSidebarContent, CDBSidebarMenu, CDBSidebarMenuItem, CDBBox } from "cdbreact"
import { NavLink, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import DMCLABLOGO from '../../../img/DMC LAB LIGHT LOGO.png'

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
                    <CDBBox display="flex" alignItems="center">
                        <img src={DMCLABLOGO} alt="DMC LAB LOGO" style={{ width: '150px' }} />
                    </CDBBox>
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
                        <NavLink to="/admin/alumnos" className={({ isActive }) => isActive ? 'activeClicked' : ""}>
                            <CDBSidebarMenuItem icon="user-graduate">Alumnos</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/admin/docentes" className={({ isActive }) => isActive ? 'activeClicked' : ""}>
                            <CDBSidebarMenuItem icon="glasses">Docentes</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/admin/materias" className={({ isActive }) => isActive ? 'activeClicked' : ""}>
                            <CDBSidebarMenuItem icon="apple-alt">Materias</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <CDBSidebarMenu>
                        <NavLink to="/admin/cambio-semestre" className={({ isActive }) => isActive ? 'activeClicked' : ""}>
                            <CDBSidebarMenuItem icon="sync">Cambio de Semestre</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink>
                            <CDBSidebarMenuItem icon='bullhorn'>Acerca de Nosotros</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/admin/configuracion" className={({ isActive }) => isActive ? 'activeClicked' : ""}>
                            <CDBSidebarMenuItem icon="wrench">Configuración</CDBSidebarMenuItem>
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

export default AdminSideBar