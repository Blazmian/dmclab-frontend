import axios from "axios";
import { CDBBox, CDBBtn, CDBContainer, CDBIcon, CDBInput } from "cdbreact";
import React, { useContext, useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import NavBarAdmin from "../NavBarAdmin";
import ShowUsers from "./ShowUsers";
import CreateUser from "./CreateUser";
import { ApiUrls } from "../../ApiUrls";

const Users = ({ user }) => {

    const urls = useContext(ApiUrls)

    // Data of users table
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [user])

    async function getUsers() {
        if (user) {
            const res = await axios.get(urls.staff + user.staff.id)
            setUsers(res.data)
        }
    }

    // For collapse component
    const [open, setOpen] = useState(false)

    // For Add User Modal
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }

    const handleUpdateUsers = () => {
        getUsers()
    }

    return (
        <> <div>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments)}
gtag('js', new Date());

gtag('config', 'G-EV6GHP7VHP');
</script>
        </div>
            <NavBarAdmin icon={'users'} title={'Usuarios'} />
            <div><script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-EV6GHP7VHP');
</script></div>
            <CreateUser show={show} handleClose={handleClose} handleAddUser={handleUpdateUsers} />
            <CDBContainer className="mt-5 mb-3">
                <CDBBox display="flex">
                    <CDBBox display="flex" justifyContent="start">
                        <CDBBtn style={{ borderRadius: '12px' }} onClick={handleShow}>
                            <CDBIcon icon="user-plus" className="me-2" />
                            Agregar usuario
                        </CDBBtn>
                    </CDBBox>
                    <CDBBox display="flex" flex="fill" justifyContent="end">
                        <CDBInput style={{ borderRadius: '12px' }} placeholder="Buscar usuarios" className="mx-3 w-50" icon={<i className="fa fa-search text-dark"></i>} />
                        <CDBBtn style={{ borderRadius: '12px' }} color="dark" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} >
                            <CDBIcon icon="filter" className="me-2" />
                            Filtrar
                        </CDBBtn>
                    </CDBBox>

                </CDBBox>
                <Collapse in={open} className='mt-3'>
                    <CDBContainer fluid>
                        <CDBBox display="flex">
                            <CDBBox display="flex" justifyContent="start">
                                <h6>Tipo de usuarios</h6>
                            </CDBBox>
                            <CDBBox display="flex" flex="fill" justifyContent="end">
                                <h6>Por nombre</h6>
                            </CDBBox>
                        </CDBBox>
                    </CDBContainer>
                </Collapse>
            </CDBContainer>
            <ShowUsers users={users} setUsers={setUsers} handleUpdateUsers={handleUpdateUsers} />
        </>
    )
}

export default Users