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
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleModalVisibility = () => {
    setIsModalOpen((p) => !p);
  };

  const truncatedDescription =
    description.length > 150
      ? `${description.substring(0, 150)}...`
      : description;

  const handleDescriptionToggle = () => {
    setIsDescriptionExpanded((prev) => !prev);
  };

  const displayedDescription = isDescriptionExpanded
    ? description
    : truncatedDescription;

  return (
    <>
      <Card sx={{ width: "100%", marginBottom: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5">{name}</Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              wordWrap: "break-word",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                whiteSpace: "normal",
              }}
            >
              {displayedDescription}
            </Typography>
          </Box>

          {description.length > 150 && (
            <Button
              onClick={handleDescriptionToggle}
              variant="text"
              sx={{ p: 0, mb: 2 }}
            >
              {isDescriptionExpanded ? "Show Less" : "Show More"}
            </Button>
          )}

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
