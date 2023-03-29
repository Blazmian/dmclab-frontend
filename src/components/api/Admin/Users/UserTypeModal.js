import { CDBBox, CDBBtn, CDBIcon, CDBInput, CDBSwitch } from "cdbreact"
import { useRef, useState } from "react"
import { Accordion, Button, Container, Form, InputGroup, Overlay, Tooltip } from "react-bootstrap"
import { toast } from "react-toastify"

const TypeUser = ({ idUser, admin, setAdmin, receptionist, setReceptionist }) => {

    const [isAdmin, setIsAdmin] = useState([])
    const [widthCAdmin, setWidthCAdmin] = useState('flex')
    const [widthLAdmin, setWidthLAdmin] = useState('none')
    const [encodedURLA, setEncodedURLA] = useState('')

    const encodeURL = (type) => {
        let uri = `http://localhost:3000/register/`
        if (type === 'admin') {
            setWidthCAdmin('none')
            setWidthLAdmin('')
            let toEncode = `${btoa('admin/' + idUser)}`
            setEncodedURLA(uri + toEncode)
        }
    }

    const [isReceptionist, setIsReceptionist] = useState([])

    const ShowAdminPermission = () => {
        return (
            <h1>Soy admin</h1>
        )
    }

    const copyText = (type) => {
        if (type === 'admin') {
            navigator.clipboard.writeText(encodedURLA)
            toast.info('Enlace copiado!')
        }
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
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default TypeUser