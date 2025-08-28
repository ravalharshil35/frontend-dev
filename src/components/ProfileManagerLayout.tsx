import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Spinner from './Spinner';
import ProfileDataTable from './ProfileDataTable';
import CreateProfilePopup from './CreateProfilePopup';
import LeftPanel from './LeftPanel';
import { useContext } from 'react';
import { ProfileManagerContext } from '../context/profileContext';
import PageTitle from './PageTitle';
import styles from '../styles/Profiles.module.css'


function ProfileManagerLayout() {
   const {loading}:any=useContext(ProfileManagerContext)
//   React.useEffect(()=>{
//    LoadProfileData()
//   })
const title="Profiles"
    return (
        <Box sx={{ display: 'flex', mt:6 }}>
            <CssBaseline />
            <LeftPanel />
            <Box component="main" sx={{ flexGrow: 1, p: 3, verticalAlign: 'center', alignItems: 'center' }}>
            <PageTitle className={styles.title} props={title}/>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' }, display: 'flex' }}
                    noValidate
                    autoComplete="off"
                >
                    <CreateProfilePopup/>
                </Box>
                <Divider sx={{ mt: 2 }} />
                <ProfileDataTable />
            </Box>
            {loading ?
                <Spinner /> :
                <></>
            }
        </Box>
    );
}
export default React.memo(ProfileManagerLayout)
