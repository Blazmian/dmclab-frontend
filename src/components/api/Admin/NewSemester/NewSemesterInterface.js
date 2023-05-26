import { useState } from "react";
import NavBarAdmin from "../NavBarAdmin"
import { Container } from "react-bootstrap";
import * as XLSX from 'xlsx';
import LoadSheetData from "./LoadSheetData";
import LoadExcelFile from "./LoadExcelFile";

const Semester = () => {

    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [sheetNames, setSheetNames] = useState([])
    const [sheetData, setSheetData] = useState({})

    const [isDraging, setIsDraging] = useState(false)

    const handleDragEnter = () => {
        setIsDraging(true)
    }

    const handleDragExit = () => {
        setIsDraging(false)
    }

    const handleDrop = async (acceptedFiles) => {
        setIsLoading(true)
        setFile(acceptedFiles[0]);
        setIsDraging(false)

        const data = await acceptedFiles[0].arrayBuffer()
        const wb = XLSX.read(data)
        setSheetNames(wb.SheetNames)

        var mySheetData = {}

        for (var i = 0; i < wb.SheetNames.length; i++) {
            let sheetName = wb.SheetNames[i]

            const worksheet = wb.Sheets[sheetName]
            const jsonData = XLSX.utils.sheet_to_json(worksheet)

            mySheetData[sheetName] = jsonData
        }
        setSheetData(mySheetData)
        setIsLoading(false)
    }

    return (
        <><div>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments)}
gtag('js', new Date());

gtag('config', 'G-EV6GHP7VHP');
</script>
        </div>
            <NavBarAdmin icon={'sync'} title={'Cambio de Semestre'} />
            <div style={{ overflowY: 'auto', maxHeight: '85vh' }}>
            <div><script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-EV6GHP7VHP');
</script></div>
                <Container className="mt-5">
                    <LoadExcelFile
                        onDrop={handleDrop}
                        isDraging={isDraging}
                        handleDragEnter={handleDragEnter}
                        handleDragExit={handleDragExit}
                        isLoading={isLoading}
                        file={file}
                    />
                    {Object.keys(sheetData).length !== 0 ? (
                        <LoadSheetData sheetData={sheetData} sheetNames={sheetNames} />
                    ) : (
                        <></>
                    )}

                </Container >
            </div>
        </>
    )
}

export default Semester