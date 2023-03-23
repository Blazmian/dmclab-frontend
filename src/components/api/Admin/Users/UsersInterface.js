import { CDBCard, CDBCardBody, CDBContainer, CDBDataTable } from "cdbreact";
import { Container } from "react-bootstrap"

const Users = () => {
    function testClickEvent(param) {
        alert('Row Click Event');
    }

    const data = () => {
        return {
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                    width: 150,
                    attributes: {
                        'aria-controls': 'DataTable',
                        'aria-label': 'Name',
                    },
                },
                {
                    label: 'Position',
                    field: 'position',
                    width: 270,
                },
                {
                    label: 'Office',
                    field: 'office',
                    width: 200,
                },
                {
                    label: 'Age',
                    field: 'age',
                    sort: 'asc',
                    width: 100,
                },
                {
                    label: 'Start date',
                    field: 'date',
                    sort: 'disabled',
                    width: 150,
                },
                {
                    label: 'Salary',
                    field: 'salary',
                    sort: 'disabled',
                    width: 100,
                },
            ],
            rows: [
                {
                    name: 'Tiger Nixon',
                    position: 'System Architect',
                    office: 'Edinburgh',
                    age: '61',
                    date: '2011/04/25',
                    salary: '$320',
                    clickEvent: () => testClickEvent(1),
                },
                {
                    name: 'Garrett Winters',
                    position: 'Accountant',
                    office: 'Tokyo',
                    age: '63',
                    date: '2011/07/25',
                    salary: '$170',
                },
                {
                    name: 'Ashton Cox',
                    position: 'Junior Technical Author',
                    office: 'San Francisco',
                    age: '66',
                    date: '2009/01/12',
                    salary: '$86',
                },
                {
                    name: 'Cedric Kelly',
                    position: 'Senior Javascript Developer',
                    office: 'Edinburgh',
                    age: '22',
                    date: '2012/03/29',
                    salary: '$433',
                },
                {
                    name: 'Airi Satou',
                    position: 'Accountant',
                    office: 'Tokyo',
                    age: '33',
                    date: '2008/11/28',
                    salary: '$162',
                },
                {
                    name: 'Brielle Williamson',
                    position: 'Integration Specialist',
                    office: 'New York',
                    age: '61',
                    date: '2012/12/02',
                    salary: '$372',
                },
                {
                    name: 'Herrod Chandler',
                    position: 'Sales Assistant',
                    office: 'San Francisco',
                    age: '59',
                    date: '2012/08/06',
                    salary: '$137',
                },
                {
                    name: 'Rhona Davidson',
                    position: 'Integration Specialist',
                    office: 'Tokyo',
                    age: '55',
                    date: '2010/10/14',
                    salary: '$327',
                },
                {
                    name: 'Colleen Hurst',
                    position: 'Javascript Developer',
                    office: 'San Francisco',
                    age: '39',
                    date: '2009/09/15',
                    salary: '$205',
                },
                {
                    name: 'Sonya Frost',
                    position: 'Software Engineer',
                    office: 'Edinburgh',
                    age: '23',
                    date: '2008/12/13',
                    salary: '$103',
                },
                {
                    name: 'Jena Gaines',
                    position: 'Office Manager',
                    office: 'London',
                    age: '30',
                    date: '2008/12/19',
                    salary: '$90',
                },
                {
                    name: 'Quinn Flynn',
                    position: 'Support Lead',
                    office: 'Edinburgh',
                    age: '22',
                    date: '2013/03/03',
                    salary: '$342',
                },
                {
                    name: 'Charde Marshall',
                    position: 'Regional Director',
                    office: 'San Francisco',
                    age: '36',
                    date: '2008/10/16',
                    salary: '$470',
                },
                {
                    name: 'Haley Kennedy',
                    position: 'Senior Marketing Designer',
                    office: 'London',
                    age: '43',
                    date: '2012/12/18',
                    salary: '$313',
                },
                {
                    name: 'Tatyana Fitzpatrick',
                    position: 'Regional Director',
                    office: 'London',
                    age: '19',
                    date: '2010/03/17',
                    salary: '$385',
                },
                {
                    name: 'Michael Silva',
                    position: 'Marketing Designer',
                    office: 'London',
                    age: '66',
                    date: '2012/11/27',
                    salary: '$198',
                },
                {
                    name: 'Paul Byrd',
                    position: 'Chief Financial Officer (CFO)',
                    office: 'New York',
                    age: '64',
                    date: '2010/06/09',
                    salary: '$725',
                },
                {
                    name: 'Gloria Little',
                    position: 'Systems Administrator',
                    office: 'New York',
                    age: '59',
                    date: '2009/04/10',
                    salary: '$237',
                },
                {
                    name: 'Bradley Greer',
                    position: 'Software Engineer',
                    office: 'London',
                    age: '41',
                    date: '2012/10/13',
                    salary: '$132',
                },
                {
                    name: 'Dai Rios',
                    position: 'Personnel Lead',
                    office: 'Edinburgh',
                    age: '35',
                    date: '2012/09/26',
                    salary: '$217',
                },
                {
                    name: 'Jenette Caldwell',
                    position: 'Development Lead',
                    office: 'New York',
                    age: '30',
                    date: '2011/09/03',
                    salary: '$345',
                },
                {
                    name: 'Yuri Berry',
                    position: 'Chief Marketing Officer (CMO)',
                    office: 'New York',
                    age: '40',
                    date: '2009/06/25',
                    salary: '$675',
                },
                {
                    name: 'Caesar Vance',
                    position: 'Pre-Sales Support',
                    office: 'New York',
                    age: '21',
                    date: '2011/12/12',
                    salary: '$106',
                },
                {
                    name: 'Doris Wilder',
                    position: 'Sales Assistant',
                    office: 'Sidney',
                    age: '23',
                    date: '2010/09/20',
                    salary: '$85',
                },
                {
                    name: 'Angelica Ramos',
                    position: 'Chief Executive Officer (CEO)',
                    office: 'London',
                    age: '47',
                    date: '2009/10/09',
                    salary: '$1',
                },
                {
                    name: 'Gavin Joyce',
                    position: 'Developer',
                    office: 'Edinburgh',
                    age: '42',
                    date: '2010/12/22',
                    salary: '$92',
                },
                {
                    name: 'Jennifer Chang',
                    position: 'Regional Director',
                    office: 'Singapore',
                    age: '28',
                    date: '2010/11/14',
                    salary: '$357',
                },
                {
                    name: 'Brenden Wagner',
                    position: 'Software Engineer',
                    office: 'San Francisco',
                    age: '28',
                    date: '2011/06/07',
                    salary: '$206',
                },
                {
                    name: 'Fiona Green',
                    position: 'Chief Operating Officer (COO)',
                    office: 'San Francisco',
                    age: '48',
                    date: '2010/03/11',
                    salary: '$850',
                },
                {
                    name: 'Shou Itou',
                    position: 'Regional Marketing',
                    office: 'Tokyo',
                    age: '20',
                    date: '2011/08/14',
                    salary: '$163',
                },
                {
                    name: 'Michelle House',
                    position: 'Integration Specialist',
                    office: 'Sidney',
                    age: '37',
                    date: '2011/06/02',
                    salary: '$95',
                },
                {
                    name: 'Suki Burks',
                    position: 'Developer',
                    office: 'London',
                    age: '53',
                    date: '2009/10/22',
                    salary: '$114',
                },
                {
                    name: 'Prescott Bartlett',
                    position: 'Technical Author',
                    office: 'London',
                    age: '27',
                    date: '2011/05/07',
                    salary: '$145',
                },

                {
                    name: 'Donna Snider',
                    position: 'Customer Support',
                    office: 'New York',
                    age: '27',
                    date: '2011/01/25',
                    salary: '$112',
                },
            ],
        };
    };
    return (
        <>
            <Container>
                <CDBContainer>
                    <CDBCard>
                        <CDBCardBody>
                            <CDBDataTable
                                striped
                                bordered
                                hover
                                scrollY
                                maxHeight="50vh"
                                data={data()}
                                materialSearch
                            />
                        </CDBCardBody>
                    </CDBCard>
                </CDBContainer>
            </Container>
        </>
    )
}

export default Users