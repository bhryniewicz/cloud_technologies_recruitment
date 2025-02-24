import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useQuote } from "../hooks/useQuote";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { data, isLoading } = useQuote();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/advertisments");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh", px: { xs: 4, md: 16 } }}
    >
      {isLoading ? (
        <Box display="flex" alignItems="center" gap={2}>
          <CircularProgress size={24} />
          <Typography variant="body1" color="textSecondary">
            Loading quote...
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="h6" align="center">
            {data[0].quote}
          </Typography>
        </>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleNavigate}
        sx={{ marginTop: 2 }}
      >
        Go to Advertisements
      </Button>
    </Box>
  );
};
