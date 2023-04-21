import axios from "axios"
import { CDBBox, CDBContainer } from "cdbreact"
import { useContext, useEffect, useState } from "react"
import UserDefaultImg from '../../../../img/user-default-image.jpg'
import { Button, Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { ApiUrls } from "../../ApiUrls"
import TypeUser from "./UserType"

const ShowInfoUser = ({ show, handleClose, handleUpdateUsers, user }) => {

    const urls = useContext(ApiUrls)

    const [imageUser, setImageUser] = useState(UserDefaultImg)

    useEffect(() => {
        obtainImageUser()
    }, [user])

    const obtainImageUser = async () => {
        if (user.length !== 0) {
            const res = await axios.get(urls.obtainStaffPhoto + user.id, { responseType: 'arraybuffer' })
            if (res.data.byteLength > 0) {
                let binary = '';
                const bytes = new Uint8Array(res.data);
                const len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                setImageUser(binary)
            } else {
                setImageUser(UserDefaultImg)
            }
        }
    }

    const confirmDeleteUser = () => {
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
        const res = await axios.delete(urls.deleteStaff + id)
        if (res.data.affected === 1) {
            toast.info('Usuario eliminado con exito')
            handleUpdateUsers()
            handleClose()
        } else {
            toast.error('No se pudo eliminar el usuario')
        }
    }

    return (
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>{user.name + " " + user.first_last_name + " " + user.second_last_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CDBContainer fluid className="mb-4">
                    <CDBBox display="flex" flex="fill" justifyContent="center">
                        <img src={imageUser} style={{ height: '200px', width: '200px', borderRadius: '360px' }} />
                    </CDBBox>
                </CDBContainer>
                <hr className="mx-5" />
                <TypeUser user={user} handleUpdateUsers={handleUpdateUsers} handleClose={handleClose} />
            </Modal.Body>
            <Modal.Footer>
                <CDBBox display="flex" flex="fill" alignItems="center">
                    <CDBBox display="flex" justifyContent="start">
                        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                    </CDBBox>
                    <CDBBox display="flex" flex="fill" justifyContent="end">
                        <Button variant="outline-danger" className="me-2" onClick={() => confirmDeleteUser()}>Eliminar Usuario</Button>
                        <Button variant="primary">Modificar Usuario</Button>
                    </CDBBox>
                </CDBBox>
            </Modal.Footer>
        </Modal>
    )
}

export default ShowInfoUser