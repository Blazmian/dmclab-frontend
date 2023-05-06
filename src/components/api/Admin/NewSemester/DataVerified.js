import { CDBBox } from "cdbreact"
import { Badge, Button, Card } from "react-bootstrap"
import ShowNoExistentData from "./ShowInfoData/ShowNoExistentData"
import { useState } from "react"

const DataVerified = ({ data, dataVerified, title }) => {

    const badgesStyles = {
        fontSize: '16px',
        width: '35px',
        height: '35px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const [showNoExistent, setShowNoExistent] = useState(false);
    const handleCloseNoExistent = () => setShowNoExistent(false);
    const handleShowNoExistent = () => setShowNoExistent(true);

    return (
        <Card className="mx-5 my-4">
            <Card.Header as="h4">{title}</Card.Header>
            <Card.Body>
                {dataVerified.noExist.length > 0 ? (
                    <>
                        <ShowNoExistentData show={showNoExistent} handleClose={handleCloseNoExistent} data={dataVerified.noExist} title={title} />
                        <CDBBox display="flex" flex="fill" alignItems="center" my={2} mx={5}>
                            <CDBBox>
                                <h5 className="m-0">Datos no existentes en el sistema</h5>
                            </CDBBox>
                            <CDBBox display="flex" flex="fill" justifyContent="end" alignItems="center">
                                <Badge pill bg="success" style={badgesStyles}>
                                    {dataVerified.noExist.length}
                                </Badge>
                                <Button className="ms-3" variant="dark" onClick={handleShowNoExistent}>Ver Detalles</Button>
                            </CDBBox>
                        </CDBBox>
                        <hr className="mx-5" />
                    </>
                ) : (
                    <></>
                )}

                {Object.keys(dataVerified.existWithChanges).length > 0 ? (
                    <>
                        <CDBBox display="flex" flex="fill" alignItems="center" my={2} mx={5}>
                            <CDBBox>
                                <h5 className="m-0">Datos existentes en el sistema pero con cambios</h5>
                            </CDBBox>
                            <CDBBox display="flex" flex="fill" justifyContent="end" alignItems="center">
                                <Badge pill bg="warning" style={badgesStyles}>
                                    {Object.keys(dataVerified.existWithChanges).length}
                                </Badge>
                                <Button className="ms-3">Ver Detalles</Button>
                            </CDBBox>
                        </CDBBox>
                        <hr className="mx-5" />
                    </>
                ) : (
                    <></>
                )}

                {dataVerified.existNoChanges.length > 0 ? (
                    <>
                        <CDBBox display="flex" flex="fill" alignItems="center" my={2} mx={5}>
                            <CDBBox>
                                <h5 className="m-0">Datos existentes sin cambios</h5>
                            </CDBBox>
                            <CDBBox display="flex" flex="fill" justifyContent="end" alignItems="center">
                                <Badge pill bg="danger" style={badgesStyles}>
                                    {dataVerified.existNoChanges.length}
                                </Badge>
                                <Button className="ms-3">Ver Detalles</Button>
                            </CDBBox>
                        </CDBBox>
                        <hr className="mx-5" />
                    </>
                ) : (
                    <></>
                )}

                <CDBBox display="flex" flex="fill" justifyContent="end">
                    <h5>Total de datos: {data.length}</h5>
                </CDBBox>
            </Card.Body>
        </Card>
    )
}

export default DataVerified