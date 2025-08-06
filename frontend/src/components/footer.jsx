// import { Box, Container, Grid, Typography, Link } from '@mui/material';

// const Footer = () => {
//   return (
//     <Box
//       sx={{
//         backgroundColor: '#333',
//         color: 'white',
//         padding: '40px 0',
//         marginTop: 'auto',
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container spacing={4}>
//           <Grid item xs={12} sm={4}>
//             <Typography variant="h6" gutterBottom>
//               About Us
//             </Typography>
//             <Typography variant="body2">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget hendrerit ligula.
//             </Typography>
//           </Grid>

//           <Grid item xs={12} sm={4}>
//             <Typography variant="h6" gutterBottom>
//               Quick Links
//             </Typography>
//             <Link href="#" color="inherit" underline="none">
//               Home
//             </Link>
//             <br />
//             <Link href="#" color="inherit" underline="none">
//               About
//             </Link>
//             <br />
//             <Link href="#" color="inherit" underline="none">
//               Services
//             </Link>
//             <br />
//             <Link href="#" color="inherit" underline="none">
//               Contact
//             </Link>
//           </Grid>

//           <Grid item xs={12} sm={4}>
//             <Typography variant="h6" gutterBottom>
//               Contact Us
//             </Typography>
//             <Typography variant="body2">Email: example@domain.com</Typography>
//             <Typography variant="body2">Phone: +123 456 789</Typography>
//             <Typography variant="body2">Address: 123, Main Street, City, Country</Typography>
//           </Grid>
//         </Grid>

//         <Box mt={4} textAlign="center">
//           <Typography variant="body2" color="text.secondary">
//             © 2025 Your Company. All Rights Reserved
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Footer
import { Box, Container, Grid, Typography, Link } from '@mui/material'

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: '#222',
        color: '#fff',
        padding: '40px 0',
        mt: 'auto'
      }}
    >
      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant='h6' gutterBottom>
              About Us
            </Typography>
            <Typography variant='body2'>
              We build modern, responsive, and accessible web applications tailored to real-world needs
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant='h6' gutterBottom>
              Quick Links
            </Typography>
            <Box component='nav'>
              <Link href='/' color='inherit' underline='none'>Home</Link><br />
              <Link href='#' color='inherit' underline='none'>About</Link><br />
              <Link href='#' color='inherit' underline='none'>Services</Link><br />
              <Link href='#' color='inherit' underline='none'>Contact</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant='h6' gutterBottom>
              Contact Us
            </Typography>
            <Typography variant='body2'>Email: contact@yourdomain.com</Typography>
            <Typography variant='body2'>Phone: +123 456 789</Typography>
            <Typography variant='body2'>Address: 123 Main Street, Your City</Typography>
          </Grid>
        </Grid>

        <Box mt={4} textAlign='center'>
          <Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.6)' }}>
            © 2025 Your Company. All rights reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer

