import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StudentManagerContext } from '../context/studentContext';
import { Box, Button, Pagination, Stack, Tooltip, Typography, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { toast, ToastContainer } from 'react-toastify';
import SchoolIcon from '@mui/icons-material/School';
import Checkbox from '@mui/material/Checkbox';
import processArrow2 from './Images/process-arrow-2.svg';
import styles from "../styles/Students.module.css";
import exportIcon from './Images/csv-export.svg';
import push from './Images/up-arrow.svg';
import alert from './Images/alert-icon.svg'
import PullStudentPopup from './PullStudentPopup';
import formatDateTime from '../utility/formatDateTime';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// interface Column {
//   id: 'name' | 'code' | 'population' | 'size' | 'density';
//   label: string;
//   minWidth?: number;
//   align?: 'right';
//   format?: (value: number) => string;
// }

// interface Data {
//   name: string;
//   code: string;
//   population: number;
//   size: number;
//   density: number;
// }

// function createData(
//   name: string,
//   code: string,
//   population: number,
//   size: number,
// ): Data {
//   const density = population / size;
//   return { name, code, population, size, density };
// }



function StudentDataTable() {
  const [page, setPage] = React.useState(1);
  const [sortOrder, setSortOrder] = React.useState('ASC');
  const [selectedStudents, setSelectedStudents] = React.useState<readonly string[]>([]);
  const navigate = useNavigate()

  const {
    studentTable,
    LoadStudentData,
    pageCount,
    totalStudentCount,
    LoadStudentCount,
    sortExpression,
    setSortExpression,
    createStudent,
    exportCSV,
    formFields }: any = React.useContext(StudentManagerContext);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const sortingHandler = (expression: any) => {
    if (sortOrder === 'ASC') {
      setSortExpression(expression);
      setSortOrder('DESC');
    } else {
      setSortExpression(expression);
      setSortOrder('ASC');
    }
  }

  const data = {
    Id: null,
    SortExpression: sortExpression,
    SortOrder: sortOrder,
    PageSize: 10,
    CurrentPage: page,
    StudentFamilyName: null,
    StudentGivenName: null,
    EmailId: null,
    StartDate: null,
    EndDate: null,
    T1StudentId: null,
    SlStudentId: null
  }

  React.useEffect(() => {

    LoadStudentData(data)
    LoadStudentCount()
  }, [page, sortExpression, sortOrder])

  const handleCreateStudent = async () => {
    if (selectedStudents.length) {
      const studentsToPush = studentTable.rows.filter((row: any) => selectedStudents.includes(row.Id));
      console.log("studentsToPush", studentsToPush)
      await createStudent(studentsToPush);
      toast("Student synced successfully!");
      setSelectedStudents([]);
    } else {
      toast("No student is selected", { theme: 'light', type: 'error' });
    }
  }

  const StudentCsvExportHandle = async () => {
    console.log("selectedStudents", selectedStudents)
    if (selectedStudents.length) {
      try {

        const csvData = await exportCSV(selectedStudents);
        console.log(csvData);
      } catch (err) {
        console.log(err);
      }
      setSelectedStudents([]); // Clear selection after action
    } else {
      toast("No student is selected", { theme: 'light', type: 'error' });
    }
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = studentTable.rows.map((n: any) => n.Id);
      setSelectedStudents(newSelecteds);
      return;
    }
    setSelectedStudents([]);
  };

  const handleStudentClick = (_event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selectedStudents.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedStudents, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedStudents.slice(1));
    } else if (selectedIndex === selectedStudents.length - 1) {
      newSelected = newSelected.concat(selectedStudents.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedStudents.slice(0, selectedIndex),
        selectedStudents.slice(selectedIndex + 1),
      );
    }
    setSelectedStudents(newSelected);
  };

  const isSelected = (id: string) => selectedStudents.indexOf(id) !== -1;

  const studentFilterHandler = (event: any) => {
    event.preventDefault();
    const form = document.getElementById("studentForm") as HTMLFormElement;
    try {
      const formData = new FormData(form);
      const filter: any = {};
      for (let [key, value] of formData.entries()) {
        filter[key] = value;
      }
      const param = {
        Id: null,
        SortExpression: sortExpression,
        SortOrder: sortOrder,
        PageSize: 10,
        CurrentPage: page,
        StudentFamilyName: filter.LastName ? filter.LastName : null,
        StudentGivenName: filter.FirstName ? filter.FirstName : null,
        StartDate: filter.StartDate ? filter.StartDate : null,
        EndDate: filter.EndDate ? filter.EndDate : null,
        T1StudentId: filter.T1StudentId ? filter.T1StudentId : null,
        SlStudentId: filter.SlStudentId ? filter.SlStudentId : null,
        EmailId: filter.EmailID ? filter.EmailID : null
      }
      LoadStudentData(param);
    }
    catch (error) {
      console.log("Errorrrr");
    }
  };

  const resetFilter = () => {
    (document.getElementById("studentForm") as HTMLFormElement)?.reset();
    studentFilterHandler({ preventDefault: () => { } });
  }

  return (
    <Box component="form" id="studentForm">
      <Box className={styles.page_Header} >
        <Box>
          <Typography sx={{ margin: '10px 0', fontSize: '18px', fontWeight: '600' }}>Students</Typography>
        </Box>
        <Box className={styles.header_buttons} >
          <Button type="button" onClick={async () => {
            try {
              await StudentCsvExportHandle()
            } catch (error) {
              console.log(error);
            }
          }}><img src={exportIcon} /> &nbsp;Export CSV </Button>
          <PullStudentPopup />
          <Button onClick={handleCreateStudent} type="button"><img src={push} className={styles.headericons} />Push to T1</Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "25px",
          "& > :not(style)": { width: { xs: "100%", sm: "22ch" } },
          alignItems: "center",
          paddingTop: "15px",
          paddingBottom: "15px"
        }}
      >
        {formFields?.filters?.map((item: any, index: number) => (
          <React.Fragment key={index}>
            {item.type === "date" ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    "& .MuiPickersFilledInput-root": {
                      marginTop: 0,
                    },
                  }}
                  name={item?.fieldName}
                  format="MM/DD/YYYY"
                  label={
                    item?.fieldName?.toLowerCase().includes("start")
                      ? "Start Date"
                      : item?.fieldName?.toLowerCase().includes("end")
                        ? "End Date"
                        : item?.label
                  }
                  slotProps={{
                    textField: {
                      variant: "standard",
                      fullWidth: true,
                      placeholder: item?.label,
                    },
                  }}
                />

              </LocalizationProvider>
            ) : (
              <Input
                className={styles.filterInput}
                placeholder={item?.label}
                id="outlined-size-small"
                type={item?.type}
                name={item?.fieldName}
              />
            )}
          </React.Fragment>
        ))}

        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button
            variant="contained"
            onClick={studentFilterHandler}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Search
          </Button>
          <Button
            variant="contained"
            className={styles.reset_button}
            onClick={resetFilter}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Reset
          </Button>
        </Box>
      </Box>

      <Box className={styles.legend_container}>
        <div className={`${styles.legend} ${styles.duplicate}`}>Duplicate Student</div>
        <span>|</span>
        <div className={styles.process_list}>
          <div className={`${styles.legend} ${styles.pull_sl}`}>Pulled from SL</div>
          <span><img src={processArrow2} /></span>
          <div className={`${styles.legend} ${styles.verified}`}>Student Data Verified</div>
          <span><img src={processArrow2} /></span>
          <div className={`${styles.legend} ${styles.push_t1}`}>Pushed to T1</div>
          <span><img src={processArrow2} /></span>
          <div className={`${styles.legend} ${styles.csv_downloaded}`}>CSV Downloaded</div>
        </div>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  className={`${styles.table_cells} ${styles.table_header} ${styles.checkbox_container}`}
                >
                  <Checkbox
                    onChange={handleSelectAllClick}
                    indeterminate={selectedStudents.length > 0 && selectedStudents.length < studentTable?.rows?.length}
                    checked={studentTable?.rows?.length > 0 && selectedStudents.length === studentTable?.rows?.length}
                    sx={{ padding: 0 }}
                  />
                </TableCell>
                {studentTable?.columns?.map((column: any) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className={`${styles.table_cells} ${styles.table_header}`}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontWeight: '700',
                        color: '#182958',
                        '&:hover .swapIcon': { visibility: 'visible' },
                      }}
                    >
                      {column.label}
                      <SwapVertIcon
                        className="swapIcon"
                        onClick={() => sortingHandler(column.id)}
                        sx={{ visibility: 'hidden', cursor: 'pointer' }}
                      />
                    </Box>
                  </TableCell>
                ))}
                <TableCell className={`${styles.table_cells} ${styles.table_header}`} align="center">
                  Detail Icon
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {studentTable?.rows?.length > 0 ? (
                studentTable.rows.map((row: any, _index: number) => {
                  const isItemSelected = isSelected(row.Id);
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleStudentClick(event, row.Id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell className={`${styles.table_cells} ${styles.checkbox_container}`}>
                        {/* {row.T1StudentId ? (
                          <CheckCircleOutlineIcon />
                        ) : ( */}
                        <Checkbox
                          checked={isItemSelected}
                          sx={{ padding: 0 }}
                          name={row.StudentFamilyName + "CSV"}
                        />
                        {/* )} */}
                      </TableCell>
                      <TableCell className={`${styles.table_cells} ${styles.table_cells_alert}`} align="center">
                        {row.IsDuplicate &&
                          <img src={alert} />
                        }
                      </TableCell>
                      <TableCell className={`${styles.table_cells} ${styles.student_process}`}>
                        <div className={styles.student_process_list}>
                          {row.Id && <div className={`${styles.legend} ${styles.pull_sl}`}></div>}
                          {row.IsVarified && <div className={`${styles.legend} ${styles.verified}`}></div>}
                          {row.T1StudentId && <div className={`${styles.legend} ${styles.push_t1}`}></div>}
                          {row.T1StudentPushedDate && <div className={`${styles.legend} ${styles.csv_downloaded}`}></div>}
                        </div>
                      </TableCell>
                      <TableCell className={styles.table_cells}>
                        {`${row.StudentTitle ? row.StudentTitle + ' ' : ''}${row.StudentGivenName} ${row.StudentFamilyName}`}
                      </TableCell>
                      <TableCell className={styles.table_cells}>{row.StudentEmailAddress}</TableCell>
                      <TableCell className={styles.table_cells}>
                        {new Date(row.StudentBirthDate).toLocaleDateString('en-US')}
                      </TableCell>
                      <TableCell className={styles.table_cells}>{row.StudentGender}</TableCell>
                      <TableCell className={`${styles.table_cells} ${styles.dates_cell}`} sx={{ width: '350px' }}>
                        <p><b>Application Submission Date</b> : {row.ApplicationSubmissionDate ? formatDateTime(row.ApplicationSubmissionDate, 'DD/MM/YYYY') : '--'}
                          <br />
                        </p>
                        <hr />
                        <p><b>Application Last Modified Date</b> : {row.ApplicationLastModifiedDate ? formatDateTime(row.ApplicationLastModifiedDate, 'DD/MM/YYYY') : '--'}<br /></p>
                        <hr />
                        <p><b>Last Pull From SL</b> : {row.UpdatedDate ? formatDateTime(row.UpdatedDate, 'DD/MM/YYYY') : '--'}<br /></p>
                        <hr />
                        <p><b>Student Pushed on T1 Date</b> : {row.CsvExportedDate ? formatDateTime(row.PushedOnT1Date, 'DD/MM/YYYY') : '--'}<br /></p>
                        <hr />
                        <p><b>Last CSV Downloaded Date</b> : {row.CsvExportedDate ? formatDateTime(row.CsvExportedDate, 'DD/MM/YYYY') : '--'}</p>
                      </TableCell>
                      <TableCell className={styles.table_cells}>{row.StudentCitizenship}</TableCell>
                      <TableCell className={`${styles.table_cells} actions-icon`} style={{ textAlign: 'center' }}>
                        <Tooltip title="Student Details">
                          <SchoolIcon
                            sx={{ color: row.IsVarified ? 'green' : '' }}
                            onClick={() => navigate(`/studentDetails?`, { state: { key: row.Id } })}
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={studentTable?.columns?.length + 1} align="center"
                    sx={{ py: 3, fontStyle: 'italic', color: '#999' }}>
                    No records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ p: 1 }}>{page * 10 - 9} - {(page * 10) == (Math.ceil(totalStudentCount / 10) * 10) ? (totalStudentCount) : (page * 10)} of {totalStudentCount}</Typography>
          <Stack spacing={2}>
            <Pagination
              showFirstButton showLastButton
              sx={{ ml: 'auto !important' }}
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              shape="rounded" />
          </Stack>
        </Box>
        <ToastContainer />
      </Paper>
    </Box>
  );
}

export default React.memo(StudentDataTable);