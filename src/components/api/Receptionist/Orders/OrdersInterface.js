import { CDBBox } from "cdbreact"
import { useEffect, useState } from "react"
import { Accordion, Badge, Button, Container, ListGroup } from "react-bootstrap"

const Orders = () => {

    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const timerID = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    return (
        <CDBBox display="flex" style={{ flex: 1 }} className="p-0">
            <Container className="mt-4">
                <CDBBox display="flex" flex="fill" mb={3} mx={4} alignItems="center">
                    <h3 className="m-0">Pedidos<Badge bg="danger" pill className="ms-2">2</Badge></h3>
                    <CDBBox display="flex" flex="fill" justifyContent="end">
                        <h5 className="m-0">{date.toLocaleDateString()}</h5>
                    </CDBBox>
                </CDBBox>
                <hr className="mx-3" />

                <Container style={{ overflowY: 'auto', maxHeight: '74vh' }}>
                    <Accordion defaultActiveKey="0" alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <CDBBox display="flex" flex="fill" alignItems="center">
                                    <h4 className="m-0">Pedido #129</h4>
                                    <CDBBox display="flex" flex="fill" justifyContent="end">
                                        <p className="m-0 me-4">05:31 p.m.</p>
                                    </CDBBox>
                                </CDBBox>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Container>
                                    <ListGroup variant="flush" as="ol" numbered>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto" style={{ width: '70%' }}>
                                                <h5 className="fw-bold">Osciloscopio</h5>
                                                <CDBBox display="flex" flex="fill" justifyContent="between" className="mt-2">
                                                    <div>
                                                        <h6 className="m-0 fw-bold" style={{ textDecoration: 'underline' }}>Marca</h6>
                                                        <p className="m-0">Mitsubichi</p>
                                                    </div>
                                                    <div>
                                                        <h6 className="m-0 fw-bold" style={{ textDecoration: 'underline' }}>Modelo</h6>
                                                        <p className="m-0">Mordex</p>
                                                    </div>
                                                    <div>
                                                        <h6 className="m-0 fw-bold" style={{ textDecoration: 'underline' }}>Numero Serial</h6>
                                                        <p className="m-0">Padrote</p>
                                                    </div>
                                                </CDBBox>
                                            </div>
                                            <Badge bg="success" pill>
                                                #3
                                            </Badge>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Container>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                <CDBBox display="flex" flex="fill" alignItems="center">
                                    <h4 className="m-0">Pedido #130</h4>
                                    <CDBBox display="flex" flex="fill" justifyContent="end">
                                        <p className="m-0 me-4">05:58 p.m.</p>
                                    </CDBBox>
                                </CDBBox>
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>

            </Container>
            <CDBBox display="flex" flex="column" style={{ width: '30%', backgroundColor: '#323742' }} className="p-2" color="white">
                <CDBBox mt={3} mx={3}>
                    <h5 style={{ fontWeight: 'bold' }}>Información del Pedido</h5>
                </CDBBox>

                <CDBBox display="flex" flex="column" mx={3}>
                    <Button variant="success" className="mt-3">
                        Entregar
                    </Button>
                    <Button variant="danger" className="my-3">
                        Cancelar
                    </Button>
                </CDBBox>

            </CDBBox>
        </CDBBox>
    )
}

export default Orders