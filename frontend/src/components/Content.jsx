import { Box, Typography, Button, Container, Grid, Paper } from "@mui/material";

function Content() {
  return (
    <>
    <Box sx={{ bgcolor: "#f9fafb", color: "#1a202c", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 10,
          background:
            "linear-gradient(135deg, #4CAF50 0%, #81C784 100%)",
          color: "white",
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          💚 HealthMate
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Sehat ka Smart Dost – Your AI-Powered Health Companion
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Apni medical reports upload karo aur HealthMat Pro ai se simple Urdu + English mein samjho!
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            sx={{ bgcolor: "white", color: "#4CAF50", mr: 2 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            sx={{ borderColor: "white", color: "white" }}
          >
            Learn More
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
          🌟 Key Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {[
            {
              title: "Upload & Store Reports",
              desc: "Apni lab reports aur prescriptions safely upload karo.",
            },
            {
              title: "AI Summary in Urdu + English",
              desc: "Gemini se simple aur samajhnay layak summary hasil karo.",
            },
            {
              title: "Track Your Health",
              desc: "BP, Sugar, aur Weight jaisay vitals add karke apni progress dekho.",
            },
            {
              title: "Secure & Private",
              desc: "JWT + Encrypted data ensure karta hai ke sab kuch safe rahe.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper
                elevation={3}
                sx={{ p: 4, textAlign: "center", borderRadius: 3 }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography>{feature.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: "#e8f5e9", py: 8 }}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
            🪜 How It Works
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {[
              "1️⃣ Upload your medical report (PDF or image)",
              "2️⃣ HealthMat Pro ai anlyzes your report automatically",
              "3️⃣ Get simple Urdu + English explanation",
              "4️⃣ Track all reports in one timeline view",
            ].map((step, i) => (
              <Grid item xs={12} md={3} key={i}>
                <Paper
                  elevation={1}
                  sx={{ p: 3, textAlign: "center", borderRadius: 3 }}
                >
                  <Typography>{step}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#2e7d32", color: "white", textAlign: "center", py: 3, mt: 8 }}>
        <Typography variant="body1">
          💬 Disclaimer: AI is for understanding only, not for medical advice.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          “Yeh AI sirf samajhne ke liye hai, ilaaj ke liye nahi.”
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          © 2025 HealthMate – Built with 💚 for Sehat Files Hackathon
        </Typography>
      </Box>
    </Box>
  )
    </>
  )
}

export default Content