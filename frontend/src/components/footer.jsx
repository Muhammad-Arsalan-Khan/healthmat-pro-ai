// import { Box, Container, Grid, Typography, Link } from '@mui/material'

// const Footer = () => {
//   return (
//     <Box
//       component='footer'
//       sx={{
//         backgroundColor: '#222',
//         color: '#fff',
//         padding: '40px 0',
//         mt: 'auto'
//       }}
//     >
//       <Container maxWidth='lg'>
//         <Grid container spacing={4}>
//           <Grid item xs={12} sm={4}>
//             <Typography variant='h6' gutterBottom>
//               About Us
//             </Typography>
//             <Typography variant='body2'>
//               We build modern, responsive, and accessible web applications tailored to real-world needs
//             </Typography>
//           </Grid>

//           <Grid item xs={12} sm={4}>
//             <Typography variant='h6' gutterBottom>
//               Quick Links
//             </Typography>
//             <Box component='nav'>
//               <Link href='/' color='inherit' underline='none'>Home</Link><br />
//               <Link href='#' color='inherit' underline='none'>About</Link><br />
//               <Link href='#' color='inherit' underline='none'>Services</Link><br />
//               <Link href='#' color='inherit' underline='none'>Contact</Link>
//             </Box>
//           </Grid>

//           <Grid item xs={12} sm={4}>
//             <Typography variant='h6' gutterBottom>
//               Contact Us
//             </Typography>
//             <Typography variant='body2'>Email: contact@yourdomain.com</Typography>
//             <Typography variant='body2'>Phone: +123 456 789</Typography>
//             <Typography variant='body2'>Address: 123 Main Street, Your City</Typography>
//           </Grid>
//         </Grid>

//         <Box mt={4} textAlign='center'>
//           <Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.6)' }}>
//             © 2025 Your Company. All rights reserved
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   )
// }

// export default Footer

import { Box, Container, Grid, Typography, Link, IconButton, Stack, Divider } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #2e7d32 0%, #4CAF50 100%)",
        color: "#fff",
        py: 6,
        mt: "auto",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.2)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              💚 HealthMate
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Sehat ka Smart Dost — We help users upload, understand, and track their health reports
              using secure AI summaries and beautiful dashboards.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={0.8}>
              {["Home", "About", "Features", "Contact"].map((text, i) => (
                <Link
                  key={i}
                  href="#"
                  underline="none"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: 14,
                    transition: "all 0.2s",
                    "&:hover": { color: "#b9f6ca", pl: 0.5 },
                  }}
                >
                  {text}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">📧 healthmate@support.com</Typography>
            <Typography variant="body2">📞 +92 300 1234567</Typography>
            <Typography variant="body2">🏥 Karachi, Pakistan</Typography>

            {/* Social icons */}
            <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
              {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, i) => (
                <IconButton
                  key={i}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

        {/* Bottom Bar */}
        <Box textAlign="center">
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2025 HealthMate | AI is for understanding only, not for medical advice.
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            “Yeh AI sirf samajhne ke liye hai, ilaaj ke liye nahi.”
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;


