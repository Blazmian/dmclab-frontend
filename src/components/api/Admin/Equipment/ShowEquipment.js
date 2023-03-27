import axios from "axios"
import { CDBContainer, CDBTable, CDBTableBody, CDBTableHeader } from "cdbreact"
import { useEffect, useState } from "react"

const ShowEquipment = () => {

    const [equipment, setEquipment] = useState([])

    useEffect(() => {
        getEquipment()
    }, [])

    const getEquipment = async () => {
        const res = await axios.get('http://localhost:8000/equipment/all')
        setEquipment(res.data)
    }

    return (
        <>
            <CDBContainer>
                <CDBTable striped hover bordered responsive maxHeight="70vh" scrollY>
                    <CDBTableHeader>
                        <tr>
                            <th>ID</th>
                            <th>Número</th>
                            <th>Equipo</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Número serial</th>
                            <th>Opciones</th>
                        </tr>
                    </CDBTableHeader>
                    <CDBTableBody>
                        {equipment.map((equipment) => (
                            <tr key={equipment.id}>
                                <td>{equipment.id}</td>
                                <td>{equipment.name}</td>
                                <td>{equipment.first_last_name}</td>
                                <td>{equipment.second_last_name}</td>
                            </tr>
                        ))}
                    </CDBTableBody>
                </CDBTable>

            </CDBContainer>
        </>
    )
}

export default ShowEquipment