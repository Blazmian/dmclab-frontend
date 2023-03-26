import axios from "axios"
import { CDBContainer, CDBTable, CDBTableBody, CDBTableHeader } from "cdbreact"
import { useEffect, useState } from "react"

const ShowUsers = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const testClickEvent = (param, event) => {
        
        if (event.type === 'contextmenu') {
            alert('User: ' + param.name)
        }
    }

    const handleClick = (e) => {
        if (e.type === 'contextmenu') {
            console.log('haosao')
        }
    }

    const getUsers = async () => {
        const res = await axios.get('http://localhost:8000/staff/all')
        setUsers(res.data)
    }

    return (
        <>
            <CDBContainer>
                <CDBTable hover bordered>
                    <CDBTableHeader>
                        <tr>
                            <th>ID</th>
                            <th>Nombres</th>
                            <th>Primer Apellido</th>
                            <th>Segundo Apellido</th>
                            <th>Administrador</th>
                            <th>Casetero</th>
                        </tr>
                    </CDBTableHeader>
                    <CDBTableBody>
                        {users.map((user) => (
                            <tr key={user.id} onClick={(e) => { testClickEvent(user, e) }} onContextMenu={ handleClick }>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.first_last_name}</td>
                                <td>{user.second_last_name}</td>
                                <td>{user.second_last_name}</td>
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