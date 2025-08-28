import { Box, CircularProgress } from '@mui/material'

function Spinner() {
  return (
    <Box sx={{width: '100%', height: '100%',position: 'fixed',left: 0,top:0,background:'#fff',opacity: 0.5,zIndex:99999999}}>
        <CircularProgress sx={{margin: '400px auto',display: 'block'}} />
    </Box>
  )
}

export default Spinner