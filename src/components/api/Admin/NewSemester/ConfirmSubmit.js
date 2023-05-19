import { CDBBox } from "cdbreact"
import { Button, Container, Modal, Spinner } from "react-bootstrap"
import Warning from '../../../../img/warning.png'

const ConfirmSubmit = ({ show, handleClose, noExist, exist, submitMethod, isSubmitting }) => {

    return (
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>

            <Modal.Header closeButton>
                <Modal.Title>{isSubmitting ? 'Subiendo datos...' : 'Estás a punto de subir datos...'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <CDBBox display="flex" flex="fill" justifyContent="center" my={2}>
                        <img
                            src={Warning}
                            alt='Warning'
                            width={100}
                        />
                    </CDBBox>
                    <h3 className="fw-bold text-center mt-4 mb-4">ADVERTENCIA</h3>
                    <Container className="text-center px-5 mb-4">
                        {noExist > 0 ? (
                            <CDBBox bgColor="primary" p={1} style={{ borderRadius: '10px', color: 'white' }} mb={2}>
                                <h5 className="m-0">Se agregarán <strong>{noExist}</strong> datos</h5>
                            </CDBBox>
                        ) : (
                            <></>
                        )}
                        {exist > 0 ? (
                            <CDBBox bgColor="warning" p={1} style={{ borderRadius: '10px' }} mt={2}>
                                <h5 className="m-0">Se modificarán <strong>{exist}</strong> datos</h5>
                            </CDBBox>
                        ) : (
                            <></>
                        )}
                    </Container>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose} disabled={isSubmitting}>Cancelar</Button>
                <Button variant="success" onClick={submitMethod} disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            {'  '} Subiendo datos...
                        </>

                    ) :
                        'Subir Datos'
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmSubmit