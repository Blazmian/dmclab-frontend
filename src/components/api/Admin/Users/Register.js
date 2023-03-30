import { useParams } from "react-router-dom"
import RegisterAdmin from "./RegisterAdmin"
import RegisterReceptionist from "./RegisterReceptionist"

const Register = () => {
    const { destiny, id } = useParams()

    const idUser = atob(id)

    if (atob(destiny) === 'admin') {
        return (
            <RegisterAdmin id={idUser} />
        )
    } else if (atob(destiny) === 'receptionist') {
        return (
            <RegisterReceptionist id={idUser} />
        )
    }
}

export default Register