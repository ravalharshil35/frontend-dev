import React, { useState, useEffect, useContext, memo } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Pagination, Tooltip, Stack, Typography } from '@mui/material';
import { UserManagerContext } from '../context/userContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import KeyIcon from '@mui/icons-material/Key';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Users.module.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import roles from '../utility/roles';
import CancelIcon from '@mui/icons-material/Cancel';

interface DeleteUserData {
  UserId: number | string;
  IsDeleted: number;
}

function StickyHeadTable() {

  //const [rowsPerPage, setRowsPerPage] = useState(10);
  const [_tableData, setTableData] = useState({})
  const [deleteUserData, setDeleteUserData] = React.useState<DeleteUserData | null>(null);
  const navigate = useNavigate()
  const { pageCount,
    // handlePaginateUser,
    // loadPaginateUser,
    // emailID,
    // lastName,
    // firstName,
    userTable,
    loadUserDataTable,
    page,
    setPage,
    deleteUser,
    //open,
    setOpen, setEditFirstName,
    setEditLastName, setEditEmail, setIsEditing, totalUserCount, LoadUserCount,
    sortExpression, setSortExpression,
    sortOrder, setSortOrder,
    // setEditProfile,
    // userProfileId, setUserProfileId,
    setUserId
  }: any = useContext(UserManagerContext);



  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    //loadPaginateUser()
  };
  const [alertOpen, setAlertOpen] = useState(false);

  const handleClickOpen = () => {
    setAlertOpen(true);
  };

  const handleClose = () => {
    setAlertOpen(false);
  };

  // const data = {
  //   SortExpression: sortExpression,
  //   SortOrder: sortOrder,
  //   PageSize: 10,
  //   CurrentPage: 1
  // }

  const sortingHandler = (expression: any) => {
    if (sortOrder === 'ASC') {
      setSortExpression(expression);
      setSortOrder('DESC');
    } else {
      setSortExpression(expression);
      setSortOrder('ASC');
    }
  }

  useEffect(() => {
    loadUserDataTable()
    LoadUserCount()
    setTableData(userTable),
      setIsEditing(false)
  }, [page, sortExpression, sortOrder])

  const logedInUserProfileStringified: any = localStorage.getItem('loginUserProfile')
  const logedInUserProfile = JSON.parse(logedInUserProfileStringified)
  console.log("logedInUserProfile", logedInUserProfile);

  const allRoles = roles()
  console.log("userTable+++", userTable);
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} >
      <Dialog
        open={alertOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={styles.delete_dialog}
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
            Delete User
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
              deleteUser(deleteUserData);
              handleClose();
            }}
            style={{ width: '-webkit-fill-available' }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
              {userTable?.columns?.map((column: any) => (
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
              <TableCell
                style={{ minWidth: 50, maxWidth: 100, textAlign: 'center', fontWeight: '700' }}
                className={`${styles.table_cells} ${styles.table_header}`}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userTable.rows?.map((row: any, index: any) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {userTable?.columns?.map((column: any, index: any) => {
                  const value = row[column?.id];
                  return (
                    <TableCell key={index} align={column?.align} className={styles.table_cells}>
                      {value}
                    </TableCell>
                  );
                })}

                <TableCell className={styles.table_cells} style={{
                  textAlign: 'center', gap: '10px',
                  display: 'flex', justifyContent: 'center'
                }}>
                  <Tooltip title="Reset Password">
                    <KeyIcon onClick={() => navigate(`/resetpassword`, {
                      state: {
                        key: {
                          Id: row.Id,
                          FirstName: row.FirstName,
                          LastName: row.LirstName,
                          EmailID: row.EmailID,
                          Password: row.Password
                        }
                      }
                    })} />
                  </Tooltip>


                  {/* {(logedInUserProfile.AccessGroup1 & allRoles.user.EditUser) ?
                    <Tooltip title="Edit User">
                      <EditIcon onClick={() => {
                        setEditFirstName(row.FirstName);
                        setEditLastName(row.LastName);
                        setEditEmail(row.EmailID);
                        setIsEditing(true);
                        setUserProfileId(row.ProfileId);
                        setEditProfile(row.ProfileId);
                        setOpen(true);
                        setUserId(row.Id);
                      }} />
                    </Tooltip> :
                    <EditIcon sx={{ color: "lightgray" }} className={styles.edit_icon} />
                  }
                  {(logedInUserProfile.AccessGroup1 & allRoles.user.DeleteUser) &&
                    <Tooltip title="Delete User">
                      <DeleteIcon onClick={() => {
                        handleClickOpen();
                        setDeleteUserData({
                          UserId: row.Id,
                          IsDeleted: 1
                        });
                      }} />
                    </Tooltip>
                  } */}


                  {(allRoles.user.EditUser) ?
                    <Tooltip title="Edit User">
                      <EditIcon onClick={() => {
                        setEditFirstName(row.FirstName);
                        setEditLastName(row.LastName);
                        setEditEmail(row.EmailID);
                        setIsEditing(true);
                        setOpen(true);
                        setUserId(row.Id);
                      }} />
                    </Tooltip> :
                    <EditIcon sx={{ color: "lightgray" }} className={styles.edit_icon} />
                  }
                  {(allRoles.user.DeleteUser) &&
                    <Tooltip title="Delete User">
                      <DeleteIcon onClick={() => {
                        handleClickOpen();
                        setDeleteUserData({
                          UserId: row.Id,
                          IsDeleted: 1
                        });
                      }} />
                    </Tooltip>
                  }

                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ p: 1 }}>{page * 10 - 9} - {(page * 10) == (Math.ceil(totalUserCount / 10) * 10) ? (totalUserCount) : (page * 10)} of {totalUserCount}</Typography>
        <Stack spacing={2}>
          <Pagination sx={{ ml: 'auto !important' }}
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            showFirstButton showLastButton
          />
        </Stack>
      </Box>
    </Paper>
  );
}
export default memo(StickyHeadTable)
