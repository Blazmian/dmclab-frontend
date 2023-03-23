import { CDBSidebar, CDBSidebarHeader, CDBSidebarFooter, CDBSidebarContent, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact"
import { NavLink } from "react-router-dom"

const AdminSideBar = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar backgroundColor="#333" textColor="#fff" toggled>
                <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
                    <strong>TECNM</strong>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink to="/admin/reportes" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="book">Reportes</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/admin/usuarios" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="users">Usuarios</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/admin/equipo" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="archive">Equipo</CDBSidebarMenuItem>
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