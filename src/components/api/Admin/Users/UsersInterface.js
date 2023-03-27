import { CDBBox, CDBBtn, CDBContainer, CDBDropDown, CDBDropDownMenu, CDBDropDownToggle, CDBIcon, CDBInput } from "cdbreact";
import NavBarAdmin from "../NavBarAdmin";
import ShowUsers from "./ShowUsers";

const Users = () => {


    return (
        <>
            <NavBarAdmin icon={'users'} title={'Usuarios'} />
            <CDBContainer className="mt-5 mb-3">
                <CDBBox display="flex">
                    <CDBBox display="flex" justifyContent="start">
                        <CDBBtn style={{ borderRadius: '12px' }}><CDBIcon icon="user-plus" className="ml-3" />Agregar usuario</CDBBtn>
                    </CDBBox>
                    <CDBBox display="flex" flex="fill" justifyContent="end">
                        <CDBInput style={{ borderRadius: '12px' }} placeholder="Buscar usuarios" className="mx-3 w-50" icon={<i className="fa fa-search text-dark"></i>} />
                        <CDBBtn style={{ borderRadius: '12px' }} outline color="dark"><CDBIcon icon="filter" className="ml-3" />Filtrar</CDBBtn>
                    </CDBBox>
                </CDBBox>
            </CDBContainer>
            <ShowUsers />
        </>
    )
}

export default Users