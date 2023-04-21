import { CDBIcon } from "cdbreact"

const BadgesEquipment = (props) => {
    if (props.equipment.projector === true) {
        return (
            <>
                <CDBIcon icon="video" />
            </>
        )
    } else if (props.equipment.extension === true) {
        return (
            <>
                <CDBIcon icon="plug" />
            </>
        )
    } else {
        return (
            <>
                <CDBIcon icon="box" />
            </>
        )
    }
}

export default BadgesEquipment