import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Input, Divider, FormControl } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { UserManagerContext } from '../context/userContext';
import styles from "../styles/Users.module.css";
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AlertDialog() {

  const { formFields
    , handleValidation
    , createNewUser
    // , profiles
    // , LoadProfiles
    , open
    , setOpen
    , isEditing, setIsEditing
    , setIsDeleting
    // , profileErrorMessage
    //, editProfile
    , editUser
    //, userProfileId
    , setUserProfileId
    , userId }: any = React.useContext(UserManagerContext);


  //const [userProfileId, setUserProfileId] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false)
    setUserProfileId(null)
  };

  // =====================form validation=============================
  const token = JSON.parse(sessionStorage.getItem("user") || '{}').token;
  console.log(token);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newUser: any = {}
    for (let [key, value] of formData.entries()) {
      newUser[key] = value;
    }

    newUser.CreatedBy = JSON.parse(localStorage.getItem("user") || '{}').AuthContextUserId;
    newUser.UpdatedBy = JSON.parse(localStorage.getItem("user") || '{}').AuthContextUserId;

    if (!newUser.ProfileId || newUser.ProfileId === "") {
      newUser.ProfileId = null;
    }

    if (isEditing) {
      newUser.UserId = userId
      if (!newUser.FirstName || !newUser.LastName) {
        handleValidation(newUser)
      } else {
        editUser(newUser)
      }
    } else {
      if (!newUser.FirstName || !newUser.LastName || !newUser.EmailID || !newUser.Password) {
        handleValidation(newUser)
      } else {
        createNewUser(newUser)
      }
    }
  };


  // React.useEffect(() => {
  //   LoadProfiles()
  // }, [])
  // console.log("sdadasdasd", profiles)


  return (
    <React.Fragment>
      <Button variant="outlined" onClick={() => { handleClickOpen(); setIsDeleting(false); }}>
        Add user
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
              className={isEditing ? '' : styles.popup_heading}
              sx={{ m: 0, paddingLeft: 2, fontSize: '20px', fontWeight: 600 }}
            >
              {isEditing ? 'Edit User' : 'Add User'}
            </DialogTitle>
            <CancelIcon onClick={handleClose} sx={{ cursor: 'pointer', color: '#182958' }} />
          </Box>

          <Divider />

          <DialogContent>
            
              {formFields?.createUserInputs?.map((item: any) => {
                if (item.editable) return <></>;
                return (
                  <FormControl key={item.fieldName} className={styles.new_user_form}>
                    {isEditing ?
                      <Input
                        className={styles.filterInput}
                        placeholder={item?.label}
                        id={item.fieldName}
                        type={item.type}
                        name={item.fieldName}
                        // helperText={item.errorMessage}
                        autoFocus={true}
                        defaultValue={item.editValue}
                      /> :
                      <Input
                        className={styles.filterInput}
                        placeholder={item?.label}
                        id={item.fieldName}
                        type={item.type}
                        name={item.fieldName}
                      />}
                  </FormControl>
                );
              })}

              {/* <FormControl fullWidth>
                <NativeSelect
                  id="native-select-profile"
                  name="ProfileId"
                  value={userProfileId || ""}
                  onChange={(e) => setUserProfileId(e.target.value)}
                >
                  <option value="">Select a profile</option>
                  {profiles?.map((option: any) => (
                    <option key={option?.Id} value={option?.Id}>
                      {option?.Name}
                    </option>
                  ))}
                </NativeSelect>

                <FormHelperText>{profileErrorMessage}</FormHelperText>
              </FormControl> */}

            
          </DialogContent>

          <Divider />
          <DialogActions sx={{ justifyContent: 'center', padding: '16px 24px' }}>
            <Box className={styles.submit_wrapper}>
              <Button variant="contained" type="submit" className={styles.submit_button}>
                Submit
              </Button>
            </Box>
          </DialogActions>
        </Box>
        <ToastContainer />
      </Dialog>
    </React.Fragment>
  );
}
