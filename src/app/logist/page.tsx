"use client";

import { FC, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

import { UserInterface } from "@/interfaces/models.interface";
import { getAllUsersRequest } from "@/services/api/user/user.api";

const DriversPage: FC = () => {
  const [drivers, setDrivers] = useState<UserInterface[]>([]);

  const fetchDrivers = async () => {
    try {
      const allUsers = await getAllUsersRequest();
      const onlyDrivers = allUsers.filter((u) => u.role === "DRIVER");
      setDrivers(onlyDrivers);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <Box maxWidth="sm" mx="auto" mt={5}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Drivers List
      </Typography>

      <Stack spacing={2}>
        {drivers.map((user) => (
          <Card key={user.id} variant="outlined">
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1}>
                <DirectionsCarIcon color="primary" />
                <Typography variant="h6">{user.username}</Typography>
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                href={`/driver/profile/${user.id}`}
              >
                View Profile
              </Button>
            </CardActions>
          </Card>
        ))}

        {drivers.length === 0 && (
          <Typography textAlign="center">No drivers found.</Typography>
        )}
      </Stack>
    </Box>
  );
};

export default DriversPage;
