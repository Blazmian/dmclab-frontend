import { CDBContainer, CDBTable, CDBTableBody, CDBTableHeader } from "cdbreact"
import BadgesEquipment from "./BadgesEquipment"

const ShowEquipment = ({ equipments, handleUpdateEquipment }) => {

    return (
        <>
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
                            <tr key={equipment.id}>
                                <td style={{ textAlign: 'center' }}>{equipment.id}</td>
                                <td style={{ textAlign: 'center' }}><BadgesEquipment equipment={equipment} /></td>
                                <td>{equipment.equipment_name}</td>
                                <td style={{ textAlign: 'center' }}>{equipment.equipment_number}</td>
                                <td>{equipment.brand}</td>
                                <td>{equipment.model}</td>
                            </tr>
                        ))}
                    </CDBTableBody>
                </CDBTable>
            </CDBContainer>
        </>
    )
}

export default ShowEquipment