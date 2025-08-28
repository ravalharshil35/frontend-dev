import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from '@mui/material';
import Spinner from './Spinner';
import LeftPanel from './LeftPanel';
import PageTitle from './PageTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../styles/Users.module.css";
import { callApi } from '../utility/callAPI';

export default function EditProfileLayout() {
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate()
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  const location = useLocation();
  const user = location?.state?.key;


  const validateInputs = async () => {
    const newPassword = document.getElementById('NewPassword') as HTMLInputElement;
    const confirmPassword = document.getElementById('ConfirmPassword') as HTMLInputElement;

    let isValid = true;

    if (newPassword.value.length >= 6 || confirmPassword.value.length >= 6) {
      if (!newPassword.value || newPassword.value.length < 6) {
        isValid = false;
      }

      if (newPassword.value !== confirmPassword.value) {
        toast.error('Confirm Password does not match New Password.', { theme: 'light' });
        isValid = false;
      }
    } else {
      toast.error('Password must be at least 6 characters long.', { theme: 'light' });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const submitedForm = new FormData(event.currentTarget);
    const newPassword = submitedForm.get('newPassword');
    const data: any = {
      EmailID: user.EmailID,
      Password: newPassword,
    }
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    try {
      const changePassword = await callApi(`${baseUrl}user/changePassword`, 'POST', data, headers as import('axios').AxiosRequestHeaders);
      console.log(changePassword);
      setLoading(false);
      toast.success('Password updated successfully', { theme: 'light' });
      navigate('/usermanager')
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong', { theme: 'light' });
      console.error(error);
    }


  };

  return (
    <Box sx={{ display: 'flex', mt: 6 }}>
      <CssBaseline />
      <LeftPanel />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <PageTitle props="Reset password" />
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography variant="h5" component="h5" />

        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '50ch' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className={styles.change_password_box}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="newPassword" style={{ color: 'black', fontSize: '14px' }}>New Password</FormLabel>
              <TextField
                name="newPassword"
                placeholder="••••••"
                type={showPassword ? 'text' : 'password'}
                id="NewPassword"
                required
                fullWidth
                variant="standard"
                className={styles.change_password_textbox}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="confirmpassword" style={{ color: 'black', fontSize: '14px' }}>Confirm Password</FormLabel>
              <TextField
                name="confirmpassword"
                placeholder="••••••"
                type={showPassword ? 'text' : 'password'}
                id="ConfirmPassword"
                required
                fullWidth
                variant="standard"
                className={styles.change_password_textbox}
              />
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
              }
              label="Show Password"
              className={styles.change_password_checkbox}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              className={styles.change_button}
            >
              {loading ? 'Updating...' : 'Change Password'}
            </Button>
          </Box>
        </Box>
      </Box>
      {loading && <Spinner />}
      <ToastContainer />
    </Box>
  );
}
