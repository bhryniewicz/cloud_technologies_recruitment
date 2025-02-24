import { useAdvertisments } from "../../hooks/useAdvertisments";
import { Box, Typography } from "@mui/material";
import { AdvertismentCard } from "../AdvertismentCard";

export const AdvertismentsList = () => {
  const { isLoading, advertisments } = useAdvertisments();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Advertisments
      </Typography>
      {isLoading ? (
        <Typography variant="body2">Loading advertisments...</Typography>
      ) : (
        <Box display="flex" flexDirection="column-reverse">
          {advertisments?.map((advertisment) => (
            <AdvertismentCard
              advertisment={advertisment}
              key={advertisment.id}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
