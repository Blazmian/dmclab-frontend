import { CDBBox, CDBBtn, CDBContainer, CDBIcon, CDBInput } from "cdbreact"
import NavBarAdmin from "../NavBarAdmin"
import ShowEquipment from "./ShowEquipment"
import { useContext, useEffect, useState } from "react"
import { ApiUrls } from "../../ApiUrls"
import axios from "axios"
import CreateEquipment from "./CreateEquipment"

const Equipment = () => {

    const urls = useContext(ApiUrls)
    const [equipments, setEquipments] = useState([])

    useEffect(() => {
        getEquipment()
    }, [])

    async function getEquipment() {
        const res = await axios.get(urls.equipment)
        setEquipments(res.data)
    }

    // For Add User Modal
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }

    const handleUpdateEquipment = () => {
        getEquipment()
    }

    return (
        <>
        <div>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-EV6GHP7VHP');
</script>
            </div>
            <NavBarAdmin icon={'archive'} title={'Equipo'} />
            <div><script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments)}
                    gtag('js', new Date());

                    gtag('config', 'G-EV6GHP7VHP');
                </script></div>
            <CreateEquipment show={show} handleClose={handleClose} handleUpdateEquipment={getEquipment} />
            <CDBContainer className="mt-5 mb-3">
                <CDBBox display="flex">
                    <CDBBox display="flex" justifyContent="start">
                        <CDBBtn style={{ borderRadius: '12px' }} onClick={handleShow}>
                            <CDBIcon icon="plus" className="ml-3" />
                            Agregar equipo
                        </CDBBtn>
                    </CDBBox>
                    <CDBBox display="flex" flex="fill" justifyContent="end">
                        <CDBInput style={{ borderRadius: '12px' }} placeholder="Buscar equipo" className="mx-3 w-50" icon={<i className="fa fa-search text-dark"></i>} />
                        <CDBBtn style={{ borderRadius: '12px' }} color="dark"><CDBIcon icon="filter" className="me-2" />Filtrar</CDBBtn>
                    </CDBBox>
                </CDBBox>
            </CDBContainer>
            <ShowEquipment equipments={equipments} handleUpdateEquipment={handleUpdateEquipment} />
        </>
    )
}

export default Equipment