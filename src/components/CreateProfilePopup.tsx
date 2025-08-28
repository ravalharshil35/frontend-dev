import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Input, DialogActions, Divider, FormControl, FormHelperText } from '@mui/material';
import { ProfileManagerContext } from '../context/profileContext';
import roles from '../utility/roles';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import styles from "../styles/Profiles.module.css";
import CancelIcon from '@mui/icons-material/Cancel';
import NativeSelect from '@mui/material/NativeSelect';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProfileRow {
  Id: string;
  Name: string;
  AccessGroup1: string;
}

interface ProfileTable {
  rows: ProfileRow[];
}


export default function CreateProfilePopup() {
  const [open, setOpen] = React.useState(false);
  const [profileData, setProfileData] = React.useState<ProfileTable>({ rows: [] });
  const [selectedProfile, setSelectedProfile] = React.useState<string>('');
  const [profileNameError] = React.useState('');
  const [selectProfileError] = React.useState('');



  const navigate = useNavigate()
  console.log(navigate)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const { handleCreateProfileSubmit, profileTable }: any = React.useContext(ProfileManagerContext);

  const token = JSON.parse(sessionStorage.getItem("user") || '{}').token;
  console.log(token)

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newUser: any = {}
    for (let [key, value] of formData.entries()) {
      newUser[key] = value;
    }
    newUser.CreatedBy = "73B88EFC-7131-4327-8506-A6EFFBDD0C9A";
    newUser.UpdatedBy = "73B88EFC-7131-4327-8506-A6EFFBDD0C9A";
    let selectedRoll: any = [];

    Object.entries(allRoles).map((key) => {
      if (Number(key[1])) {
        selectedRoll.push(key[1])
      }
    })
    newUser.AccessGroup1 = selectedProfile;
    console.log(newUser);

    if (!newUser.ProfileName || !newUser.AccessGroup1) {
      toast("Please provide valid input");
    }

    // if (!newUser.AccessGroup1) {
    //   toast("Please provide valid input")
    // }

    if (!newUser.ProfileName || !newUser.AccessGroup1) {
      return;
    } else {
      // alert(JSON.stringify(newUser))
      handleCreateProfileSubmit(newUser)
    }

  };

  const allRoles = roles()

  React.useEffect(() => {
    setProfileData(profileTable)
  }, [profileTable])



  // const handleChange = (event: SelectChangeEvent) => {
  //   setSelectedProfile(event.target.value as string);
  // };
  // console.log(handleChange)


  return (
    <React.Fragment>
      <Box style={{ width: '-webkit-fill-available' }}>
        <Button
          sx={{ padding: '10px', m: 0 }}
          variant="outlined"
          onClick={handleClickOpen}
          className={styles.add_profile}
          style={{ float: 'right' }}
        >
          Add <AddIcon />
        </Button>
      </Box>

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
            <DialogTitle id="alert-dialog-title" className={styles.popup_heading}>
              Add Profile
            </DialogTitle>
            <CancelIcon
              onClick={handleClose}
              sx={{ cursor: 'pointer', color: '#182958' }}
            />
          </Box>
          <Divider />
          <DialogContent>
            <Box
              component="form"
              sx={{
                '& > :not(style)': {
                  m: 1,
                  width: '-webkit-fill-available'
                }
              }}
              noValidate
              autoComplete="off"
            >
              <Box className="create-user-form" style={{ width: '-webkit-fill-available' }}>
                <Input
                  className={styles.filterInput}
                  placeholder="Name"
                  id="ProfileName"
                  type="text"
                  name="ProfileName"
                  defaultValue=""
                  style={{ width: '-webkit-fill-available', marginBottom: '8px' }}
                />
                {profileNameError && (
                  <FormHelperText error>{profileNameError}</FormHelperText>
                )}
              </Box>

              <Box sx={{ minWidth: 120 }}>

                <FormControl fullWidth>
                  <NativeSelect
                    onChange={(e) => setSelectedProfile(e.target.value)}
                    inputProps={{
                      name: 'ProfileId',
                      id: 'uncontrolled-native',
                    }}
                  >
                    <option value="">
                      &nbsp;&nbsp;Select a profile
                    </option>
                    {profileData?.rows?.map((item: any) => (
                      <option
                        key={item.Id}
                        value={String(item.AccessGroup1)}
                      >
                        &nbsp;&nbsp;{item.Name}
                      </option>
                    ))}
                  </NativeSelect>
                  <FormHelperText>{selectProfileError}</FormHelperText>
                </FormControl>



              </Box>
            </Box>

          </DialogContent>
          <Divider />
          <DialogActions sx={{ justifyContent: 'center', padding: '16px 24px' }}>
            <Box className={styles.submit_wrapper}>
              <Button variant="contained" type="submit" className={styles.submit_button}>Submit</Button>
              {/* <Button sx={{ ml: 2 }} onClick={handleClose} variant="outlined" >Cancel</Button> */}
            </Box>
          </DialogActions>
        </Box>
        <ToastContainer />
      </Dialog>


    </React.Fragment>

  );
}
