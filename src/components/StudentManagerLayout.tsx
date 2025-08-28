import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Spinner from './Spinner';
import StudentDataTable from './StudentDataTable';
// import CreateStudentPopup from './CreateStudentPopup';
import LeftPanel from './LeftPanel';
import { useContext } from 'react';
import { StudentManagerContext } from '../context/studentContext';


function StudentManagerLayout() {
   const {loading}:any=useContext(StudentManagerContext)
//   React.useEffect(()=>{
//    //LoadStudentData()
//   })
//const title="StudyLink Students"
    return (
        <Box sx={{ display: 'flex', mt:6 }}>
            <CssBaseline />
            <LeftPanel />
            <Box component="main" sx={{ flexGrow: 1, p: 3, verticalAlign: 'center', alignItems: 'center' }}>
            {/* <PageTitle props={title}/> */}
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' }, display: 'flex' }}
                    noValidate
                    autoComplete="off"
                >
                </Box>
                
                <StudentDataTable />
            </Box>
            {loading ?
                <Spinner /> :
                <></>
            }
        </Box>
    );
}
export default React.memo(StudentManagerLayout)
