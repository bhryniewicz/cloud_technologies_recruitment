import { useForm } from "react-hook-form";
import { Button, TextField, Box, Grid2 } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Advertisment } from "../../types/advertisment";
import { useAdvertisments } from "../../hooks/useAdvertisments";
import { FormSchema, FormValues } from "./schema";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface AdvertismentFormProps {
  isNewAdvertismentPage?: boolean;
  mode: "add" | "edit";
  advertisementData?: Advertisment;
  setIsModalOpen?: (value: boolean) => void;
}

export const AdvertismentForm: FC<AdvertismentFormProps> = ({
  isNewAdvertismentPage = false,
  mode,
  advertisementData,
  setIsModalOpen = () => {},
}) => {
  const { addAdvertisement, editAdvertisement } = useAdvertisments();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(FormSchema(mode)),
    defaultValues: {
      name: advertisementData?.name || "",
      description: advertisementData?.description || "",
      start_date: advertisementData
        ? dayjs(advertisementData.start_date)
        : dayjs(),
      end_date: advertisementData ? dayjs(advertisementData.end_date) : dayjs(),
    },
  });

  const onSubmit = (data: FormValues) => {
    const newAdvertisement: Advertisment = {
      id: advertisementData?.id || crypto.randomUUID(),
      name: data.name,
      description: data.description,
      start_date: data.start_date.toDate(),
      end_date: data.end_date.toDate(),
    };

    if (mode === "add") {
      addAdvertisement.mutate(newAdvertisement);
    } else if (mode === "edit") {
      editAdvertisement.mutate(newAdvertisement);
      setIsModalOpen(false);
    }

    reset();

    if (isNewAdvertismentPage) {
      navigate("/advertisments");
    }
  };

  const startDate = watch("start_date");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <TextField
        {...register("name")}
        label="Advertisement Name"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("description")}
        label="Description"
        fullWidth
        multiline
        rows={4}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
              <DateCalendar
                value={watch("start_date") || dayjs()}
                onChange={(newValue) => setValue("start_date", newValue)}
                minDate={dayjs()}
              />
              {errors.start_date && (
                <p style={{ color: "red" }}>{errors.start_date.message}</p>
              )}
            </Box>
          </LocalizationProvider>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
              <DateCalendar
                value={watch("end_date") || dayjs()}
                onChange={(newValue) => setValue("end_date", newValue)}
                minDate={startDate}
              />
              {errors.end_date && (
                <p style={{ color: "red" }}>{errors.end_date.message}</p>
              )}
            </Box>
          </LocalizationProvider>
        </Grid2>
      </Grid2>

      <Button variant="contained" color="primary" type="submit">
        {mode === "add" ? "Add Advertisement" : "Update Advertisement"}
      </Button>
    </form>
  );
};
