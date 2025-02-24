import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h2">Oooooooops! Something went wrong</Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Homepage
      </Button>
    </Box>
  );
};
