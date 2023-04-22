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
            <ShowInfoEquipment show={show} handleClose={handleClose} handleUpdateEquipment={handleUpdateEquipment} equipment={equipment} />
            <CDBContainer>
                <CDBTable striped hover bordered responsive maxHeight="70vh" scrollY>
                    <CDBTableHeader>
                        <tr style={{ textAlign: 'center' }}>
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
                            <tr key={equipment.id} onClick={() => handleClick(equipment)} style={equipment.damaged ? { backgroundColor: 'rgba(255, 0, 0, 0.699)' } : {}}>
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
            </CDBContainer>
        </>
    )
}

export default ShowEquipment