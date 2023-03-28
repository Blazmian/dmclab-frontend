import { CDBIcon } from "cdbreact"

const BadgesUsers = (props) => {
    if (props.user.admin) {
        if (props.user.receptionist) {
            return (
                <>
                    <CDBIcon icon="crown" />
                    <CDBIcon icon="chalkboard-teacher" />
                </>
            )
        } else {
            return (
                <>
                    <CDBIcon icon="crown" />
                </>
            )
        }
    } else {
        if (props.user.eceptionist) {
            return (
                <>
                    <CDBIcon icon="chalkboard-teacher" />
                </>
            )
        }
    }
}

export default BadgesUsers