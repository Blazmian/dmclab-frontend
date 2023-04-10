import { CDBIcon } from "cdbreact"

const BadgesUsers = (props) => {
    if (props.user.admin === true) {   
        return (
            <>
                <CDBIcon icon="crown" />
            </>
        )
    }

    if (props.user.receptionist === true) {
        return (
            <>
                <CDBIcon icon="chalkboard-teacher" />
            </>
        )
    }
}

export default BadgesUsers