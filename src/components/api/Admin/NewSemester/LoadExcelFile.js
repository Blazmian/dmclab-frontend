import { CDBBox, CDBContainer } from "cdbreact"
import { Container, Spinner } from "react-bootstrap"
import Dropzone from "react-dropzone"
import UploadIcon from '../../../../img/outbox.png'
import UploadedIcon from '../../../../img/checked.png'

const LoadExcelFile = ({ onDrop, isDraging, handleDragEnter, handleDragExit, isLoading, file }) => {

    return (
        <><script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-EV6GHP7VHP');
            </script>
            <Container style={{ padding: '20px', textAlign: 'center', width: '50%', ...(isDraging ? { border: '2px solid gray', backgroundColor: '#e2e8f4' } : { border: '2px dashed gray', }) }}>
                <Dropzone onDrop={onDrop} maxFiles={1} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onDragEnter={handleDragEnter} onDragLeave={handleDragExit}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                            {file ? (
                                <CDBBox style={{ height: '30vh' }} display="flex" alignItems="center">
                                    <CDBContainer>
                                        {isLoading ? (
                                            <>
                                                <Spinner animation="border" variant="primary" style={{ height: '100px', width: '100px' }} />
                                                <h5 className="mb-0 mt-5">Cargando archivo...</h5>
                                            </>
                                        ) : (
                                            <>
                                                <img src={UploadedIcon} alt="Upload Icon" height={100} />
                                                <h5 className="mb-0 mt-5">Archivo cargado: {file.name}</h5>
                                            </>
                                        )}

                                    </CDBContainer>

                                </CDBBox>

                            ) : (
                                <CDBBox style={{ height: '30vh' }} display="flex" alignItems="center">
                                    <CDBContainer>
                                        <img src={UploadIcon} alt="Upload Icon" height={100} />
                                        <h4 className="mb-0 mt-5" style={{ color: '#757575' }}>Arrastre y suelte su archivo aquí o haga clic para seleccionar el archivo Excel</h4>
                                    </CDBContainer>
                                </CDBBox>
                            )}
                        </div>
                    )}
                </Dropzone>
            </Container>
        </>
    )
}

export default LoadExcelFile