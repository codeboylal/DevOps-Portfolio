import React from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container
      component="mains"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", color: "#ff5722" }}>
          404
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          sx={{ marginTop: 2 }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NoPage;
