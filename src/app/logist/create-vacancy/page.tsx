"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { Box, TextField, Button, Container, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import AddressAutocomplete from "@/components/address-autocomplete";
import { useSnackbar } from "@/config/mui/snackbar";
import { AxiosErrorDataInterface } from "@/config/axios/axios.types";
import { createVacancyRequest } from "@/services/api/vacancy/vacancy.api";
import { useAuth } from "@/config/auth";
import { AddressInterface } from "@/interfaces/models.interface";

interface VacancyFormInterface {
  title: string;
  description: string;
  unitPrice: number;
  from: Omit<AddressInterface, "id">;
  to: Omit<AddressInterface, "id">;
}

const CreateVacancy: FC = () => {
  const { control, handleSubmit, setValue } = useForm<VacancyFormInterface>();
  const { user } = useAuth();
  const { showSnackbar } = useSnackbar();
  const { push } = useRouter();

  const onSubmit = async (data: VacancyFormInterface) => {
    if (!user) return;

    try {
      await createVacancyRequest({
        body: { ...data, unitPrice: data.unitPrice * 100, creatorId: user.id },
      });
      showSnackbar("Vacancy created successfully", "success");
      push("/" + user.role.toLowerCase() + "/vacancies");
    } catch (error) {
      const { message } = error as AxiosErrorDataInterface;
      showSnackbar(message, "error");
    }
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h5" align="center">
        Create Vacancy
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              margin="normal"
              required
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              required
            />
          )}
        />
        <Controller
          name="unitPrice"
          defaultValue={0}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Unit Price (UAH)"
              type="number"
              fullWidth
              margin="normal"
              required
            />
          )}
        />
        <Controller
          name="from"
          control={control}
          render={() => (
            <AddressAutocomplete
              label="From"
              onSelect={(address) => setValue("from", address)}
            />
          )}
        />
        <Controller
          name="to"
          control={control}
          render={() => (
            <AddressAutocomplete
              label="To"
              onSelect={(address) => setValue("to", address)}
            />
          )}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Create Vacancy
        </Button>
      </Box>
    </Container>
  );
};

export default CreateVacancy;
