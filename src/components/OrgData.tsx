import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Typography, Grid } from '@mui/material';
import { StudentManagerContext } from '../context/studentContext';
import downloadCsv from '../utility/downloadCsv';
import styles from "../styles/StudentDetails.module.css";
import downloadIcon from "../assets/download-icon.svg";

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

const displayFields: any = {
    Id: 'ID',
    ContextEcaConnectorStudentId: 'Context ECA Connector Student ID',
    AgencyCode: 'Agency Code',
    AgencyName: 'Agency Name',
    Status: 'Status',
};

function OrgData() {
    const { orgDetails, loadOrgDetails }: any = React.useContext(StudentManagerContext);
    const location = useLocation();
    const id = location.state.key;

    useEffect(() => {
        loadOrgDetails({ Id: id });
        console.log("hello")
    }, []);

    const handleExportCSV = () => {
        const csvData = [
            { LineType: 'Code', EXTORG: orgDetails.AgencyCode },
            { LineType: 'Name', EXTORG: orgDetails.AgencyName },
            { LineType: 'OrganisationType', EXTORG: 'AGT' },
            { LineType: 'ParentCode', EXTORG: null },
            { LineType: 'Status', EXTORG: orgDetails.Status },
        ];

        downloadCsv({
            fileName: 'ExtOrgCsv',
            data: csvData,
        });
    };



    console.log('orgDetails===', orgDetails)

    return (
        <Box sx={{ flexGrow: 1, padding: '0' }}>
            <Box sx={{ marginBottom: '30px', display: 'flex', justifyContent: 'flex-end', padding: '10px 15px' }}>
                <Button
                    variant="contained"
                    onClick={handleExportCSV}
                    sx={{ padding: '6px 12px' }}
                    className={styles.exportButtons}
                >
                    <img
                        src={downloadIcon}
                        alt="Download"
                        style={{ height: '20px', width: '20px' }}
                    />
                </Button>
            </Box>

            <Box sx={{ padding: '0 15px' }}>
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
                    Org. Details
                </Typography>
                <Grid container spacing={2}>
                    {Object?.entries(displayFields)?.map(([key]) => (
                        <Grid item xs={12} sm={6} md={4} key={key}>
                            <Item
                                style={{
                                    boxShadow: 'none',
                                    borderBottom: '1px solid rgb(207, 206, 206)'
                                }}
                                className={styles.answerInputs}
                            >
                                <Typography sx={{ color: '#182958', fontSize: '12px' }}>
                                    {key}
                                </Typography>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                                    {orgDetails && orgDetails[key] || '--'}
                                </Typography>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default OrgData;
