import React, { useEffect } from 'react';
import { StudentManagerContext } from '../context/studentContext';
import { useLocation, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Typography, Grid } from '@mui/material';
import styles from "../styles/StudentDetails.module.css";
import downloadIcon from "../assets/download-icon.svg";
import verifyIcon from "../assets/verify-icon.svg";
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

const fieldLabels:any = {
    SlStudentId: 'Application Id',
    IsIncomplete: 'Is Incomplete',
    Status: 'Status',
    ImportDefinitionName: 'Import Definition',
    AgentExternalOrganisationCode: 'Agent Org Code',
    ApplicationWorkflowStatus: 'Workflow Status',
    AdmissionCentreImportProfileCode: 'Admission Profile',
    StudyStudyPackageCode: 'Study Package Code',
    StudyStudyPackageVersionNumber: 'Package Version',
    StudyAvailabilityLocation: 'Location',
    StudyAvailabilityYear: 'Year',
    StudyAvailabilityStudyPeriod: 'Study Period',
    StudyAvailabilityNumber: 'Availability Number',
    StudyLiabilityCategory: 'Liability Category',
    StudyLoadCategory: 'Load Category',
    StudyAttendanceMode: 'Attendance Mode',
    StudyStudyMode: 'Study Mode',
    StudyBasisOfAdmission: 'Basis of Admission',
};

const sectionFields = {
    'Application Details': Object.keys(fieldLabels),
};

// const Gender: any = {
//     Male: 'M',
//     Female: 'F',
//     NonBinary: 'R',
//     GenderX: 'X',
//     NotEntered: '9',
// };

function ApplicationData() {
    const {
        applicationDetails,
        applicationDocuments,
        loadApplicationDetails,
        verifyApplication,
    }: any = React.useContext(StudentManagerContext);

    const location = useLocation();
    const id = location.state.key;

    useEffect(() => {
        loadApplicationDetails({ Id: id });
    }, []);

    const verifyApplicationHandler = () => {
        verifyApplication({ ids: [id] });
    };

    // const handleExportCSV = () => {
    //     downloadCsv({
    //         fileName: 'Application',
    //         data: [
    //             {
    //                 "LineType": "APP",
    //                 "CreateDefaultRequirements": applicationDetails?.CreateDefaultRequirements,
    //                 "StudentId": applicationDetails?.StudentId,
    //                 "StudentAlternateId": applicationDetails?.StudentGivenName,
    //                 "StudentAlternateIdType": applicationDetails?.StudentOtherName,
    //                 "IsIncomplete": applicationDetails?.IsIncomplete,
    //                 "Status": applicationDetails?.Status,
    //                 "ImportDefinitionName": applicationDetails?.ImportDefinitionName,
    //                 "AgentExternalOrganisationCode": applicationDetails?.AgentExternalOrganisationCode,
    //                 "ApplicationWorkflowStatus": applicationDetails?.ApplicationWorkflowStatus,
    //                 "AdmissionCentreImportProfileCode": applicationDetails?.AdmissionCentreImportProfileCode,
    //                 "StudyStudyPackageCode": applicationDetails?.StudyStudyPackageCode,
    //                 "StudyStudyPackageVersionNumber": applicationDetails?.StudyStudyPackageVersionNumber,
    //                 "StudyAvailabilityLocation": applicationDetails?.StudyAvailabilityLocation,
    //                 "StudyAvailabilityYear": applicationDetails?.StudyAvailabilityYear,
    //                 "StudyAvailabilityStudyPeriod": applicationDetails?.StudyAvailabilityStudyPeriod,
    //                 "StudyAvailabilityNumber": applicationDetails?.StudyAvailabilityNumber,
    //                 "StudyLiabilityCategory": applicationDetails?.StudyLiabilityCategory,
    //                 "StudyLoadCategory": applicationDetails?.StudyLoadCategory,
    //                 "StudyAttendanceMode": applicationDetails?.StudyAttendanceMode,
    //                 "StudyStudyMode": applicationDetails?.StudyStudyMode,
    //                 "StudyBasisOfAdmission": applicationDetails?.StudyBasisOfAdmission,
    //             }
    //         ]
    //     });
    // };

    console.log("applicationDetails==>",applicationDetails);
    
    const renderSection = (title: string, keys: string[]) => (
        <Box sx={{ marginBottom: '30px', padding: '0' }} key={title}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    color: '#182958',
                    background: '#f3f3f3',
                    padding: '10px',
                    fontSize: '14px',
                }}
            >
                {title}
            </Typography>
            <Grid container spacing={2} sx={{ padding: '0' }}>
                {keys.map((key) => (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                        <Item
                            style={{ boxShadow: 'none', borderBottom: '1px solid rgb(207, 206, 206)' }}
                            className={styles.answerInputs}
                        >
                            <Typography sx={{ color: '#182958', fontSize: '12px' }}>
                                {fieldLabels[key] || key}
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                                {(() => {
                                    const value = applicationDetails[key];
                                    if (!value) return '--';
                                    if (key.includes('Date')) {
                                        const date = new Date(value);
                                        return isNaN(date.getTime()) ? value : date.toLocaleDateString();
                                    }
                                    return value;
                                })()}
                            </Typography>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

   const renderDocumentList = () => {
        if (!applicationDocuments || applicationDocuments.length === 0) {
            return (
                <Typography sx={{ padding: '10px', color: '#999' }}>
                    No files uploaded.
                </Typography>
            );
        }

        return (
            <Accordion sx={{ mb: 1, border: '1px solid #ccc', boxShadow: 'none' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} className={styles.accordion_button}>
                    <Typography sx={{ fontWeight: 'bold', color: '#182958', fontSize: '15px'
                        ,padding:'none',margin:'0',minHeight:'auto'
                     }}>
                        Uploaded Files
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {applicationDocuments.map((item: any, index: number) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Link
                                    to={item?.downloadlink?._text}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        color: '#182958',
                                    }}
                                >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                                        {item?.documenttypename?._text || 'Untitled Document'}
                                    </Typography>
                                    <SimCardDownloadIcon />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        );
    };

    return (
        <Box sx={{ flexGrow: 1, padding: '0' }}>
            <Box sx={{ marginBottom: '30px', display: 'flex', justifyContent: 'flex-end', padding: '10px 15px' }}>
                <Button
                    variant="contained"
                    disabled={applicationDetails?.IsVarified}
                    onClick={verifyApplicationHandler}
                    sx={{ marginRight: '15px', padding: '6px 12px',opacity:applicationDetails.IsVarified?'0.4':'1' }}
                    className={styles.exportButtons}
                >
                    <img src={verifyIcon} alt="Verify" style={{ height: '20px', width: '20px' }} />
                </Button>
                <Button
                    variant="contained"
                    disabled={!applicationDetails?.IsVarified}
                    // onClick={handleExportCSV}
                    sx={{ marginRight: '15px', padding: '6px 12px' }}
                    className={styles.exportButtons}
                >
                    <img src={downloadIcon} alt="Download" style={{ height: '20px', width: '20px' }} />
                </Button>
            </Box>

            {Object.entries(sectionFields).map(([title, keys]) => renderSection(title, keys))}

            <Box sx={{ marginBottom: '30px', padding: '0' }}>
                {renderDocumentList()}
            </Box>
        </Box>
    );
}

export default ApplicationData;
