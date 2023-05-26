import { CDBContainer, CDBTable, CDBTableBody, CDBTableHeader } from "cdbreact"
import BadgesEquipment from "./BadgesEquipment"
import ShowInfoEquipment from "./ShowInfoEquipment"
import { useState } from "react"

const ShowEquipment = ({ equipments, handleUpdateEquipment }) => {

    const [equipment, setEquipment] = useState([])

    // For modal component
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = (equipment) => {
        setEquipment(equipment)
        handleShow()
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
            <ShowInfoEquipment show={show} handleClose={handleClose} handleUpdateEquipment={handleUpdateEquipment} equipment={equipment} />
            <div><script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-EV6GHP7VHP');
</script></div>
            <CDBContainer>
                <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
                    <CDBTable striped hover responsive maxHeight="70vh" scrollY borderless className="mb-0">
                        <CDBTableHeader>
                            <tr style={{ textAlign: 'center', backgroundColor: '#1D3A69', color: 'white' }}>
                                <th>Id</th>
                                <th>Tipo</th>
                                <th>Equipo</th>
                                <th>Número</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                            </tr>
                        </CDBTableHeader>
                        <CDBTableBody>
                            {equipments.map((equipment) => (
                                <tr
                                    key={equipment.id}
                                    onClick={() => handleClick(equipment)}
                                    style={
                                        equipment.damaged ? { backgroundColor: 'rgba(255, 0, 0, 0.699)' } : equipment.borrowed ? { backgroundColor: 'rgba(247, 247, 12, 0.5)' } : {}
                                    }>
                                    <td style={{ textAlign: 'center' }}>{equipment.id}</td>
                                    <td style={{ textAlign: 'center' }}><BadgesEquipment equipment={equipment} /></td>
                                    <td>{equipment.equipment_name}</td>
                                    <td style={{ textAlign: 'center' }}>{equipment.equipment_number}</td>
                                    <td>{equipment.extension ? '-' : equipment.brand}</td>
                                    <td>{equipment.extension ? '-' : equipment.model}</td>
                                </tr>
                            ))}
                        </CDBTableBody>
                    </CDBTable>
                </div>
            </CDBContainer>
        </>
    )
}

export default ShowEquipment