import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Divider, FormControl, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { StudentManagerContext } from '../context/studentContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pull from './Images/plus.svg';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styles from "../styles/PullStudentPopup.module.css";
import dayjs, { Dayjs } from 'dayjs';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export default function PullStudentPopup() {
  const [open, setOpen] = React.useState(false)
  const [fromDate, setFromDate] = React.useState<Dayjs | null>(null);
  const [toDate, setToDate] = React.useState<Dayjs | null>(null);
  const [ChangedDateStart, setChangedDateStart] = React.useState<Dayjs | null>(null);
  const [ChangedDateEnd, setChangedDateEnd] = React.useState<Dayjs | null>(null);
  const [LastStatusChangeDateStart, setLastStatusChangeDateStart] = React.useState<Dayjs | null>(null);
  const [LastStatusChangeDateEnd, setLastStatusChangeDateEnd] = React.useState<Dayjs | null>(null);
  const [DocumentAddedDateStart, setDocumentAddedDateStart] = React.useState<Dayjs | null>(null);
  const [DocumentAddedDateEnd, setDocumentAddedDateEnd] = React.useState<Dayjs | null>(null);
  const [status, setStatus] = React.useState('');

  const [applicationId] = React.useState<'' | null>('');


  // const handleResetDate = () => {
  //   setFromDate(null);
  //   setToDate(null);
  // };

  // const handleResetApplicationId = () => {
  //   setApplicationId('');
  // };

  // const handleApplicationId = (e: any) => {
  //   setApplicationId(e.target.value)
  // }

  console.log(applicationId)
  const { importStudents, LoadStudentData, LoadStudentCount, setLoading }: any = React.useContext(StudentManagerContext);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const clearDates = () => {
    setFromDate(null);
    setToDate(null);
    setChangedDateStart(null);
    setChangedDateEnd(null);
    setLastStatusChangeDateStart(null);
    setLastStatusChangeDateEnd(null);
    setDocumentAddedDateStart(null);
    setDocumentAddedDateEnd(null);
    setStatus('');
  }

  const handleClose = () => {
    setOpen(false);
    clearDates();
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let hasError = false;

    if ((fromDate && !toDate) || (!fromDate && toDate)) {
      toast.error("Show Submit: both From and To dates must be filled.");
      hasError = true;
    }
    if ((ChangedDateStart && !ChangedDateEnd) || (!ChangedDateStart && ChangedDateEnd)) {
      toast.error("Changed Date: both From and To dates must be filled.");
      hasError = true;
    }
    if ((LastStatusChangeDateStart && !LastStatusChangeDateEnd) || (!LastStatusChangeDateStart && LastStatusChangeDateEnd)) {
      toast.error("Last Status Change Date: both From and To dates must be filled.");
      hasError = true;
    }
    if ((DocumentAddedDateStart && !DocumentAddedDateEnd) || (!DocumentAddedDateStart && DocumentAddedDateEnd)) {
      toast.error("Document Added Date: both From and To dates must be filled.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      setOpen(false);
      setLoading(true);

      const showSubmitStart1 = fromDate?.format("MM-DD-YYYY");
      const showSubmitEnd1 = toDate?.format("MM-DD-YYYY");
      const ChangedDateStart1 = ChangedDateStart?.format("MM-DD-YYYY");
      const ChangedDateEnd1 = ChangedDateEnd?.format("MM-DD-YYYY");
      const LastStatusChangeDateStart1 = LastStatusChangeDateStart?.format("MM-DD-YYYY");
      const LastStatusChangeDateEnd1 = LastStatusChangeDateEnd?.format("MM-DD-YYYY");
      const DocumentAddedDateStart1 = DocumentAddedDateStart?.format("MM-DD-YYYY");
      const DocumentAddedDateEnd1 = DocumentAddedDateEnd?.format("MM-DD-YYYY");
      const status1 = status


      const data = {
        FromDate: showSubmitStart1,
        ToDate: showSubmitEnd1,
        ChangedFromDate: ChangedDateStart1,
        ChangedToDate: ChangedDateEnd1,
        LastStatusFromDate: LastStatusChangeDateStart1,
        LastStatusToDate: LastStatusChangeDateEnd1,
        DocumentAddedFromDate: DocumentAddedDateStart1,
        DocumentAddedToDate: DocumentAddedDateEnd1,
        Status: status1
      };

      await importStudents(data);

      const params = {
        SortExpression: "StudentFamilyName",
        PageSize: 10,
        CurrentPage: 1,
        SortOrder: "ASC",
      };

      await LoadStudentData(params);
      await LoadStudentCount();


    } catch (error) {
      console.log("Error in importing students", error);
      toast.error("Error in importing students");
    } finally {
      setLoading(false);
      clearDates();

    }
  };

  const statusOptions = [
    { value: "NEW", label: "New Application" },
    { value: "SAVED", label: "Incomplete Application" },
    { value: "SUBMITTED", label: "Submitted" },
    { value: "SCHOL_02", label: "Submitted - Potential Duplicate" },
    { value: "ASSESSING", label: "Assessing" },
    { value: "RECEIVED", label: "Awaiting 3rd Party Assessment" },
    { value: "RESUBMITTED", label: "More Information Requested" },
    { value: "ENROLLED", label: "Enrolled" },
    { value: "SCHOL_08", label: "GTE Assessing" },
    { value: "OFFERED_COND", label: "Conditional Offer" },
    { value: "OFFERED", label: "Unconditional Offer" },
    { value: "DECLINED", label: "Offer Declined" },
    { value: "CAO_FINALISING", label: "Offer Lapsed" },
    { value: "DEFERRAL_REQUESTED", label: "Deferral Requested" },
    { value: "ACCEPTED_REQPAYMENT", label: "Acceptance Received - Pending Payment" },
    { value: "ACCEPTED_RECPAYMENT", label: "Acceptance Received - Payment Received" },
    { value: "ACCEPTED_TP", label: "Acceptance Received - No Payment Required" },
    { value: "ASSESSINTERVIEW", label: "Acceptance Processing" },
    { value: "ACCEPTED", label: "Accepted" },
    { value: "ACCEPTED_INFORMATION", label: "Enrolled" },
    { value: "REJECTED", label: "Unsuccessful" },
    { value: "WITHDRAWN", label: "Withdrawn" },
    { value: "SCHOL_07", label: "Assessing on Hold" },
    { value: "SCHOL_04", label: "Application Lapsed" },
    { value: "VISA_PROCESSING", label: "Accepted - Visa Granted" },
    { value: "DEFERRAL_REJECTED", label: "Deferral Declined" },
    { value: "Visa_Refusal", label: "Accepted - Visa Refused" },
    { value: "WITHDRAWN_ACCEPTANCE", label: "Withdrawn After Acceptance" },
    { value: "EOI_7", label: "LMU Reconsider" },
    { value: "SCHOL_11", label: "LMU Submitted to Evision" },
    { value: "SCHOL_09", label: "LMU Awaiting Reply" },
    { value: "EOI_6", label: "LMU Conditional offer (on Evision for review)" },
    { value: "SCHOL_10", label: "LMU Deposit Payment requested" },
    { value: "SCHOL_05", label: "LMU Interview invitation sent" },
    { value: "SCHOL_03", label: "LMU Interview Successful" },
    { value: "EOI_8", label: "LMU Draft CAS issued" },
    { value: "EOI_2", label: "LMU Final CAS issued" },
    { value: "SCHOL_06", label: "LMU Interview failed (reject)" },
  ];


  return (
    <React.Fragment>
      <Button onClick={() => { handleClickOpen(); }}>
        <img src={pull} className={styles.headericons} /> Pull Student from SL
      </Button>

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        className={styles.popup_wrapper}
        slotProps={{
          paper: {
            sx: {
              boxShadow: 'none',
              backgroundColor: 'transparent',
              border: 'none',
            },
          },
        }}
      >
        <Box sx={{ width: '470px' }} component="form" onSubmit={handleSubmit} className={styles.popup_box}>
          <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={2}>
            <DialogTitle
              id="alert-dialog-title"
              className={styles.popup_heading}
              sx={{ m: 0, paddingLeft: 2, fontSize: '20px', fontWeight: 600 }}
            >
              {'Pull Students'}
            </DialogTitle>
            <CancelIcon onClick={handleClose} sx={{ cursor: 'pointer', color: '#182958' }} />
          </Box>

          <Divider />

          <DialogContent>

            <Typography variant="h6" sx={{ fontSize: "15px", fontWeight: "600" }}>
              Show Submit
            </Typography>
            <Box
              component="form"
              sx={{
                '& > :not(style)': {

                  width: '-webkit-fill-available',
                  paddingBottom: '35px'
                },
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <Box className={styles.Date_Container}>
                      <DatePicker
                        sx={{
                          "& .MuiPickersFilledInput-root": {
                            marginTop: 0,
                          },
                          minWidth: "100px",
                          maxWidth: "50%",
                        }}
                        label="Start"
                        value={fromDate ? dayjs(fromDate) : null}
                        format="MM/DD/YYYY"
                        onChange={(newValue) => {
                          setFromDate(newValue);
                          // setApplicationId(null);
                          // handleResetApplicationId();
                        }}
                        slotProps={{
                          textField: {
                            variant: "standard",
                            fullWidth: true,
                            placeholder: "Start",
                          },
                        }}
                      />

                      <DatePicker
                        sx={{
                          "& .MuiPickersFilledInput-root": {
                            marginTop: 0,
                          },
                          minWidth: "100px",
                          maxWidth: "50%",
                        }}
                        label="End"
                        value={toDate ? dayjs(toDate) : null}
                        format="MM/DD/YYYY"
                        onChange={(newValue) => {
                          setToDate(newValue);
                          // handleResetApplicationId();
                        }}
                        slotProps={{
                          textField: {
                            variant: "standard",
                            fullWidth: true,
                            placeholder: "End",
                          },
                        }}
                      />

                    </Box>
                  </DemoContainer>
                </LocalizationProvider>

              </FormControl>

            </Box>

            <Typography variant="h6" sx={{ fontSize: "15px", fontWeight: "600" }}>
              Changed Date
            </Typography>
            <Box
              component="form"
              sx={{
                '& > :not(style)': {

                  width: '-webkit-fill-available',
                  paddingBottom: '35px'
                },
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <Box className={styles.Date_Container}>
                      <DatePicker
                        sx={{
                          "& .MuiPickersFilledInput-root": {
                            marginTop: 0,
                          },
                          minWidth: "100px",
                          maxWidth: "50%",
                        }}
                        label="Start"
                        value={ChangedDateStart ? dayjs(ChangedDateStart) : null}
                        format="MM/DD/YYYY"
                        onChange={(newValue) => {
                          setChangedDateStart(newValue);
                        }}
                        slotProps={{
                          textField: {
                            variant: "standard",
                            fullWidth: true,
                            placeholder: "Start",
                          },
                        }}
                      />

                      <DatePicker
                        sx={{
                          "& .MuiPickersFilledInput-root": {
                            marginTop: 0,
                          },
                          minWidth: "100px",
                          maxWidth: "50%",
                        }}
                        label="End"
                        value={ChangedDateEnd ? dayjs(ChangedDateEnd) : null}
                        format="MM/DD/YYYY"
                        onChange={(newValue) => {
                          setChangedDateEnd(newValue);
                        }}
                        slotProps={{
                          textField: {
                            variant: "standard",
                            fullWidth: true,
                            placeholder: "End",
                          },
                        }}
                      />

                    </Box>
                  </DemoContainer>
                </LocalizationProvider>

              </FormControl>

            </Box>


            <Typography variant="h6" sx={{ fontSize: "15px", fontWeight: "600" }}>
              Last Status Change Date
            </Typography>
            <Box
              component="form"
              sx={{
                '& > :not(style)': {

                  width: '-webkit-fill-available',
                  paddingBottom: '35px'
                },
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <Box className={styles.Date_Container}>
                      <DatePicker
                        sx={{
                          "& .MuiPickersFilledInput-root": {
                            marginTop: 0,
                          },
                          minWidth: "100px",
                          maxWidth: "50%",
                        }}
                        label="Start"
                        value={LastStatusChangeDateStart ? dayjs(LastStatusChangeDateStart) : null}
                        format="MM/DD/YYYY"
                        onChange={(newValue) => {
                          setLastStatusChangeDateStart(newValue);
                        }}
                        slotProps={{
                          textField: {
                            variant: "standard",
                            fullWidth: true,
                            placeholder: "Start",
                          },
                        }}
                      />

                      <DatePicker
                        sx={{
                          "& .MuiPickersFilledInput-root": {
                            marginTop: 0,
                          },
                          minWidth: "100px",
                          maxWidth: "50%",
                        }}
                        label="End"
                        value={LastStatusChangeDateEnd ? dayjs(LastStatusChangeDateEnd) : null}
                        format="MM/DD/YYYY"
                        onChange={(newValue) => {
                          setLastStatusChangeDateEnd(newValue);
                        }}
                        slotProps={{
                          textField: {
                            variant: "standard",
                            fullWidth: true,
                            placeholder: "End",
                          },
                        }}
                      />

                    </Box>
                  </DemoContainer>
                </LocalizationProvider>

              </FormControl>

            </Box>

            <Typography variant="h6" sx={{ fontSize: "15px", fontWeight: "600" }}>
              Document Added Date
            </Typography>
            <Box
              component="form"
              sx={{
                '& > :not(style)': {

                  width: '-webkit-fill-available',
                  paddingBottom: '15px'
                },
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <Box className={styles.Date_Container}>
                      {/* <DatePicker sx={{ minWidth: '100px', maxWidth: '50%' }} label="Start"
                        value={DocumentAddedDateStart ? dayjs(DocumentAddedDateStart) : null} 
                        format="MM/DD/YYYY"
                        onChange={(newValue) => {
                          setDocumentAddedDateStart(newValue)
                        }}
                      /> */}
                      <DatePicker
                        sx={{
                          "& .MuiPickersFilledInput-root": {
                            marginTop: 0,
                          },
                        }}
                        label="Start"
                        value={DocumentAddedDateStart ? dayjs(DocumentAddedDateStart) : null}
                        format="MM/DD/YYYY"
                        onChange={(newValue) => {
                          setDocumentAddedDateStart(newValue);
                        }}
                        slotProps={{
                          textField: {
                            variant: "standard", // underline style
                            fullWidth: true,
                            placeholder: "Start", // optional
                          },
                        }}
                      />

                      <DatePicker
                        sx={{
                          "& .MuiPickersFilledInput-root": {
                            marginTop: 0,
                          },
                          minWidth: "100px",
                          maxWidth: "50%",
                        }}
                        label="End"
                        value={DocumentAddedDateEnd ? dayjs(DocumentAddedDateEnd) : null}
                        format="MM/DD/YYYY"
                        onChange={(newValue) => {
                          setDocumentAddedDateEnd(newValue);
                        }}
                        slotProps={{
                          textField: {
                            variant: "standard", // underline style
                            fullWidth: true,
                            placeholder: "End", // optional
                          },
                        }}
                      />

                    </Box>
                  </DemoContainer>
                </LocalizationProvider>

              </FormControl>

            </Box>



            <Typography variant="h6" sx={{ fontSize: "15px", fontWeight: "600" }}>
              Status
            </Typography>
            <Box sx={{ width: '100%', paddingBottom: '15px' }}>
              <FormControl variant="standard" fullWidth>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {statusOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>




          </DialogContent>


          <Divider />
          <DialogActions sx={{ justifyContent: "center", padding: "16px 24px" }}>
            <Box className={styles.submit_wrapper}>
              <Button
                variant="outlined"
                type="button"
                onClick={clearDates}
                className={styles.clear_button}
              >
                Clear
              </Button>
            </Box>

            <Box className={styles.submit_wrapper}>
              <Button
                variant="contained"
                type="submit"
                className={styles.submit_button}
              >
                Pull students
              </Button>
            </Box>
          </DialogActions>

        </Box>


        <ToastContainer />
      </Dialog>
    </React.Fragment>
  );
}
