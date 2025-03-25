"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { Box, TextField, Button, Container, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import { signInRequest } from "@/services/api/auth/auth.api";
import { useSnackbar } from "@/config/mui/snackbar";
import { AxiosErrorDataInterface } from "@/config/axios/axios.types";

interface LoginFormInterface {
  username: string;
  password: string;
}

const Login: FC = () => {
  const { control, handleSubmit } = useForm<LoginFormInterface>();
  const { showSnackbar } = useSnackbar();
  const { push } = useRouter();

  const onSubmit = async (data: LoginFormInterface) => {
    try {
      const auth = await signInRequest({ body: data });

      if (auth) {
        showSnackbar("Login successful", "success");
        push(`/${auth.user.role.toLowerCase()}`);
      }
    } catch (error) {
      const { message } = error as AxiosErrorDataInterface;
      showSnackbar(message, "info");
    }
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h5" align="center">
        Login to your account
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
              fullWidth
              margin="normal"
              required
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              required
            />
          )}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
