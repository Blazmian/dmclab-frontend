import { CDBSidebar, CDBSidebarHeader, CDBSidebarFooter, CDBSidebarContent, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact"
import { NavLink } from "react-router-dom"

const AdminSideBar = () => {
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
                        <NavLink to="/logout">
                            <CDBSidebarMenuItem icon='sign-out-alt'>Cerrar Sesión</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarFooter>

            </CDBSidebar>
        </div>
    )
}

export default AdminSideBar