import { FC, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { Advertisment } from "../../types/advertisment";
import dayjs from "dayjs";
import { useAdvertisments } from "../../hooks/useAdvertisments";
import { AdvertismentForm } from "../AddAdvertismentForm";

interface AdvertismentCardProps {
  advertisment: Advertisment;
}

export const AdvertismentCard: FC<AdvertismentCardProps> = ({
  advertisment,
}) => {
  const { deleteAdvertisement } = useAdvertisments();
  const { id, name, description, start_date, end_date } = advertisment;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalVisibility = () => {
    setIsModalOpen((p) => !p);
  };

  return (
    <>
      <Card sx={{ width: "100%", marginBottom: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>

          <Box display="flex" alignItems="center" mb={1}>
            <CalendarToday fontSize="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {`Start Date: ${dayjs(start_date).format("MMMM D, YYYY")}`}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{ pb: 2 }}>
            <CalendarToday fontSize="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {`End Date: ${dayjs(end_date).format("MMMM D, YYYY")}`}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleModalVisibility}
            >
              Edit advertisement
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteAdvertisement.mutate(id)}
            >
              Delete advertisement
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onClose={handleModalVisibility} maxWidth="md">
        <DialogTitle>Edit Advertisement</DialogTitle>
        <DialogContent dividers sx={{ maxHeight: "80vh", overflowY: "auto" }}>
          <AdvertismentForm
            mode="edit"
            advertisementData={advertisment}
            setIsModalOpen={setIsModalOpen}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
