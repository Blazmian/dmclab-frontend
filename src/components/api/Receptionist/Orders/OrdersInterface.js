import { CDBBox } from "cdbreact"
import { useContext, useEffect, useState } from "react"
import { Accordion, Badge, Button, Container, ListGroup } from "react-bootstrap"
import axios from "axios"
import { ApiUrls } from "../../ApiUrls";
import Swal from "sweetalert2"
import { toast } from "react-toastify"

const Orders = () => {

    const urls = useContext(ApiUrls)
    const [loans, setLoans] = useState([])
    const [selectedLoan, setSelectedLoan] = useState(null)
    const [date, setDate] = useState(new Date())
    const [activeKey, setActiveKey] = useState('0')

    useEffect(() => {
        const timerID = setInterval(() => {
            getLoans()
            setDate(new Date())
        }, 1000)

        return () => {
            clearInterval(timerID)
        }
    }, [])

    const getLoans = async () => {
        const res = await axios.get(urls.obtainNotDeliveredLoan)
        setLoans(res.data)
    }

    const handleAccordionSelect = (eventKey, loan) => {
        setActiveKey(eventKey)
        setSelectedLoan(loan)
    }

    const confirmDeliverLoan = () => {
        Swal.fire({
            title: `¿Entregar pedido #${selectedLoan.folio}`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Entregar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((response) => {
            if (response.isConfirmed) {
                deliverLoan()
            }
        })
    }

    const deliverLoan = async () => {
        const res = await axios.post(urls.deliverLoan + selectedLoan.folio)
        setSelectedLoan(null)
        toast.info('Entregado con exito')
    }

    return (
        <CDBBox display="flex" style={{ flex: 1 }} className="p-0">
            <Container className="mt-4">
                <CDBBox display="flex" flex="fill" mb={3} mx={4} alignItems="center">
                    <h3 className="m-0">Pedidos<Badge bg="danger" pill className="ms-2">{loans.length}</Badge></h3>
                    <CDBBox display="flex" flex="fill" justifyContent="end">
                        <h5 className="m-0">{date.toLocaleDateString()}</h5>
                    </CDBBox>
                </CDBBox>
                <hr className="mx-3" />

                <Container style={{ overflowY: 'auto', maxHeight: '74vh' }}>
                    <Accordion activeKey={activeKey} onSelect={handleAccordionSelect}>
                        {loans.map((loan, index) => (
                            <Accordion.Item eventKey={index.toString()} key={index}>
                                <Accordion.Header onClick={() => handleAccordionSelect(index.toString(), loan)}>
                                    <CDBBox display="flex" flex="fill" alignItems="center">
                                        <h4 className="m-0">Pedido #{loan.folio}</h4>
                                    </CDBBox>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Container>
                                        <ListGroup variant="flush" as="ol" numbered>
                                            {loan.details.map((detail, index) => (
                                                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={index}>
                                                    <CDBBox display="flex" flex="fill" alignItems="center">
                                                        <div className="ms-2 me-auto" style={{ width: '70%' }}>
                                                            <h5 className="fw-bold">{detail.equipment.equipment_name}</h5>
                                                            <CDBBox display="flex" flex="fill" justifyContent="between" className="mt-2">
                                                                <div>
                                                                    <h6 className="m-0 fw-bold" style={{ textDecoration: 'underline' }}>Marca</h6>
                                                                    <p className="m-0">{detail.equipment.brand}</p>
                                                                </div>
                                                                <div>
                                                                    <h6 className="m-0 fw-bold" style={{ textDecoration: 'underline' }}>Modelo</h6>
                                                                    <p className="m-0">{detail.equipment.model}</p>
                                                                </div>
                                                                <div>
                                                                    <h6 className="m-0 fw-bold" style={{ textDecoration: 'underline' }}>Numero Serial</h6>
                                                                    <p className="m-0">{detail.equipment.serial_number}</p>
                                                                </div>
                                                            </CDBBox>
                                                        </div>
                                                        <Badge bg="success" pill style={{ height: '50px', fontSize: '1.5em' }}>
                                                            #{detail.equipment.equipment_number}
                                                        </Badge>
                                                    </CDBBox>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Container>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Container>

            </Container>
            <CDBBox display="flex" flex="column" style={{ width: '30%', backgroundColor: '#323742' }} className="p-2" color="white">
                <CDBBox mt={3} mx={3}>
                    <h5 style={{ fontWeight: 'bold' }}>Información del Pedido</h5>
                </CDBBox>
                <Container className="mt-3">
                    <h6>Estudiante</h6>
                    <p>{selectedLoan ? `${selectedLoan.student.name} ${selectedLoan.student.first_last_name} ${selectedLoan.student.second_last_name}` : ('')}</p>
                    <h6 className="mt-3">Semestre</h6>
                    <p>{selectedLoan ? selectedLoan.student.semester : ('')}</p>
                    <h6 className="mt-3">Carrera</h6>
                    <p>{selectedLoan ? selectedLoan.subject.career.career : ('')}</p>
                </Container>
                <CDBBox display="flex" flex="column" mx={3}>
                    <Button variant="success" className="mt-3" onClick={confirmDeliverLoan}>
                        Entregar
                    </Button>
                    <Button variant="danger" className="my-3">
                        Cancelar
                    </Button>
                </CDBBox>

            </CDBBox>
        </CDBBox >
    )
}

export default Orders