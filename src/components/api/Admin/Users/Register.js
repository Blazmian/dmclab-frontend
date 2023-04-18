import { useParams } from "react-router-dom"
import RegisterAdmin from "./RegisterAdmin"
import RegisterReceptionist from "./RegisterReceptionist"

const Register = () => {
    const { type, id } = useParams()
    const idUser = atob(id)

    if (atob(type) === 'admin') {
        return (
            <RegisterAdmin id={idUser} />
        )
    } else if (atob(type) === 'receptionist') {
        return (
            <RegisterReceptionist id={idUser} />
        )
    }
}

export default Register