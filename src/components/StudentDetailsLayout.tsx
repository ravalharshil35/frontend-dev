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
import DetailsTabbing from "./DetailsTabbing";

function StudentDetailsLayout() {
  const { studentDetails, loadStudentDetails,loading }:any = useContext(StudentManagerContext);
  const location = useLocation();
  const id = location.state.key;
  //const { loading } = useContext(StudentManagerContext);
  console.log("id====",id)

  const [avatarSrc] = React.useState<string | undefined>(undefined);
  const [title, setTitle] = React.useState("Student Details");

  React.useEffect(() => {
    const payload = {
    Id:id,
    SortExpression: 'StudentFamilyName',
    SortOrder: "ASC",
    PageSize: 10,
    CurrentPage: 1,
    StudentFamilyName:null,
    StudentGivenName:null,
    StartDate:null,
    EndDate: null,
    T1StudentId:null,
    SlStudentId: null
  }
  console.log("payload", payload)
    loadStudentDetails(payload);
  }, []);

  return (
    <Box sx={{ display: 'flex', mt: 6 }}>
      <CssBaseline />
      <LeftPanel />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <PageTitle props={title} />

        <Box className={styles.avatar_wrapper} sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Box sx={{ padding: '15px', marginRight: '25px', textAlign: '-webkit-center', borderRight: '1px solid #dfd4d4' }}>
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
              <Box sx={{ fontSize: '14px' }}>
                Student ID: {studentDetails.StudentId}
              </Box>
            </Box>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" className={styles.text_headings}>Gender</Typography>
              <Typography sx={{ borderBottom: '1px solid #dfd4d4' }} className={styles.text_inputs}>
                {studentDetails.StudentGender || '--'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" className={styles.text_headings}>Date of Birth</Typography>
              <Typography sx={{ borderBottom: '1px solid #dfd4d4' }} className={styles.text_inputs}>
                {studentDetails.StudentBirthDate
                  ? new Date(studentDetails.StudentBirthDate).toISOString().split('T')[0]
                  : '--'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" className={styles.text_headings}>Phone Number</Typography>
              <Typography sx={{ borderBottom: '1px solid #dfd4d4'}} className={styles.text_inputs}>
                {studentDetails.StudentPhoneNumber || '--'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" className={styles.text_headings}>Email ID</Typography>
              <Typography sx={{ borderBottom: '1px solid #dfd4d4' }} className={styles.text_inputs}>
                {studentDetails.StudentEmailAddress || '--'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" className={styles.text_headings}>Country</Typography>
              <Typography sx={{ borderBottom: '1px solid #dfd4d4' }} className={styles.text_inputs}>
                {studentDetails.StudentBirthCountry || '--'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" className={styles.text_headings}>Nationality</Typography>
              <Typography sx={{ borderBottom: '1px solid #dfd4d4' }} className={styles.text_inputs}>
                {studentDetails.StudentNationality || '--'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" className={styles.text_headings}>Citizenship</Typography>
              <Typography sx={{ borderBottom: '1px solid #dfd4d4' }} className={styles.text_inputs}>
                {studentDetails.StudentCitizenship || '--'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" className={styles.text_headings}>State</Typography>
              <Typography sx={{ borderBottom: '1px solid #dfd4d4' }} className={styles.text_inputs}>
                {studentDetails.StudentAddressState || '--'}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <DetailsTabbing onTabChange={(label: string) => setTitle(label)} />
      </Box>

      {loading && <Spinner />}
    </Box>
  );
}

export default React.memo(StudentDetailsLayout);
