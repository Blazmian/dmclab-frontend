import { CDBBox, CDBIcon } from "cdbreact"
import { Badge, Button, Container, Modal } from "react-bootstrap"
import Swal from "sweetalert2"

const ShowRequestInfo = ({ show, handleClose, request, returnLoan }) => {

    const confirmReturnEquipment = () => {
        Swal.fire({
            title: `¿Estas seguro de validar el regreso de los articulos del pedido #${request.folio}?`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Validar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((response) => {
            if (response.isConfirmed) {
                returnLoan()
                handleClose()
            }
        })
    }

    return (
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Pedido #{request && request.folio}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CDBBox display="flex" flex="fill" alignItems="center">
                    <CDBIcon icon="user-circle" size="lg" />
                    <h5 className="m-0">Solicitante</h5>
                </CDBBox>
                <Container>
                    <CDBBox display="flex" flex="fill" alignItems="center" mt={3}>
                        <h6 className="m-0" style={{ minWidth: '5rem', textAlign: 'end' }}>Nombres:</h6>
                        <p className="m-0 ms-2">{request && (request.student.name + " " + request.student.first_last_name + " " + request.student.second_last_name)}</p>
                    </CDBBox>
                    <CDBBox display="flex" flex="fill" alignItems="center" mt={2}>
                        <h6 className="m-0" style={{ minWidth: '5rem', textAlign: 'end' }}>Materia:</h6>
                        <p className="m-0 ms-2">{request && request.subject.subject}</p>
                    </CDBBox>
                    <CDBBox display="flex" flex="fill" alignItems="center" mt={2}>
                        <h6 className="m-0" style={{ minWidth: '5rem', textAlign: 'end' }}>Carrera:</h6>
                        <p className="m-0 ms-2">{request && request.subject.career.career}</p>
                    </CDBBox>
                    <hr />
                </Container>
                <CDBBox display="flex" flex="fill" alignItems="center">
                    <CDBIcon icon="info-circle" size="lg" />
                    <h5 className="m-0">Detalles Pedido</h5>
                </CDBBox>
                <Container>
                    {request && request.details.map((detail, index) => (
                        <div key={index}>
                            <CDBBox display="flex" flex="fill" alignItems="center" mt={3}>
                                <Badge bg="primary">#{detail.equipment.equipment_number}</Badge>
                                <h6 className="m-0 ms-3">{detail.equipment.equipment_name}</h6>
                            </CDBBox>
                            <CDBBox display="flex" flex="fill" mt={2}>
                                <CDBBox display="flex" flex="fill" alignItems="center">
                                    <h6 className="m-0" style={{ minWidth: '5rem', textAlign: 'end' }}>Marca:</h6>
                                    <p className="m-0 ms-2">{detail.equipment.brand}</p>
                                </CDBBox>
                                <CDBBox display="flex" flex="fill" alignItems="center">
                                    <h6 className="m-0" style={{ minWidth: '5rem', textAlign: 'end' }}>Modelo:</h6>
                                    <p className="m-0 ms-2">{detail.equipment.model}</p>
                                </CDBBox>
                            </CDBBox>
                            {index !== request.details.length - 1 && <hr className="mx-2" />}
                        </div>
                    ))}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                <Button variant="success" onClick={confirmReturnEquipment}>Entregado</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ShowRequestInfo