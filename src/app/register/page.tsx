"use client";

import { FC } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Container,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import { signUpRequest } from "@/services/api/auth/auth.api";
import { UserRole } from "@/enums/user.enum";
import { redirect } from "next/navigation";

interface RegisterFormInterface {
  username: string;
  password: string;
  role: UserRole;
}

const Register: FC = () => {
  const { control, handleSubmit } = useForm<RegisterFormInterface>();

  const onSubmit = async (data: RegisterFormInterface) => {
    try {
      const auth = await signUpRequest({ body: data }); // TODO: open a snackbar to show success

      if (auth) redirect("/");
    } catch (error) {
      console.log("error >>", error); // TODO: open a snackbar to show error
    }
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h5" align="center">
        Create an account
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
        <Controller
          name="role"
          control={control}
          defaultValue={UserRole.DRIVER}
          render={({ field }) => (
            <TextField
              {...field}
              label="Role"
              select
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value={UserRole.DRIVER}>Driver</MenuItem>
              <MenuItem value={UserRole.LOGIST}>Logist</MenuItem>
            </TextField>
          )}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
