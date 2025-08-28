import { Box, Typography } from '@mui/material'

function PageTitle({props}:any) {
    return (
        <Box>
            <Typography sx={{margin: '10px 0', fontSize: '18px', fontWeight: '600' }}>{props}</Typography>
        </Box>
    )
}

export default PageTitle