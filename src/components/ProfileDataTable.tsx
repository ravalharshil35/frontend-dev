import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Pagination, Tooltip, Stack, Typography } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import styles from "../styles/Profiles.module.css";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import checkedimage from "../assets/checked.png";
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { ProfileManagerContext } from '../context/profileContext';


// interface Column {
//   id: 'name' | 'code' | 'population' | 'size' | 'density';
//   label: string;
//   minWidth?: number;
//   align?: 'right';
//   format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: 'FirstName', label: 'First Name', minWidth: 170 },
//   { id: 'LastName', label: 'Last Name', minWidth: 100 },
//   {
//     id: 'EmailID',
//     label: 'Email',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },

// ];

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


interface DeleteUser {
  ProfileId: number | string;
  IsDeleted: number;
}

function ProfileDataTable() {
  const [page, setPage] = React.useState(1);
  //const [ setRowsPerPage] = React.useState(10);
  const [tableData] = React.useState<any>([]);
  const [sortOrder, setSortOrder] = React.useState('ASC');
  const [deleteUser, setDeleteUser] = React.useState<DeleteUser | null>(null);
  const navigate = useNavigate()
  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  sessionStorage.removeItem("currentEditProfile");
  sessionStorage.removeItem("currentEditAccessgroup");
  sessionStorage.removeItem("isSystem",)

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleClickOpen = () => {
    setAlertOpen(true);
  };

  const handleClose = () => {
    setAlertOpen(false);
  };


  const { profileTable, LoadProfileDataTable, deleteProfile, pageCount, totalProfileCount, LoadProfileCount, sortExpression, setSortExpression }: any = React.useContext(ProfileManagerContext);



  console.log(tableData);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    //loadPaginateUser()
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

  const data = React.useMemo(() => ({
    SortExpression: sortExpression,
    SortOrder: sortOrder,
    PageSize: 10,
    CurrentPage: page
  }), [sortExpression, sortOrder, page]);

  React.useEffect(() => {
    LoadProfileDataTable(data)
    LoadProfileCount()
  }, [data])

  console.log("profileTable", profileTable);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Dialog
        open={alertOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 2,
          }}
        >
          <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>
            Delete Profile
          </Typography>
          <CancelIcon onClick={handleClose} sx={{ cursor: 'pointer', color: '#182958' }} />
        </DialogTitle>

        <DialogContent sx={{ padding: "15px 45px" }}>
          <DialogContentText sx={{ textAlign: 'center' }} id="alert-dialog-description">
            Do you really want to delete this record?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', width: "100%", padding: "15px" }}>
          <Button
            className={styles.popup_buttons}
            onClick={() => {
              deleteProfile(deleteUser);
              handleClose();
            }}
            style={{ width: '-webkit-fill-available' }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {profileTable?.columns?.map((column: any) => (
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
                      position: 'relative',
                      '&:hover .swapIcon': {
                        visibility: 'visible',
                      },
                    }}
                  >
                    {column.label}
                    <SwapVertIcon
                      className="swapIcon"
                      onClick={() => sortingHandler(column.id)}
                      sx={{
                        visibility: 'hidden', // hide by default
                        cursor: 'pointer',
                      }}
                    />
                  </Box>
                </TableCell>
              ))}
              <TableCell className={`${styles.table_cells} ${styles.table_header}`}
                style={{ minWidth: 50, maxWidth: 100, textAlign: 'center', fontWeight: '700', color: '#182958' }}
              >Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(profileTable?.rows) && profileTable.rows.length > 0 ? (
              profileTable.rows.map((row: any, index: number) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell className={styles.table_cells}>
                    {row.Name}
                  </TableCell>
                  <TableCell className={styles.table_cells}>
                    {row.IsSystem && (
                      <img
                        src={checkedimage}
                        alt="Checked"
                        style={{ width: "20px", height: "17px" }}
                      />
                    )}
                  </TableCell>
                  <TableCell className={styles.table_cells}>
                    {new Date(row.CreatedDate).toLocaleDateString('en-US')}
                  </TableCell>
                  <TableCell className={styles.table_cells}>
                    {new Date(row.UpdatedDate).toLocaleDateString('en-US')}
                  </TableCell>
                  <TableCell
                    className='table_cells actions-icon'
                    style={{ minWidth: 50, maxWidth: 100, textAlign: 'center', padding: '10px' }}
                  >
                    {row.IsSystem ? (
                      <Tooltip title="View Profile">
                        <RemoveRedEyeIcon
                          onClick={() => {
                            navigate(`/editprofile?`, { state: { key: row.Name } });
                            sessionStorage.setItem("currentEditAccessgroup", row.AccessGroup1);
                            sessionStorage.setItem("isSystem", row.IsSystem);
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <><Tooltip title="Edit Profile">
                        <EditIcon
                          onClick={() => {
                            sessionStorage.setItem("currentEditProfile", row.Id);
                            sessionStorage.setItem("currentEditAccessgroup", row.AccessGroup1);
                            navigate(`/editprofile?`, { state: { key: row.Name } });
                          }}
                        />
                      </Tooltip>
                        <Tooltip title="Delete Profile">
                          <DeleteIcon

                            onClick={() => {
                              handleClickOpen();
                              setDeleteUser({ ProfileId: row.Id, IsDeleted: 1 });
                            }}
                          />
                        </Tooltip>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={profileTable?.columns?.length + 1 || 5} align="center"
                  sx={{ py: 3, fontStyle: 'italic', color: '#999' }}>
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </TableContainer>
      {/* {
        totalProfileCount > 10 ? */}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
        <Typography sx={{ p: 1 }}>{page * 10 - 9} - {(page * 10) == (Math.ceil(totalProfileCount / 10) * 10) ? (totalProfileCount) : (page * 10)} of {totalProfileCount}</Typography>
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
      {/* : <></>                                                                                                                                                                                             
      } */}
      {/* <Stack spacing={2}>
        <Pagination sx={{ ml: 'auto !important' }} count={pageCount} page={page} onChange={handlePageChange} shape="rounded" />
      </Stack>
      <ToastContainer /> */}
    </Paper>
  );
}
export default React.memo(ProfileDataTable)