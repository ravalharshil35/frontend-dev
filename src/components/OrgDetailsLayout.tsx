import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Spinner from './Spinner';
import LeftPanel from './LeftPanel';
import { useContext } from 'react';
import { StudentManagerContext } from '../context/studentContext';
import PageTitle from './PageTitle';
import Avatar from '@mui/material/Avatar';
import styles from "../styles/StudentDetails.module.css";
import { useLocation } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

function StudentDetailsLayout() {
    const { studentDetails, loadStudentDetails,loading }: any = useContext(StudentManagerContext);
    const location = useLocation();
    const id = location.state.key;

    React.useEffect(() => {
        loadStudentDetails({ 'Id': id });
    }, []);

    // const Gender: any = {
    //     Male: "M",
    //     Female: "F",
    //     NonBinary: "R",
    //     GenderX: "X",
    //     NotEntered: "9"
    // };

    //const { loading } = useContext(StudentManagerContext);
    const [avatarSrc] = React.useState<string | undefined>(undefined);
    const title = "Org. Details";

    return (
        <Box sx={{ display: 'flex', mt: 6 }}>
            <CssBaseline />
            <LeftPanel />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <PageTitle props={title} />

                {/* Avatar and Name */}
                <Box className={styles.avatar_wrapper} sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Box sx={{ padding:'15px',marginRight: '25px', textAlign: '-webkit-center', borderRight: '1px solid #dfd4d4' }}>
                        <Avatar
                            alt="Upload new avatar"
                            src={avatarSrc}
                            className={styles.avatar}
                            sx={{ width: 64, height: 64 }}
                        />
                        <Box>
                            <Box sx={{ fontWeight: 'bold', fontSize: '18px', mt: 1 }}>
                                {studentDetails.StudentTitle} {studentDetails.StudentGivenName} {studentDetails.StudentFamilyName}
                            </Box>
                            <Box sx={{ fontSize: '14px', color: 'gray' }}>
                                Student ID: {studentDetails.StudentId}
                            </Box>
                        </Box>
                    </Box>
                    <Grid container spacing={3} >
                        {/* First Row */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle2" color="text.secondary">Gender</Typography>
                            <Typography sx={{borderBottom:'1px solid #dfd4d4'}}>{studentDetails.StudentGender || '--'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle2" color="text.secondary">Date of Birth</Typography>
                            <Typography sx={{borderBottom:'1px solid #dfd4d4'}}>
                                {studentDetails.StudentBirthDate
                                    ? new Date(studentDetails.StudentBirthDate).toISOString().split('T')[0]
                                    : '--'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle2" color="text.secondary">Phone Number</Typography>
                            <Typography sx={{borderBottom:'1px solid #dfd4d4'}}>{studentDetails.StudentPhoneNumber || '--'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle2" color="text.secondary">Email ID</Typography>
                            <Typography sx={{borderBottom:'1px solid #dfd4d4'}}>{studentDetails.StudentEmailAddress || '--'}</Typography>
                        </Grid>

                        {/* Second Row */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle2" color="text.secondary">Country</Typography>
                            <Typography sx={{borderBottom:'1px solid #dfd4d4'}}>{studentDetails.StudentBirthCountry || '--'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle2" color="text.secondary">Nationality</Typography>
                            <Typography sx={{borderBottom:'1px solid #dfd4d4'}}>{studentDetails.StudentNationality || '--'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle2" color="text.secondary">Citizenship</Typography>
                            <Typography sx={{borderBottom:'1px solid #dfd4d4'}}>{studentDetails.StudentCitizenship || '--'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle2" color="text.secondary">State</Typography>
                            <Typography sx={{borderBottom:'1px solid #dfd4d4'}}>{studentDetails.StudentAddressState || '--'}</Typography>
                        </Grid>
                    </Grid>
                </Box>


                {/* <OrgData /> */}
            </Box>

            {loading && <Spinner />}
        </Box>
    );
}

export default React.memo(StudentDetailsLayout);
