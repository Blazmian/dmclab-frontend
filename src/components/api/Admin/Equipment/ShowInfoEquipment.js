import { CDBBox, CDBContainer } from "cdbreact"
import { Button, Modal } from "react-bootstrap"
import BadgesEquipment from "./BadgesEquipment"
import { useContext, useEffect, useState } from "react"
import EquipmentDefaultImg from '../../../../img/equipment-default-image.jpg'
import axios from "axios"
import { ApiUrls } from "../../ApiUrls"
import Swal from "sweetalert2"
import { toast } from "react-toastify"

const ShowInfoEquipment = ({ show, handleClose, handleUpdateEquipment, equipment }) => {

    const urls = useContext(ApiUrls)

    const [imageEquipment, setImageEquipment] = useState(EquipmentDefaultImg)

    useEffect(() => {
        obtainImageEquipment()
    }, [equipment])

    const obtainImageEquipment = async () => {
        if (equipment.length !== 0) {
            const res = await axios.get(urls.obtainEquipmentPhoto + equipment.id, { responseType: 'arraybuffer' })
            if (res.data.byteLength > 0) {
                let binary = '';
                const bytes = new Uint8Array(res.data);
                const len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                setImageEquipment(binary)
            } else {
                setImageEquipment(EquipmentDefaultImg)
            }
        }
    }

    const confirmChangeDamaged = () => {
        if (!equipment.damaged) {
            Swal.fire({
                title: '¿Deseas reportar el equipo?',
                text: "Se enviará un correo para su arreglo",
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Reportar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then((response) => {
                if (response.isConfirmed) {
                    changeDamaged()
                }
            })
        } else {
            Swal.fire({
                title: '¿Deseas activar de nuevo el equipo?',
                text: "Los alumnos podrán solicitar de nuevo este equipo",
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Activar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then((response) => {
                if (response.isConfirmed) {
                    changeDamaged()
                }
            })
        }
    }

    const changeDamaged = async () => {
        const res = await axios.put(urls.changeDamaged + equipment.id)
        if (res.data.affected === 1) {
            equipment.damaged = !equipment.damaged
            handleUpdateEquipment()
        }
    }

    const confirmDeleteEquipment = () => {
        Swal.fire({
            title: '¿Estas seguro de eliminar el equipo ' + equipment.equipment_name + '?',
            text: "Esto no se podrá revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Borrar equipo',
            confirmButtonColor: '#f53333',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((response) => {
            if (response.isConfirmed) {
                deleteEquipment()
            }
        })
    }

    const deleteEquipment = async () => {
        const res = await axios.delete(urls.deleteEquipment + equipment.id)
        if (res.data.affected === 1) {
            toast.info('Equipo eliminado con exito')
            handleUpdateEquipment()
            handleClose()
        } else {
            toast.error('No se pudo eliminar el equipo')
        }
    }

    return (
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title><BadgesEquipment equipment={equipment} />{' ' + equipment.equipment_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CDBContainer fluid className="mb-4">
                    <CDBBox display="flex" flex="fill" justifyContent="start" alignItems="center">
                        <CDBBox className="me-4">
                            <img src={imageEquipment} style={{ height: '100px', width: '100px', borderRadius: '360px' }} />
                        </CDBBox>
                        <CDBBox>
                            <CDBBox display="flex" className="mb-1">
                                <h3>{equipment.equipment_name + ' #' + equipment.equipment_number}</h3>
                            </CDBBox>
                            <CDBBox display="flex" alignItems="center">
                                <div
                                    className="me-2"
                                    style={{ width: '20px', height: '20px', borderRadius: '60px', ... (equipment.damaged ? { backgroundColor: 'red' } : { backgroundColor: 'rgb(32, 167, 32)' }) }}
                                />
                                {equipment.damaged ? 'Se encuentra dañado' : 'En buen estado'}
                            </CDBBox>
                        </CDBBox>
                    </CDBBox>
                    <hr />
                    {equipment.extension ? <></> :
                        <CDBBox display="flex" flex="fill" mx={2}>
                            <CDBBox alignItems="center" style={{ width: '50%' }}>
                                <h5>Marca</h5>
                                {equipment.brand}
                            </CDBBox>
                            <CDBBox alignItems="center" style={{ width: '50%' }}>
                                <h5>Modelo</h5>
                                {equipment.model}
                            </CDBBox>
                        </CDBBox>
                    }
                    <CDBBox flex="fill" mx={2} mt={4}>
                        <h5>Número de Serie</h5>
                        <p style={{ textDecoration: 'underline', fontStyle: 'italic' }}>{equipment.serial_number}</p>
                    </CDBBox>
                    {equipment.projector ?
                        <CDBBox flex="fill" mx={2}>
                            <h5>Tipo de Puerto</h5>
                            {equipment.hdmi ? 'HDMI' : 'VGA'}
                        </CDBBox> : <></>
                    }
                    <CDBBox display="flex" flex="fill">
                        <CDBBox>
                            <Button variant="dark" className="mt-3">Ver Prestamos de Equipo</Button>
                        </CDBBox>
                        <CDBBox display="flex" flex="fill" justifyContent="end">
                            {equipment.damaged ?
                                <Button variant="success" className="mt-3" onClick={() => confirmChangeDamaged()}>Activar Equipo</Button>
                                :
                                <Button variant="warning" className="mt-3" onClick={() => confirmChangeDamaged()}>Reportar Equipo Dañado</Button>
                            }
                        </CDBBox>
                    </CDBBox>
                </CDBContainer>
            </Modal.Body>
            <Modal.Footer>
                <CDBBox display="flex" flex="fill" alignItems="center">
                    <CDBBox display="flex" justifyContent="start">
                        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                    </CDBBox>
                    <CDBBox display="flex" flex="fill" justifyContent="end">
                        <Button variant="outline-danger" className="me-2" onClick={() => confirmDeleteEquipment()}>Eliminar Equipo</Button>
                        <Button variant="primary">Modificar Equipo</Button>
                    </CDBBox>
                </CDBBox>
            </Modal.Footer>
        </Modal>
    )
}

export default ShowInfoEquipment