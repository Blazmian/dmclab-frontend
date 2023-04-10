import axios from "axios"
import { CDBBox, CDBBtn, CDBContainer, CDBIcon, CDBTable, CDBTableBody, CDBTableHeader } from "cdbreact"
import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import BadgesUsers from "./BadgesUsers"
import EditUser from "./EditUser"
import TypeUser from "./UserTypeModal"

const ShowUsers = ({ users, setUsers }) => {

    const [user, setUser] = useState([])
    const [admin, setAdmin] = useState([])
    const [receptionist, setReceptionist] = useState([])

    async function getUsers() {
        const res = await axios.get('http://localhost:8000/staff/all')
        setUsers(res.data)
    }

    // For modal component
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // For edit modal component
    const [showModal, setShowModal] = useState(false);
    const handleCloseEdit = () => setShowModal(false);
    const handleShowEdit = () => setShowModal(true);

    const modalController = (data) => {
        setUser(data.user)
        setAdmin(data.user.admin)
        setReceptionist(data.user.receptionist)
        if (!data.delete && !data.update) {
            handleShow()
        } else if (data.delete) {
            confirmDeleteUser(data.user)
        } else {
            handleShowEdit()
        }
    }

    const confirmDeleteUser = (user) => {
        Swal.fire({
            title: '¿Estas seguro de eliminar el usuario ' + user.name + '?',
            text: "Esto no se podrá revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Borrar usuario',
            confirmButtonColor: '#f53333',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((response) => {
            if (response.isConfirmed) {
                deleteUser(user.id)
            }
        })
    }

    const deleteUser = async (id) => {
        const res = await axios.delete('http://localhost:8000/staff/delete/' + id)
        if (res.data.affected === 1) {
            toast.info('Usuario eliminado con exito')
            getUsers()
        } else {
            toast.error('No se pudo eliminar el usuario')
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{user.name + " " + user.first_last_name + " " + user.second_last_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TypeUser user={user} admin={admin} receptionist={receptionist} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
            <EditUser showModal={showModal} handleClose={handleCloseEdit} />
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
                            <tr key={user.id}>
                                <td style={{ textAlign: 'center' }} onClick={() => modalController({ user: user, delete: false, update: false })}>{user.id}</td>
                                <td style={{ textAlign: 'center' }} onClick={() => modalController({ user: user, delete: false, update: false })}><BadgesUsers user={user} /></td>
                                <td onClick={() => modalController({ user: user, delete: false, update: false })}>{user.name}</td>
                                <td onClick={() => modalController({ user: user, delete: false, update: false })}>{user.first_last_name}</td>
                                <td onClick={() => modalController({ user: user, delete: false, update: false })}>{user.second_last_name}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <CDBBox display="flex" justifyContent="center">
                                        <CDBBtn
                                            color="danger"
                                            className="me-1"
                                            style={{ borderRadius: '10px' }}
                                            onClick={() => modalController({ user: user, delete: true, update: false })}
                                        >
                                            <CDBIcon icon="trash" />
                                        </CDBBtn>
                                        
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