import { Route, Routes } from "react-router-dom"
import AdminSideBar from "./AdminSideBar"

const AdminMain = () => {
    return (
        <>
            <AdminSideBar />
            <Routes>
                <Route path="/reportes/*" />
                <Route path="/usuarios/*" />
                <Route path="/material/*" />
                <Route path="/caseteros/*" />
            </Routes>
        </>
    )
}
export default AdminMain