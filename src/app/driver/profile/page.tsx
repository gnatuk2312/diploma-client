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

import { useAuth } from "@/config/auth";
import { useSnackbar } from "@/config/mui/snackbar";
import { FileInterface } from "@/interfaces/models.interface";
import {
  createDriverDetailsRequest,
  getDriverDetailsByUserIdRequest,
  updateDriverDetailsRequest,
} from "@/services/api/driver-details/driver-details.api";
import { uploadFileRequest } from "@/services/api/file/file.api";
import Link from "next/link";

export interface DriverDetailsInterface {
  id: string;
  description: string | null;
  email: string | null;
  phoneNumber: string | null;
  driverLicense: FileInterface | null;
}

const DriverProfile: FC = () => {
  const { user } = useAuth();
  const { showSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isDirty },
  } = useForm<DriverDetailsInterface>({
    defaultValues: {
      description: null,
      email: null,
      phoneNumber: null,
      driverLicense: null,
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [existingDetails, setExistingDetails] =
    useState<DriverDetailsInterface | null>(null);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  console.log(" file >>", file);

  const driverLicense = watch("driverLicense");
  console.log(" driverLicense >>", driverLicense);

  useEffect(() => {
    const fetchData = async () => {
      if (user === null) return;
      try {
        setIsLoading(true);
        const data = await getDriverDetailsByUserIdRequest({
          params: { userId: user.id },
        });
        if (data) {
          setExistingDetails(data);
          reset(data);
        }
      } catch (error) {
        showSnackbar(`Failed to load profile`, "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [reset, showSnackbar, user]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    console.log(" handleUpload formData >>", formData);

    try {
      setUploading(true);
      const uploadedFile = await uploadFileRequest({ body: formData });

      setValue("driverLicense", uploadedFile, { shouldDirty: true });
      showSnackbar("Driver license uploaded successfully", "success");
    } catch (error) {
      showSnackbar("Failed to upload driver license", "error");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (formData: DriverDetailsInterface) => {
    try {
      if (!existingDetails) {
        if (user === null) return;
        const created = await createDriverDetailsRequest({
          body: { ...formData, userId: user.id },
        });
        setExistingDetails(created);
        reset(created);
        showSnackbar("Profile created successfully", "success");
      } else {
        const updated = await updateDriverDetailsRequest({
          body: {
            ...formData,
            id: existingDetails.id,
            ...(existingDetails?.driverLicense && {
              driverLicenseFileId: existingDetails.driverLicense?.id,
            }),
          },
        });
        setExistingDetails(updated);
        reset(updated);
        showSnackbar("Profile updated successfully", "success");
      }
    } catch (error) {
      showSnackbar("Failed to save profile", "error");
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 8 }}
      >
        <Typography variant="h4">Edit your driver profile</Typography>
        <Button component={Link} href={`/driver/profile/${user?.id}`}>
          Preview my profile
        </Button>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField label="Description" {...register("description")} fullWidth />
        <TextField
          label="Email"
          type="email"
          {...register("email")}
          fullWidth
        />
        <TextField
          label="Phone Number"
          {...register("phoneNumber")}
          fullWidth
        />
        {driverLicense && (
          <Box>
            <Typography variant="subtitle1">Uploaded License:</Typography>
            <a
              target="_blank"
              href={"http://localhost:7777/" + driverLicense.publicPath}
            >
              View file
            </a>
          </Box>
        )}
        {/* TODO: make this work */}
        <input accept="*" type="file" onChange={handleFileChange} />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file}
        >
          Upload File
        </Button>
        <Button type="submit" variant="contained" disabled={!isDirty}>
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default DriverProfile;
