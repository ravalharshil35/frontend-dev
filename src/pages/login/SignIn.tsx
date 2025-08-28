import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../apptheme/AppTheme';
// import ColorModeSelect from '../../apptheme/ColorModeSelect';
import logo from '../../components/Images/eca-logo-dark.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { publicIpv4 } from 'public-ip';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const baseUrl = import.meta.env.VITE_API_BASE_URL
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


export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = useState(false);
  const [_emailErrorMessage,setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`============== ${baseUrl}user/Login`)
    const data = new FormData(event.currentTarget);
    if (emailError || passwordError) {
      return;
    } else {
      try {
        setLoading(true)
        const login = await axios({
          method: 'post',
          url: `${baseUrl}user/Login`,
          data: {
            EmailID: data.get('email'),
            Password: data.get('password'),
            MachineName: await publicIpv4()
          }
        })
        console.log('login===>', login)
        setLoading(false)
        localStorage.setItem("user", JSON.stringify(login.data.User));
        localStorage.setItem("token", login.data.User.token);
        console.log("res.data.User.token", login.data.User.token);

        // const profile = await axios({
        //   method: 'post',
        //   url: `${baseUrl}manageProfile/loadProfile`,
        //   data: {
        //     Id: login.data.User.profileId
        //   }
        // })
        // const [profileDetails]:any =   profile.data
        // console.log("profileDetails====",  profileDetails);

        // localStorage.setItem("loginUserProfile", JSON.stringify(profileDetails));
        navigate("/", { replace: false })

      }
      // .then(res=> {
      //   setLoading(false)
      //   console.log("user data",res.data);

      //   console.log("res.data.User",res.data.User)
      //   localStorage.setItem("user", JSON.stringify(res.data.User));
      //   localStorage.setItem("token", res.data.User.token);
      //   console.log("res.data.User.token",res.data.User.token);

      //   navigate("/home",{ replace: false})
      // })
      catch (err) {
        setLoading(false)
        console.log("errrrrrorrr", err)
        // toast(err.response.data)
        toast("Invalid Credentials");

      }

    }
  };


  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);

  //   if (emailError || passwordError) return;

  //   try {
  //     setLoading(true);
  //     const login = await axios.post(`${baseUrl}user/Login`, {
  //       EmailID: data.get("email"),
  //       Password: data.get("password"),
  //       MachineName: await publicIpv4(),
  //     });

  //     setLoading(false);
  //     localStorage.setItem("user", JSON.stringify(login.data.User));
  //     localStorage.setItem("token", login.data.User.token);
  //     navigate("/", { replace: false });
  //   } catch (err) {
  //     setLoading(false);
  //     console.log("User not found, creating fake login...");

  //     // create a dummy user if backend rejects
  //     const fakeUser = {
  //       id: Date.now(),
  //       email: data.get("email"),
  //       token: "FAKE_TOKEN_" + Date.now(),
  //     };

  //     localStorage.setItem("user", JSON.stringify(fakeUser));
  //     localStorage.setItem("token", fakeUser.token);

  //     toast("Logged in with fake account");
  //     navigate("/", { replace: false });
  //   }
  // };


  const validateInputs = () => {

    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      alert("slkdhdk");
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);


  return (
    <AppTheme {...props}>

      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        {/* <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} /> */}
        <Card variant="outlined">
          {/* <SitemarkIcon /> */}
          <img src={logo} width={150} />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
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
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                //error={emailError}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                        onClick={handleClickShowPassword}
                        edge="end"
                        color={passwordError ? 'error' : 'primary'}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>



            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>

          </Box>
          {loading ?
            <Spinner /> :
            <></>
          }
        </Card>
      </SignInContainer>
      <ToastContainer />

    </AppTheme>
  );
}
