import { CDBBox, CDBContainer, CDBIcon, CDBTable, CDBTableBody, CDBTableHeader } from "cdbreact";
import { Button, Modal } from "react-bootstrap";

const ShowExistWithChange = ({ show, handleClose, data, title }) => {

    const columnSetNew = new Set();
    const columnSetOld = new Set();

    data.new.forEach((item) => {
        Object.keys(item).forEach((key) => {
            columnSetNew.add(key);
        });
    });

    data.old.forEach((item) => {
        Object.keys(item).forEach((key) => {
            columnSetOld.add(key);
        });
    });

    const columnsNew = Array.from(columnSetNew);
    const columnsOld = Array.from(columnSetOld);

    return (
        <>        
            <Modal show={show} onHide={handleClose} fullscreen aria-labelledby="contained-modal-title-vcenter" centered size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>{title} existentes con cambios</Modal.Title>
                </Modal.Header>                
                <Modal.Body className="px-5 pb-4">
                    <CDBBox display="flex" flex="fill" alignItems="center" className="mx-5 mb-4 mt-2">
                        <CDBIcon icon="info-circle" size="lg" />
                        <h6 className="m-0 ms-4">Este es un listado de los datos que serán actualizados en la base de datos debido a que ya existen en el sistema. Por favor, revise si no causa ningún inconveniente el hacer esta actualización.</h6>
                    </CDBBox>
                    <CDBBox display="flex" flex="fill">
                        <CDBContainer fluid>
                            <CDBBox display="flex" flex="fill" mb={3} justifyContent="center">
                                <h5 className="m-0" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Datos Viejos</h5>
                            </CDBBox>
                            <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
                                <CDBTable striped hover responsive maxHeight="50vh" scrollY borderless className="mb-0">
                                    <CDBTableHeader>
                                        <tr style={{ textAlign: 'center', backgroundColor: '#1D3A69', color: 'white' }}>
                                            {columnsOld.map((column) => (
                                                <th key={column}>{column}</th>
                                            ))}
                                        </tr>
                                    </CDBTableHeader>
                                    <CDBTableBody>
                                        {data.old.map((item, index) => (
                                            <tr key={index} style={{ textAlign: 'center' }}>
                                                {columnsOld.map((column) => (
                                                    <td key={column}>{item[column]}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </CDBTableBody>
                                </CDBTable>
                            </div>
                        </CDBContainer>

                        <CDBContainer fluid>
                            <CDBBox display="flex" flex="fill" mb={3} justifyContent="center">
                                <h5 className="m-0" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Datos Nuevos</h5>
                            </CDBBox>
                            <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
                                <CDBTable striped hover responsive maxHeight="50vh" scrollY borderless className="mb-0">
                                    <CDBTableHeader>
                                        <tr style={{ textAlign: 'center', backgroundColor: '#ffc107', color: 'white' }}>
                                            {columnsNew.map((column) => (
                                                <th key={column}>{column}</th>
                                            ))}
                                        </tr>
                                    </CDBTableHeader>
                                    <CDBTableBody>
                                        {data.new.map((item, index) => (
                                            <tr key={index} style={{ textAlign: 'center' }}>
                                                {columnsNew.map((column) => (
                                                    <td key={column}>{item[column]}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </CDBTableBody>
                                </CDBTable>
                            </div>
                        </CDBContainer>

                    </CDBBox>
                </Modal.Body>
                <Modal.Footer>
                    <CDBBox display="flex" flex="fill" justifyContent="end">
                        <Button variant="danger" onClick={handleClose}>Cerrar</Button>
                    </CDBBox>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ShowExistWithChange