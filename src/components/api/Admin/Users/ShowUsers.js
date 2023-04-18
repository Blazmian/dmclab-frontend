import { CDBContainer, CDBTable, CDBTableBody, CDBTableHeader } from "cdbreact"
import { useState } from "react"
import BadgesUsers from "./BadgesUsers"
import ShowInfoUser from "./ShowInfoUser"

const ShowUsers = ({ users, setUsers, handleUpdateUsers }) => {

    const [user, setUser] = useState([])

    // For modal component
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = (user) => {
        setUser(user)
        handleShow()
    }

    return (
        <>
            <ShowInfoUser show={show} handleClose={handleClose} handleUpdateUsers={handleUpdateUsers} user={user} />
            <CDBContainer>
                <CDBTable striped hover bordered responsive maxHeight="70vh" scrollY>
                    <CDBTableHeader>
                        <tr style={{ textAlign: 'center' }}>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Nombres</th>
                            <th>Primer Apellido</th>
                            <th>Segundo Apellido</th>
                        </tr>
                    </CDBTableHeader>
                    <CDBTableBody>
                        {users.map((user) => (
                            <tr key={user.id} onClick={() => handleClick(user)}>
                                <td style={{ textAlign: 'center' }}>{user.id}</td>
                                <td style={{ textAlign: 'center' }}><BadgesUsers user={user} /></td>
                                <td>{user.name}</td>
                                <td>{user.first_last_name}</td>
                                <td>{user.second_last_name}</td>
                            </tr>
                        ))}
                    </CDBTableBody>
                </CDBTable>
            </CDBContainer>
        </>
    )
}

export default ShowUsers