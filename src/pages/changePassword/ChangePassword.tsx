import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import {  useNavigate } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import AppTheme from '../../apptheme/AppTheme';
import logo from '../../components/Images/eca-logo-dark.png';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { callApi } from '../../utility/callAPI';
import styles from "../../styles/Users.module.css";
const baseUrl = import.meta.env.VITE_API_BASE_URL
interface JwtPayload {
  Password: string;
  EmailID: string;
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function ChangePassword(props: { disableCustomTheme?: boolean }) {
  const [oldPasswordInput, setOldPasswordInput] = React.useState('');
  const [newPasswordInput, setNewPasswordInput] = React.useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = React.useState('');

  const [oldPasswordError, setOldPasswordError] = React.useState(false);
  const [oldPasswordErrorMessage, setOldPasswordErrorMessage] = React.useState('');
  const [newPasswordError, setNewPasswordError] = React.useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const user: any = JSON.parse(localStorage.getItem("user") || '{}');
  
  const tokenId = user.tokenId
  const isAnyFieldEmpty = !oldPasswordInput || !newPasswordInput || !confirmPasswordInput;
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // alert(baseUrl)
    const token: any = localStorage.getItem('token');
    const decoded = jwtDecode<JwtPayload>(token);
    const OriginalPassword = decoded.Password;

    const hashedOldPassword = sha256(oldPasswordInput);

    if (hashedOldPassword !== OriginalPassword) {
      toast("Old password is incorrect", { theme: 'light', type: 'error' });
      return;
    }

    if (!validateInputs()) return;

    setLoading(true);

    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const response = await axios.post('http://localhost:4000/user/changePassword', {
        EmailID: decoded.EmailID,
        Password: newPasswordInput,
      });
      console.log(response);

      const logOutPayload:any = {
            AuthTokenId: tokenId,
        }

      const logout = await callApi(`${baseUrl}user/logout`,'POST',  
        logOutPayload, headers as import('axios').AxiosRequestHeaders);
        console.log(logout)

        navigate("/login")

      toast("Password updated successfully", { theme: 'light', type: 'success' });
    } catch (err) {
      toast("Something went wrong", { theme: 'light', type: 'error' });
    } finally {
      setLoading(false);
    }
  };
  const validateInputs = () => {
    let isValid = true;

    if (!oldPasswordInput || oldPasswordInput.length < 6) {
      setOldPasswordError(true);
      toast('Password must be at least 6 characters.');
      isValid = false;
    } else {
      setOldPasswordError(false);
      setOldPasswordErrorMessage('');
    }

    if (!newPasswordInput || newPasswordInput.length < 6) {
      setNewPasswordError(true);
      toast.error('Password must be at least 6 characters.');
      isValid = false;
    } else {
      setNewPasswordError(false);
      setNewPasswordErrorMessage('');
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setConfirmPasswordError(true);
      toast.error('Confirm password does not match the new password.');
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <img src={logo} width={150} alt="ECA Logo" />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Change Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="OldPassword">Old Password</FormLabel>
              <TextField
                name="oldPassword"
                placeholder="••••••"
                type="password"
                id="OldPassword"
                fullWidth
                required
                error={oldPasswordError}
                helperText={oldPasswordErrorMessage}
                value={oldPasswordInput}
                onChange={(e) => setOldPasswordInput(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="NewPassword">New Password</FormLabel>
              <TextField
                name="newPassword"
                placeholder="••••••"
                type="password"
                id="NewPassword"
                fullWidth
                required
                error={newPasswordError}
                helperText={newPasswordErrorMessage}
                value={newPasswordInput}
                onChange={(e) => setNewPasswordInput(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="ConfirmPassword">Confirm Password</FormLabel>
              <TextField
                name="confirmpassword"
                placeholder="••••••"
                type="password"
                id="ConfirmPassword"
                fullWidth
                required
                error={confirmPasswordError}
                helperText={confirmPasswordErrorMessage}
                value={confirmPasswordInput}
                onChange={(e) => setConfirmPasswordInput(e.target.value)}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isAnyFieldEmpty || loading}
              className={styles.signin_button}
            >
              {loading ? 'Changing...' : 'Submit'}
            </Button>

          </Box>
        </Card>
      </SignInContainer>
      <ToastContainer />
    </AppTheme>
  );
}
