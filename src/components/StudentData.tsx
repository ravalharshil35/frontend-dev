import React, { useEffect } from 'react';
import { StudentManagerContext } from '../context/studentContext';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Typography, Grid } from '@mui/material';
import downloadCsv from '../utility/downloadCsv';
import styles from "../styles/StudentDetails.module.css";
import downloadIcon from "../assets/download-icon.svg";
import verifyIcon from "../assets/verify-icon.svg";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    ...theme.applyStyles?.('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const Gender: any = {
    Male: 'M',
    Female: 'F',
    NonBinary: 'R',
    GenderX: 'X',
    NotEntered: '9',
};

const sectionFields = {
    'Personal Details': [
        'StudentId',
        'StudentFamilyName',
        'StudentGivenName',
        'StudentOtherName',
        'StudentTitle',
        'StudentBirthDate',
        'StudentGender',
        'StudentAboriginalOrTorresStraitIslander',
        'StudentIgnoreDuplicateCheck',
        'StudentCitizenship',
        'StudentBirthCountry',
        'StudentNationality',
        'StudentHomeLanguage',
        'StudentAdmissionCentreImportProfileCode',
    ],
    Address: [
        'StudentAddressType',
        'StudentAddressAccommodationBuilding',
        'StudentAddressLine1',
        'StudentAddressLine2',
        'StudentAddressLine3',
        'StudentAddressSuburb',
        'StudentAddressState',
        'StudentAddressPostcode',
        'StudentAddressCountr',
        'StudentAddressIsPreferred',
    ],
    'Email Info': [
        'StudentEmailType',
        'StudentEmailAddress',
        'StudentEmailComments',
        'StudentEmailIsPreferred',
        'StudentEmailIsInvalid',
        'StudentEmailDeleteFlag',
    ],
    'Phone Info': [
        'StudentPhoneType',
        'StudentPhoneNumber',
        'StudentPhoneComments',
        'StudentPhonePreferredVoice',
        'StudentPhonePreferredSms',
        'StudentPhonePreferredFax',
        'StudentPhoneIsInvalid',
        'StudentPhoneDeleteFlag',
    ],
    'Alternate ID': [
        'StudentAlternateIdType',
        'StudentAlternateId',
        'StudentAlternateIdYear',
        'StudentAlternateIdValidationDate',
        'StudentAlternateIdValidationOutcome',
        'StudentAlternateIdValidationReason',
        'StudentAlternateIdDeleteFlag',
    ],
};

const fieldLabels: { [key: string]: string } = {
    StudentId: 'Student ID',
    StudentFamilyName: 'Family Name',
    StudentGivenName: 'Given Name',
    StudentOtherName: 'Other Name',
    StudentTitle: 'Title',
    StudentBirthDate: 'Birth Date',
    StudentGender: 'Gender',
    StudentAboriginalOrTorresStraitIslander: 'Aboriginal/Torres Strait Islander',
    StudentIgnoreDuplicateCheck: 'Ignore Duplicate Check',
    StudentCitizenship: 'Citizenship',
    StudentBirthCountry: 'Birth Country',
    StudentNationality: 'Nationality',
    StudentHomeLanguage: 'Home Language',
    StudentAdmissionCentreImportProfileCode: 'Admission Profile',

    StudentAddressType: 'Address Type',
    StudentAddressAccommodationBuilding: 'Building',
    StudentAddressLine1: 'Address Line 1',
    StudentAddressLine2: 'Address Line 2',
    StudentAddressLine3: 'Address Line 3',
    StudentAddressSuburb: 'Suburb',
    StudentAddressState: 'State',
    StudentAddressPostcode: 'Postcode',
    StudentAddressCountr: 'Country',
    StudentAddressIsPreferred: 'Preferred Address',

    StudentEmailType: 'Email Type',
    StudentEmailAddress: 'Email Address',
    StudentEmailComments: 'Email Comments',
    StudentEmailIsPreferred: 'Preferred Email',
    StudentEmailIsInvalid: 'Invalid Email',
    StudentEmailDeleteFlag: 'Delete Email',

    StudentPhoneType: 'Phone Type',
    StudentPhoneNumber: 'Phone Number',
    StudentPhoneComments: 'Phone Comments',
    StudentPhonePreferredVoice: 'Preferred Voice',
    StudentPhonePreferredSms: 'Preferred SMS',
    StudentPhonePreferredFax: 'Preferred Fax',
    StudentPhoneIsInvalid: 'Invalid Phone',
    StudentPhoneDeleteFlag: 'Delete Phone',

    StudentAlternateIdType: 'Alt. ID Type',
    StudentAlternateId: 'Alt. ID',
    StudentAlternateIdYear: 'Alt. ID Year',
    StudentAlternateIdValidationDate: 'Validation Date',
    StudentAlternateIdValidationOutcome: 'Validation Outcome',
    StudentAlternateIdValidationReason: 'Validation Reason',
    StudentAlternateIdDeleteFlag: 'Delete Alt. ID',
};

function StudentData() {
    const { studentDetails, loadStudentDetails, verifyStudent }: any = React.useContext(StudentManagerContext);
    const location = useLocation();
    const id = location.state.key;

    useEffect(() => {
        const payload = {
            Id: id,
            SortExpression: 'StudentFamilyName',
            SortOrder: "ASC",
            PageSize: 10,
            CurrentPage: 1,
            StudentFamilyName: null,
            StudentGivenName: null,
            EmailId: null,
            StartDate: null,
            EndDate: null,
            T1StudentId: null,
            SlStudentId: null
        }
        loadStudentDetails(payload);
    }, []);

    const verifyStudentHandler = () => {
        verifyStudent({ ids: [id] });
    };

    const handleExportCSV = () => {
        downloadCsv({
            fileName: 'Student',
            data: [
                {
                    "LineType": "StudyLink",
                    "StudentId": studentDetails.StudentId,
                    "StudentFamilyName": studentDetails.StudentFamilyName,
                    "StudentGivenName": studentDetails.StudentGivenName,
                    "StudentOtherName": studentDetails.StudentOtherName,
                    "StudentTitle": studentDetails.StudentTitle,
                    "StudentBirthDate": studentDetails.StudentBirthDate,
                    "StudentGender": Gender[studentDetails.StudentGender.replace(/[^a-zA-Z ]/g, "")],
                    "StudentAboriginalOrTorresStraitIslander": studentDetails.StudentAboriginalOrTorresStraitIslander,
                    "StudentIgnoreDuplicateCheck": studentDetails.StudentIgnoreDuplicateCheck,
                    "StudentCitizenship": studentDetails.StudentCitizenship,
                    "StudentBirthCountry": studentDetails.StudentBirthCountry,
                    "StudentNationality": studentDetails.StudentNationality,
                    "StudentHomeLanguage": studentDetails.StudentHomeLanguage,
                    "StudentAdmissionCentreImportProfileCode": studentDetails.StudentAdmissionCentreImportProfileCode,
                    "StudentAddressType": studentDetails.StudentAddressType,
                    "StudentAddressAccommodationBuilding": studentDetails.StudentAddressAccommodationBuilding,
                    "StudentAddressLine1": studentDetails.StudentAddressLine1,
                    "StudentAddressLine2": studentDetails.StudentAddressLine2,
                    "StudentAddressLine3": studentDetails.StudentAddressLine3,
                    "StudentAddressSuburb": studentDetails.StudentAddressSuburb,
                    "StudentAddressState": studentDetails.StudentAddressState,
                    "StudentAddressPostcode": studentDetails.StudentAddressPostcode,
                    "StudentAddressCountr": studentDetails.StudentAddressCountr,
                    "StudentAddressIsPreferred": studentDetails.StudentAddressIsPreferred,
                    "StudentEmailType": studentDetails.StudentEmailType,
                    "StudentEmailAddress": studentDetails.StudentEmailAddress,
                    "StudentEmailComments": studentDetails.StudentEmailComments,
                    "StudentEmailIsPreferred": studentDetails.StudentEmailIsPreferred,
                    "StudentEmailIsInvalid": studentDetails.StudentEmailIsInvalid,
                    "StudentEmailDeleteFlag": studentDetails.StudentEmailDeleteFlag,
                    "StudentPhoneType": studentDetails.StudentPhoneType,
                    "StudentPhoneNumber": studentDetails.StudentPhoneNumber,
                    "StudentPhoneComments": studentDetails.StudentPhoneComments,
                    "StudentPhonePreferredVoice": studentDetails.StudentPhonePreferredVoice,
                    "StudentPhonePreferredSms": studentDetails.StudentPhonePreferredSms,
                    "StudentPhonePreferredFax": studentDetails.StudentPhonePreferredFax,
                    "StudentPhoneIsInvalid": studentDetails.StudentPhoneIsInvalid,
                    "StudentPhoneDeleteFlag": studentDetails.StudentPhoneDeleteFlag,
                    "StudentAlternateIdType": studentDetails.StudentAlternateIdType,
                    "StudentAlternateId": studentDetails.StudentAlternateId,
                    "StudentAlternateIdYear": studentDetails.StudentAlternateIdYear,
                    "StudentAlternateIdValidationDate": studentDetails.StudentAlternateIdValidationDate,
                    "StudentAlternateIdValidationOutcome": studentDetails.StudentAlternateIdValidationOutcome,
                    "StudentAlternateIdValidationReason": studentDetails.StudentAlternateIdValidationReason,
                    "StudentAlternateIdDeleteFlag": studentDetails.StudentAlternateIdDeleteFlag
                    // ...studentDetails,
                    //StudentGender: Gender[studentDetails.StudentGender?.replace(/[^a-zA-Z]/g, '')] || '',
                },
            ],
        });
    };

    const renderSection = (title: string, keys: string[]) => (
        <Box sx={{ marginBottom: '30px', padding: '0' }} key={title}>
            <Typography variant="h6" sx={{
                fontWeight: 'bold', mb: 2, color: '#182958', background: 'rgba(0, 0, 0, 0.04)',
                padding: '10px', fontSize: '14px'
            }}>
                {title}
            </Typography>
            <Grid container spacing={2} sx={{ padding: '0' }}>
                {keys.map((key) => (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                        <Item style={{ boxShadow: 'none', borderBottom: '1px solid rgb(207, 206, 206)' }}
                            className={styles.answerInputs}>
                            <Typography sx={{ color: '#182958', fontSize: '12px' }}>
                                {fieldLabels[key] || key}
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                                {
                                    studentDetails[key] ?
                                        isNaN(new Date(studentDetails[key]).getTime()) ?
                                            studentDetails[key] :
                                            new Date(studentDetails[key]).toISOString().split('T')[0]
                                        : '--'
                                }
                                {/* {(() => {
                                    const value = studentDetails[key];
                                    if (!value) return '--';
                                    if (key === 'StudentBirthDate') {
                                        const date = new Date(value);
                                        return isNaN(date.getTime()) ? value : date.toISOString().split('T')[0];
                                    }
                                    return value;
                                })()} */}
                            </Typography>

                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1, padding: '0' }}>
            <Box sx={{ marginBottom: '30px', display: 'flex', justifyContent: 'flex-end', padding: '10px 15px' }}>
                <Button
                    variant="contained"
                    disabled={studentDetails?.IsVarified}
                    onClick={verifyStudentHandler}
                    sx={{ marginRight: '15px', padding: '6px 12px', opacity: studentDetails?.IsVarified ? '0.4' : '1' }}
                    className={styles.exportButtons}
                >
                    <img
                        src={verifyIcon}
                        alt="Verify"
                        style={{ height: '20px', width: '20px' }}
                    />
                </Button>
                <Button
                    variant="contained"
                    disabled={!studentDetails?.IsVarified}
                    onClick={handleExportCSV}
                    sx={{ marginRight: '15px', padding: '6px 12px' }}
                    className={styles.exportButtons}
                >
                    <img
                        src={downloadIcon}
                        alt="download"
                        style={{ height: '20px', width: '20px' }}
                    />
                </Button>
            </Box>

            {Object.entries(sectionFields).map(([title, keys]) => renderSection(title, keys))}
        </Box>
    );
}

export default StudentData;
