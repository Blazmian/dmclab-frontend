import { Button, Container, Form } from "react-bootstrap"
import { CDBBox, CDBIcon } from "cdbreact"
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import { ApiUrls } from "../../ApiUrls"
import Swal from "sweetalert2"
import axios from "axios"

const TypeUser = ({ user, handleUpdateUsers, handleClose }) => {

    const urls = useContext(ApiUrls)

    const ShowUserInformation = () => {

        const confirmDelete = () => {
            Swal.fire({
                title: '¿Estas seguro de eliminar el usuario ' + user.user[0].username + '?',
                text: "Esto no se podrá revertir",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Borrar usuario',
                confirmButtonColor: '#f53333',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then((response) => {
                if (response.isConfirmed) {
                    deleteUser()
                }
            })
        }

        const deleteUser = async () => {
            console.log(urls.deleteUser + user.id, { username: user.user[0].username })
            const res = await axios.delete(urls.deleteUser + user.id, { data: { username: user.user[0].username } })
            if (res.data.affected === 1) {
                toast.info('Usuario eliminado con exito')
                handleUpdateUsers()
                handleClose()
            } else {
                toast.error('No se pudo eliminar el usuario')
            }
        }

        return (
            <CDBBox className="mx-5">
                <CDBBox display="flex" flex="fill" justifyContent="center" className="mb-4">
                    {user.admin ? <h5 style={{ textDecoration: 'underline' }}>Administrador</h5> : <h5 style={{ textDecoration: 'underline' }}>Casetero</h5>}
                </CDBBox>
                <CDBBox display="flex" flex="fill" className="mb-3">
                    <CDBBox display="flex" justifyContent="start" alignItems="center">
                        <strong className="me-2">Usuario: </strong><p className="m-0">{user.user[0].username}</p>
                    </CDBBox>
                    <CDBBox display="flex" flex="fill" justifyContent="end">
                        <Button variant="secondary" size="sm">Ver Changelog</Button>
                    </CDBBox>
                </CDBBox>
                <CDBBox display="flex" flex="fill" justifyContent="start" className="mb-3">
                    <Button variant="outline-danger" size="sm" onClick={() => confirmDelete()}>
                        Eliminar {user.admin ? 'Administrador' : 'Casetero'}
                    </Button>
                </CDBBox>
            </CDBBox>
        )
    }

    const NotUserFound = () => {
        const [showCreate, setShowCreate] = useState('flex')
        const [showLink, setShowLink] = useState('none')

        const [encodedURL, setEncodedURL] = useState('')

        const encodeURL = (userType) => {
            let uri = `http://localhost:3000/register/`
            setShowCreate('none')
            setShowLink('')
            let encodeDestinyRoute = `${btoa(userType)}`
            let userRoute = `${btoa(user.id)}`
            setEncodedURL(uri + encodeDestinyRoute + "/" + userRoute)
        }

        const copyText = () => {
            navigator.clipboard.writeText(encodedURL)
            toast.info('Enlace copiado!')
        }

        return (
            <Container>
               

                <CDBBox display={showCreate}>
                   
                    <Container>
                        <Container fluid>
                            <CDBBox display="flex" flex="fill" justifyContent="center">
                                <strong>Este usuario no tiene una especialidad</strong>
                            </CDBBox>
                            <CDBBox display="flex" flex="fill" justifyContent="center">
                                <p>Deberas generar una especialidad para el usuario</p>
                            </CDBBox>

                            <CDBBox display="flex" flex="fill" className="mb-3" justifyContent="center">
                                <Button className="me-3" onClick={() => encodeURL('admin')}>
                                    <CDBIcon icon="crown" className="me-2" />
                                    Hacer Administrador
                                </Button>
                                <Button onClick={() => encodeURL('receptionist')}>
                                    <CDBIcon icon="chalkboard-teacher" className="me-2" />
                                    Hacer Casetero
                                </Button>
                            </CDBBox>
                        </Container>
                        <CDBBox display="flex" flex="fill" style={{ fontSize: '13px' }} className="ms-4">
                            <strong className="me-2">Nota:</strong><p>Solo podrás elegir una, pero tendrás la posiblidad de remover dicha especialidad en un futuro</p>
                        </CDBBox>
                    </Container>
                </CDBBox>
                <CDBBox display={showLink}>
                    <h6>Envía este enlace a la persona a ser administrador para que pueda completar su proceso de registro</h6>
                    <CDBBox display="flex" flex="fill" className="mt-3" alignItems="center">
                        <CDBBox display="flex" flex="fill" className="me-3" alignItems="center">
                            <CDBIcon icon="link" className="text-dark me-2" />
                            <Form.Control disabled value={encodedURL} />
                        </CDBBox>
                        <CDBBox>
                            <Button
                                color="primary"
                                style={{ height: '38px' }}
                                onClick={() => copyText('admin')}
                            >
                                <CDBIcon icon="copy" />
                            </Button>
                        </CDBBox>
                    </CDBBox>
                </CDBBox>
            </Container>
        )
    }

    return (
        <>
            {user.admin || user.receptionist ? <ShowUserInformation /> : <NotUserFound />}
        </>

    )
}

export default TypeUser