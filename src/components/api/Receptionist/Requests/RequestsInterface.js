import { CDBBox } from "cdbreact"
import { useContext, useEffect, useState } from "react"
import { Button, Card, Container } from "react-bootstrap"
import { ApiUrls } from "../../ApiUrls"
import axios from 'axios'
import ListChecked from '../../../../img/list-checked.png'
import ShowRequestInfo from "./ShowRequestInfo"
import Swal from "sweetalert2"

const Requests = () => {

    const urls = useContext(ApiUrls)
    const [requests, setRequests] = useState([])
    const [request, setRequest] = useState(null)

    useEffect(() => {
        getRequests()
    }, [])

    const getRequests = async () => {
        const res = await axios.get(urls.obtainNotReturnedLoan)
        setRequests(res.data)
    }

    // For modal component
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleViewRequest = (request) => {
        setRequest(request)
        handleShow()
    }

    const confirmReturnEquipment = (request) => {
        setRequest(request)
        Swal.fire({
            title: `¿Estas seguro de validar el regreso de los articulos del pedido #${request.folio}?`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Validar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((response) => {
            if (response.isConfirmed) {
                returnEquipment()
            }
        })
    }

    const returnEquipment = async () => {
        if (request) {
            await axios.post(urls.returnLoan + request.folio)
            getRequests()
        }
    }

    return (
        <>
            {requests.length > 0 ? (
                <Container fluid style={{ height: '89vh', overflowY: 'auto' }}>
                    <ShowRequestInfo show={show} handleClose={handleClose} request={request} returnLoan={returnEquipment} />
                    <div className="d-flex flex-wrap mt-2">
                        {requests.map((request, index) => (
                            <Card key={index} className="m-2" border="primary" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Container className="p-0">
                                        <CDBBox display="flex" flex="fill" alignItems="center">
                                            <h5 className="m-0 me-auto">Pedido #{request.folio}</h5>
                                            <p className="m-0">{request.delivery_time}</p>
                                        </CDBBox>
                                        <hr />
                                        <CDBBox display="flex" flex="fill" alignItems="center">
                                            <h6 className="m-0">Alumno: </h6>
                                            <p className="m-0 ms-2">{request.student.name + " " + request.student.first_last_name + " " + request.student.second_last_name}</p>
                                        </CDBBox>
                                        <CDBBox display="flex" flex="fill" mt={2} alignItems="center">
                                            <h6 className="m-0">Carrera: </h6>
                                            <p className="m-0 ms-2">{request.subject.career.career}</p>
                                        </CDBBox>
                                        <hr />
                                        <CDBBox display="flex" flex="fill" mt={2} alignItems="center" justifyContent="end">
                                            <h6 className="m-0">Articulos pedidos</h6>
                                            <p className="m-0 ms-2" style={{ textDecoration: 'underline' }}>{request.details.length}</p>
                                        </CDBBox>
                                        <CDBBox display="flex" flex="fill" justifyContent="end" mt={3}>
                                            <Button onClick={() => handleViewRequest(request)}>Ver Detalles</Button>
                                            <Button className="ms-3" variant="success" onClick={() => confirmReturnEquipment(request)}>Entregado</Button>
                                        </CDBBox>
                                    </Container>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Container>
            ) : (
                <CDBBox display="flex" flex="fill" style={{ height: '80vh' }} alignItems="center" justifyContent="center">
                    <div className="text-center">
                        <img src={ListChecked} alt="List Checked" height={150} />
                        <h3 style={{ color: '#717171', fontWeight: 'bold' }} className="mt-2">Sin solicitudes pendientes</h3>
                    </div>
                </CDBBox>
            )}

        </>
    )
}

export default Requests