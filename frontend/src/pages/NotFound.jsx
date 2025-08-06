import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const NotFound = () => {
  return (
    <Box
      height="100vh"
      bgcolor="#fff"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      px={3}
    >
      <ErrorOutlineIcon sx={{ fontSize: 100, color: '#005EB8', mb: 2 }} />

      <Typography variant="h2" fontWeight="bold" color="#005EB8">
        404
      </Typography>

      <Typography variant="h5" color="#8BC441" mb={1}>
        Oops! Page Not Found
      </Typography>

      <Typography variant="body1" color="textSecondary" maxWidth={400} mb={3}>
        The page you're looking for doesn’t exist or has been moved. But don't worry — you're not lost forever.
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{
          backgroundColor: '#005EB8',
          '&:hover': { backgroundColor: '#004999' },
          color: '#fff',
          px: 4,
          py: 1.5,
          borderRadius: '30px',
          fontWeight: 'bold'
        }}
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFound
