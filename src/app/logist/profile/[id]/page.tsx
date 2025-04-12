"use client";

import { FC, useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  Stack,
  Paper,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";

import { getLogistDetailsByUserIdRequest } from "@/services/api/logist-details/logist-details.api";
import { LogistDetailsInterface } from "@/interfaces/models.interface";

type Props = {
  params: Promise<{ id: string }>;
};

const PreviewProfile: FC<Props> = (props) => {
  const [profile, setProfile] = useState<LogistDetailsInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { id } = await props.params;
        const data = await getLogistDetailsByUserIdRequest({
          params: { userId: id },
        });
        setProfile(data);
      } catch (e) {
        console.error("Error fetching profile", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [props.params]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !profile) {
    return (
      <Box mt={10} textAlign="center">
        <Typography variant="h5">
          Logist has not created a profile yet
        </Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth={600} mx="auto" mt={5}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 8 }}>
        Logist Public Profile
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
          <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h6">{profile?.user?.username}</Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <EmailIcon color="action" />
          <Typography>{profile.email}</Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <PhoneIcon color="action" />
          <Typography>{profile.phoneNumber}</Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="flex-start" mt={2}>
          <DescriptionIcon color="action" />
          <Typography whiteSpace="pre-line">{profile.description}</Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default PreviewProfile;
