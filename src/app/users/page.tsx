"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { getAllUsersRequest } from "@/services/api/user.api";
import { UserInterface } from "@/interfaces/models.interface";

const Home = () => {
  const [state, setState] = useState<UserInterface[] | null>(null);

  const getAllUsers = useCallback(async () => {
    const response = await getAllUsersRequest();
    setState(response);
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <Box>
      <Typography variant="h2">123</Typography>
      <Button variant="contained" color="secondary">
        Submit
      </Button>
      {state !== null && (
        <List>
          {state.map((user) => {
            const { id, username } = user;

            return (
              <ListItem key={id}>
                <ListItemText>{username}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default Home;
