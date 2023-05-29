import { useContext, useEffect, useState } from "react"
import UserDefaultImg from '../../../../img/user-default-image.jpg'
import { Button } from "react-bootstrap"
import { ApiUrls } from "../../ApiUrls"
import axios from "axios"
import { CDBBox, CDBContainer, CDBIcon } from "cdbreact"

const AccountConfiguration = ({ user }) => {

    const urls = useContext(ApiUrls)

    const [imageUser, setImageUser] = useState(UserDefaultImg)

    useEffect(() => {
        obtainImageUser()
    }, [user])

    const obtainImageUser = async () => {
        if (user.length !== 0) {
            const res = await axios.get(urls.obtainStaffPhoto + user.staff.id, { responseType: 'arraybuffer' })
            if (res.data.byteLength > 0) {
                let binary = '';
                const bytes = new Uint8Array(res.data);
                const len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                setImageUser(binary)
            } else {
                setImageUser(UserDefaultImg)
            }
        }
    }

    return (
        <CDBContainer className="mt-5">
            <CDBBox display="flex" justifyContent="center">
                <CDBBox style={{ width: '80%' }}>
                    <CDBBox>
                        <h6>MI CUENTA</h6>
                        <hr className="mt-0" />
                    </CDBBox>
                    <CDBBox display="flex" justifyContent="center" alignItems="center" mt={4} mx={3}>
                        <CDBBox display="flex" flex="column" className="me-5">
                            <img src={imageUser} width={200} height={200} alt="User image" style={{ borderRadius: '60px', border: '1px solid rgba(0, 0, 0, 0.20)' }} />
                            <Button variant="outline-dark" className="mt-3">Cambiar Foto</Button>
                        </CDBBox>
                        <CDBContainer>
                            <CDBContainer>
                                <h2>{user.staff.name + ' ' + user.staff.first_last_name + ' ' + user.staff.second_last_name}</h2>
                                <CDBBox display="flex" alignItems="center" mb={3} mt={4}>
                                    <CDBIcon icon="crown" className="me-2" /><h5 className="m-0">Administrador: {user.username}</h5>
                                </CDBBox>
                            </CDBContainer>
                            <CDBContainer>
                                <CDBBox display="flex" flex="fill" mt={5}>
                                    <Button variant="warning"><CDBIcon icon="user-cog" className="me-2" />Cambiar contraseña</Button>
                                </CDBBox>
                            </CDBContainer>
                        </CDBContainer>
                    </CDBBox>
                </CDBBox>
            </CDBBox>

        </CDBContainer>
    )
}

export default AccountConfiguration