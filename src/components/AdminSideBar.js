import { CDBSidebar, CDBSidebarHeader, CDBSidebarFooter, CDBSidebarContent, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact"
import { NavLink } from "react-router-dom"

const AdminSideBar = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar backgroundColor="#1D3A69">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                        <strong>TECNM</strong>
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="admin/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns">Reportes</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="admin/tables" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Usuarios</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="admin/profile" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Material</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="admin/analytics" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line">Casetero</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 5px',
                        }}
                    >
                        Campus Hermosillo
                    </div>
                </CDBSidebarFooter>

            </CDBSidebar>
        </div>
    )
}

export default AdminSideBar