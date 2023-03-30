import axios from "axios"
import { CDBBox, CDBIcon, CDBInput } from "cdbreact"
import { useState } from "react"
import { Accordion, Button, Form } from "react-bootstrap"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

const TypeUser = ({ user, admin, receptionist }) => {

    const [widthCAdmin, setWidthCAdmin] = useState('flex')
    const [widthLAdmin, setWidthLAdmin] = useState('none')
    const [encodedURLA, setEncodedURLA] = useState('')

    const [widthCReceptionist, setWidthCReceptionist] = useState('flex')
    const [widthLReceptionist, setWidthLReceptionist] = useState('none')
    const [encodedURLR, setEncodedURLR] = useState('')

    const encodeURL = (type) => {
        let uri = `http://localhost:3000/register/`
        if (type === 'admin') {
            setWidthCAdmin('none')
            setWidthLAdmin('')
            let encodeDestinyRoute = `${btoa('admin')}`
            let userRoute = `${btoa(user.id)}`
            setEncodedURLA(uri + encodeDestinyRoute + "/" + userRoute)
        } else {
            setWidthCReceptionist('none')
            setWidthLReceptionist('')
            let encodeDestinyRoute = `${btoa('receptionist')}`
            let userRoute = `${btoa(user.id)}`
            setEncodedURLR(uri + encodeDestinyRoute + "/" + userRoute)
        }
    }

    const copyText = (type) => {
        if (type === 'admin') {
            navigator.clipboard.writeText(encodedURLA)
            toast.info('Enlace copiado!')
        } else {
            navigator.clipboard.writeText(encodedURLR)
            toast.info('Enlace copiado!')
        }
    }

    const ShowAdminPermission = () => {

        const [edit, setEdit] = useState(admin.canUpdate)
        const [remove, setRemove] = useState(admin.canDelete)

        const handleSubmit = e => {
            e.preventDefault()
            submitAdminPermission()
        }

        const submitAdminPermission = async () => {
            const res = await axios.put('http://localhost:8000/admin/update/' + admin.username, {
                canDelete: remove,
                canUpdate: edit
            })
            if (res.data.canDelete === remove && res.data.canUpdate === edit) {
                toast.success('Permisos actualizados con exito')
            }
        }

        const confirmDeleteAdmin = () => {
            Swal.fire({
                title: '¿Estas seguro de remover el administrador al usuario ' + user.name + '?',
                text: "Esto no se podrá revertir",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Borrar administrador',
                confirmButtonColor: '#f53333',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then((response) => {
                if (response.isConfirmed) {
                    deleteAdmin()
                }
            })
        }

        const deleteAdmin = async () => {
            const res = await axios.delete('http://localhost:8000/admin/delete/' + user.id, {
                data: { username: admin.username },
                headers: { 'Content-Type': 'application/json' }
            })
            if (res.data.affected === 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Administrador eliminado con exito?',
                    text: "Al usuario " + user.name + " se le han removido los permisos de un administrador",
                }).then(response => {
                    window.location.reload(false)
                })
            } else {
                toast.error('No se pudo eliminar remover el administrador')
            }
        }

        return (
            <>
                <p>Administrador: <strong>{admin.username}</strong></p>
                <Form>
                    <Form.Check
                        checked={edit}
                        type="switch"
                        label="Permiso de Editar"
                        className="mb-3"
                        onChange={() => setEdit(!edit)}
                    />
                    <Form.Check
                        checked={remove}
                        type="switch"
                        label="Permiso de Eliminar"
                        className="mb-3"
                        onChange={() => setRemove(!remove)}
                    />
                    <CDBBox display="flex" flex="fill">
                        <CDBBox display="flex" justifyContent="start">
                            <Button type="submit" onClick={handleSubmit}>Guardar Cambios</Button>
                        </CDBBox>
                        <CDBBox display="flex" flex="fill" justifyContent="end">
                            <Button variant="danger" onClick={() => confirmDeleteAdmin()}>Eliminar Administrador</Button>
                        </CDBBox>
                    </CDBBox>
                </Form>
            </>
        )
    }

    const ShowReceptionistData = () => {

        const confirmDeleteReceptionist = () => {
            Swal.fire({
                title: '¿Estas seguro de remover el casetero al usuario ' + user.name + '?',
                text: "Esto no se podrá revertir",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Borrar casetero',
                confirmButtonColor: '#f53333',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then((response) => {
                if (response.isConfirmed) {
                    deleteReceptionist()
                }
            })
        }

        const deleteReceptionist = async () => {
            const res = await axios.delete('http://localhost:8000/receptionist/delete/' + user.id, {
                data: { username: receptionist.username },
                headers: { 'Content-Type': 'application/json' }
            })
            if (res.data.affected === 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Casetero eliminado con exito?',
                    text: "Al usuario " + user.name + " se le han removido los permisos de un casetero",
                }).then(response => {
                    window.location.reload(false)
                })
            } else {
                toast.error('No se pudo eliminar remover el casetero')
            }
        }

        return (
            <>
                <p>Casetero: <strong>{receptionist.username}</strong></p>

                <CDBBox display="flex" flex="fill">
                    <CDBBox display="flex" justifyContent="start">
                        <Button>Ver reportes de casetero</Button>
                    </CDBBox>
                    <CDBBox display="flex" flex="fill" justifyContent="end">
                        <Button variant="danger" onClick={() => confirmDeleteReceptionist()}>Eliminar Casetero</Button>
                    </CDBBox>
                </CDBBox>
            </>
        )
    }

    const CreateAdmin = () => {
        return (
            <>
                <CDBBox display={widthCAdmin}>
                    <CDBBox display="flex" justifyContent="start" alignItems="center">
                        <h6>Parece que este usuario no es un administrador</h6>
                    </CDBBox>
                    <CDBBox display="flex" justifyContent="end" alignItems="center" flex="fill">
                        <Button onClick={() => { encodeURL('admin') }}>Hacer administrador</Button>
                    </CDBBox>
                </CDBBox>
                <CDBBox display={widthLAdmin}>

                    <h6>Envía este enlace a la persona a ser administrador para que pueda completar su proceso de registro</h6>
                    <CDBBox display="flex" flex="fill" className="mt-3" alignItems="center">
                        <CDBBox flex="fill" className="me-3">
                            <CDBInput disabled value={encodedURLA} icon={<i className="fa fa-link text-dark"></i>} />
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
            </>
        )
    }

    const CreatReceptionist = () => {
        return (
            <>
                <CDBBox display={widthCReceptionist}>
                    <CDBBox display="flex" justifyContent="start" alignItems="center">
                        <h6>Parece que este usuario no es un casetero</h6>
                    </CDBBox>
                    <CDBBox display="flex" justifyContent="end" alignItems="center" flex="fill">
                        <Button onClick={() => { encodeURL('receptionist') }}>Hacer casetero</Button>
                    </CDBBox>
                </CDBBox>
                <CDBBox display={widthLReceptionist}>

                    <h6>Envía este enlace a la persona a ser casetero para que pueda completar su proceso de registro</h6>
                    <CDBBox display="flex" flex="fill" className="mt-3" alignItems="center">
                        <CDBBox flex="fill" className="me-3">
                            <CDBInput disabled value={encodedURLR} icon={<i className="fa fa-link text-dark"></i>} />
                        </CDBBox>
                        <CDBBox>
                            <Button
                                color="primary"
                                style={{ height: '38px' }}
                                onClick={() => copyText('receptionist')}
                            >
                                <CDBIcon icon="copy" />
                            </Button>
                        </CDBBox>
                    </CDBBox>
                </CDBBox>
            </>
        )
    }

    return (
        <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Administrador</Accordion.Header>
                <Accordion.Body>
                    {(admin !== null) ? <ShowAdminPermission /> : < CreateAdmin />}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Casetero</Accordion.Header>
                <Accordion.Body>
                    {(receptionist !== null) ? <ShowReceptionistData /> : < CreatReceptionist />}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default TypeUser