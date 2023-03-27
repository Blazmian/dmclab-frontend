import { CDBAccordion, CDBBox, CDBBtn, CDBContainer, CDBIcon, CDBInput } from "cdbreact"
import NavBarAdmin from "../NavBarAdmin"
import ShowEquipment from "./ShowEquipment"

const Equipment = () => {
    return (
        <>
            <NavBarAdmin icon={'archive'} title={'Equipo'} />
            <CDBContainer className="mt-5 mb-3">
                <CDBBox display="flex">
                    <CDBBox display="flex" justifyContent="start">
                        <CDBBtn style={{ borderRadius: '12px' }}><CDBIcon icon="plus" className="ml-3" />Agregar equipo</CDBBtn>
                    </CDBBox>
                    <CDBBox display="flex" flex="fill" justifyContent="end">
                        <CDBInput style={{ borderRadius: '12px' }} placeholder="Buscar equipo" className="mx-3 w-50" icon={<i className="fa fa-search text-dark"></i>} />
                        <CDBBtn style={{ borderRadius: '12px' }} outline color="dark"><CDBIcon icon="filter" className="ml-3" />Filtrar</CDBBtn>
                    </CDBBox>
                </CDBBox>
            </CDBContainer>
            <ShowEquipment />
        </>
    )
}

export default Equipment