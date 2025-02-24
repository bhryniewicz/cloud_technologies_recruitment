import { Box, Typography, Container } from "@mui/material";
import { AdvertismentForm } from "../components/AddAdvertismentForm";

export const NewAdvertismentPage = () => {
  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Add new advertisment
        </Typography>
        <AdvertismentForm isNewAdvertismentPage mode="add" />
      </Box>
    </Container>
  );
};
