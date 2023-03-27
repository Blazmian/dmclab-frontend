import axios from "axios"
import { CDBBox, CDBBtn, CDBCard, CDBCardBody, CDBContainer, CDBIcon, CDBModal, CDBModalBody, CDBModalFooter, CDBModalHeader, CDBSwitch, CDBTable, CDBTableBody, CDBTableHeader } from "cdbreact"
import { useEffect, useState } from "react"

const ShowUsers = () => {

    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
    const [state, setState] = useState({
        modal1: false,
    });

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const res = await axios.get('http://localhost:8000/staff/all')
        setUsers(res.data)
    }

    const toggle = data => () => {
        let modalNumber = 'modal' + data.nr;
        if(state) {
            setUser(data.user)
        }
        
        setState({
            ...state,
            [modalNumber]: !state[modalNumber],
        });
    };

    return (
        <>

            <CDBContainer>
                <CDBModal isOpen={state.modal1} toggle={toggle(1)} centered fade disableBackdrop>
                    <CDBModalHeader toggle={toggle(1)}>{user.name}</CDBModalHeader>
                    <CDBModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </CDBModalBody>
                    <CDBModalFooter>
                        <CDBBtn color="dark" flat onClick={toggle({nr: 1})}>
                            Close
                        </CDBBtn>
                        <CDBBtn color="primary" flat>
                            Save changes
                        </CDBBtn>
                    </CDBModalFooter>
                </CDBModal>
            </CDBContainer>
            <CDBContainer>
                <CDBTable striped hover bordered responsive maxHeight="70vh" scrollY>
                    <CDBTableHeader>
                        <tr>
                            <th>ID</th>
                            <th>Nombres</th>
                            <th>Primer Apellido</th>
                            <th>Segundo Apellido</th>
                            <th>Opciones</th>
                        </tr>
                    </CDBTableHeader>
                    <CDBTableBody>
                        {users.map((user) => (
                            <tr key={user.id} onClick={toggle({ nr: 1, user: user})}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.first_last_name}</td>
                                <td>{user.second_last_name}</td>
                                <td>
                                    <CDBBox display="flex" justifyContent="center">
                                        <CDBBtn color="danger" className="me-1" style={{ borderRadius: '10px' }}><CDBIcon icon="trash" /></CDBBtn>
                                        <CDBBtn color="info" className="ms-1" style={{ borderRadius: '10px' }}><CDBIcon icon="edit" /></CDBBtn>
                                    </CDBBox>
                                </td>
                            </tr>
                        ))}
                    </CDBTableBody>
                </CDBTable>

            </CDBContainer>
        </>
    )
}

export default ShowUsers