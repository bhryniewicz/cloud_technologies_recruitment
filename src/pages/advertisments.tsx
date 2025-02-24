import { Outlet, useNavigate } from "react-router-dom";
import { AdvertismentsList } from "../components/AdvertismentsList";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { AdvertismentForm } from "../components/AddAdvertismentForm";
import { useAdvertisments } from "../hooks/useAdvertisments";

export const AdvertismentsPage = () => {
  const navigate = useNavigate();
  const { setExampleData } = useAdvertisments();

  return (
    <Grid2
      container
      spacing={12}
      sx={{
        px: { xs: 4, md: 16 },
        py: 8,
        minHeight: "100vh",
      }}
    >
      <Grid2 size={{ xs: 12, md: 6 }}>
        <AdvertismentsList />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h5" sx={{ mb: 2 }}>
            Action buttons
          </Typography>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={{ xs: 2, md: 4 }}
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/advertisments/new")}
            >
              Add advertisment from another page
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setExampleData.mutate()}
            >
              Load example data
            </Button>
          </Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Add your new advertisment to our collection
          </Typography>
          <AdvertismentForm mode="add" />
        </Box>
      </Grid2>
      <Outlet />
    </Grid2>
  );
};
