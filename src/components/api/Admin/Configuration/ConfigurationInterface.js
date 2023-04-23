import { NavLink } from "react-router-dom"
import NavBarAdmin from "../NavBarAdmin"
import { CDBBox, CDBIcon, CDBSidebarContent, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact"
import { Nav } from "react-bootstrap"
import AccountConfiguration from "./AccountConfiguration"

const AdminConfiguration = ({ user }) => {

    return (
        <>
            <NavBarAdmin icon={'wrench'} title={'Configuración'} />
            <AccountConfiguration user={user} />
        </>
    )
}

export default AdminConfiguration