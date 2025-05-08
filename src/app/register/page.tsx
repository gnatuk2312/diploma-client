"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
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
import { useSnackbar } from "@/config/mui/snackbar";
import { AxiosErrorDataInterface } from "@/config/axios/axios.types";
import { useAuth } from "@/config/auth";

interface RegisterFormInterface {
  username: string;
  password: string;
  role: UserRole;
}

const Register: FC = () => {
  const { control, handleSubmit } = useForm<RegisterFormInterface>();
  const { showSnackbar } = useSnackbar();
  const { setAuth } = useAuth();
  const { push } = useRouter();

  const onSubmit = async (data: RegisterFormInterface) => {
    try {
      const auth = await signUpRequest({ body: data });

      if (auth) {
        setAuth(auth);
        showSnackbar("Аккаунт створено!", "success");
        push("/");
      }
    } catch (error) {
      const { message } = error as AxiosErrorDataInterface;

      showSnackbar(message, "info");
    }
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h5" align="center">
        Створити новий аккаунт
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
              label="Ім'я на платформі (унікальне)"
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
              label="Пароль"
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
              label="Роль"
              select
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value={UserRole.DRIVER}>Водій</MenuItem>
              <MenuItem value={UserRole.LOGIST}>Логіст</MenuItem>
            </TextField>
          )}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Створити
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
