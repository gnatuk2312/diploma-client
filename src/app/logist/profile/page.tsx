"use client";

import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  createLogistDetailsRequest,
  getLogistDetailsByUserIdRequest,
  updateLogistDetailsRequest,
} from "@/services/api/logist-details/logist-details.api";
import { useAuth } from "@/config/auth";
import { useSnackbar } from "@/config/mui/snackbar";

export interface LogistDetailsInterface {
  id: string;
  description: string;
  email: string;
  phoneNumber: string;
}

const Profile: FC = () => {
  const { user } = useAuth();
  const { showSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<LogistDetailsInterface>({
    defaultValues: {
      description: "",
      email: "",
      phoneNumber: "",
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [existingDetails, setExistingDetails] =
    useState<LogistDetailsInterface | null>(null);

  useEffect(() => {
    if (user === null) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getLogistDetailsByUserIdRequest({
          params: { userId: user.id },
        });
        if (data) {
          setExistingDetails(data);
          reset(data);
        }
      } catch (error) {
        console.log(" fetchData error >>", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [reset, user]);

  const onSubmit = async (formData: LogistDetailsInterface) => {
    if (!existingDetails) {
      if (user === null) return;

      const created = await createLogistDetailsRequest({
        body: { ...formData, userId: user?.id },
      });
      setExistingDetails(created);
      reset(created);
      showSnackbar("Profile created successfully");
    } else {
      const updated = await updateLogistDetailsRequest({
        body: { ...formData, id: existingDetails.id },
      });
      setExistingDetails(updated);
      reset(updated);
      showSnackbar("Profile updated successfully");
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 8 }}>
        Edit your profile
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          label="Description"
          {...register("description")}
          fullWidth
          required
        />
        <TextField
          label="Email"
          type="email"
          {...register("email")}
          fullWidth
          required
        />
        <TextField
          label="Phone Number"
          {...register("phoneNumber")}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" disabled={!isDirty}>
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;
