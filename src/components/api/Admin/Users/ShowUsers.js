import axios from "axios"
import { CDBAccordion, CDBBox, CDBBtn, CDBContainer, CDBIcon, CDBModal, CDBModalBody, CDBModalFooter, CDBModalHeader, CDBSwitch, CDBTable, CDBTableBody, CDBTableHeader } from "cdbreact"
import { useEffect, useState } from "react"
import BadgesUsers from "./BadgesUsers"

const ShowUsers = ({users, setUsers}) => {

    const [user, setUser] = useState([])
    const [state, setState] = useState({
        modal1: false,
    })


    const toggle = data => () => {
        let modalNumber = 'modal' + data.nr

        setUser(data.user)
        setState({
            ...state,
            [modalNumber]: !state[modalNumber],
        })
    }

    const data = [
        {
            title: 'Administrador',
            content:
                <CDBContainer fluid className="mt-3">
                    <CDBBox display="flex" flex="fill">
                        <CDBBox justifyContent="start" display="flex">Hacer Administrador</CDBBox>
                        <CDBBox justifyContent="end" display="flex" flex="fill">
                            <CDBSwitch />
                        </CDBBox>
                    </CDBBox>
                </CDBContainer>,
        },
        {
            title: 'Casetero',
            content: ` nibh, sollicitudin fringilla ante placerat eget. In in vulputate neque. Mputate tellus ut sodales interdum. Nam non diam aliquam, iaculis enim vitae, imperdiet eros. Praesent lacinia pretium ante, quis rhon Donec sed lectus diam. Quisque a vehicula tortor, at viverra quam. Vecus ex auris eu tortor in est porttitor efficiturFusce sit amet purus id lacCurabitur posuere ligulaus rutrum dapibus. Fusce et dictum nisi, in vs lacus. Nam sit amet mauris ut sapien varius tincidunt in in velit.stibolutpat leo. in vel risus. Aliquam dignissim lectus sit amet odio malesuada eleifend. Quisque ligula erat, vestibulum vel massa nec, lobortis convalliulum posuere sem eu erat egestas, ut tempor sem ultrices. Curabitur vulaliquam vitae. Maecenas et eros nec leo ultrices rhoncus eget ac odio.`,
        }
    ]

    return (
        <>
            <CDBContainer>
                <CDBModal isOpen={state.modal1} toggle={toggle({ nr: 1, user: user })} centered fade disableBackdrop>
                    <CDBModalHeader>{user.name + " " + user.first_last_name + " " + user.second_last_name}</CDBModalHeader>
                    <CDBModalBody>
                        <CDBAccordion data={data} />
                    </CDBModalBody>
                    <CDBModalFooter>
                        <CDBBtn color="dark" flat onClick={toggle({ nr: 1, user: user })}>Cancelar</CDBBtn>
                        <CDBBtn color="primary" flat>Guardar cambios</CDBBtn>
                    </CDBModalFooter>
                </CDBModal>
            </CDBContainer>
            <CDBContainer>
                <CDBTable striped hover bordered responsive maxHeight="70vh" scrollY>
                    <CDBTableHeader>
                        <tr style={{ textAlign: 'center' }}>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Nombres</th>
                            <th>Primer Apellido</th>
                            <th>Segundo Apellido</th>
                            <th>Opciones</th>
                        </tr>
                    </CDBTableHeader>
                    <CDBTableBody>
                        {users.map((user) => (
                            <tr key={user.id} onClick={toggle({ nr: 1, user: user })}>
                                <td style={{ textAlign: 'center' }}>{user.id}</td>
                                <td style={{ textAlign: 'center' }}><BadgesUsers user={user} /></td>
                                <td>{user.name}</td>
                                <td>{user.first_last_name}</td>
                                <td>{user.second_last_name}</td>
                                <td style={{ textAlign: 'center' }}>
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