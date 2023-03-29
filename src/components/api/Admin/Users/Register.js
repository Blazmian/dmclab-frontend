import { useParams } from "react-router-dom"
import RegisterAdmin from "./RegisterAdmin"

const Register = () => {
    const { destiny, id } = useParams()

    const idUser = atob(id)

    if (atob(destiny) === 'admin') {
        return(
            <RegisterAdmin id={idUser} />
        )
    }
}

export default Register