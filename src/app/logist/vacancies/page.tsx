"use client";

import { FC, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Chip,
  CardActions,
  Button,
  Container,
  Box,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { VacancyStatus } from "@/enums/vacancy.enum";
import { getCreatedVacanciesRequest } from "@/services/api/vacancy/vacancy.api";
import { useAuth } from "@/config/auth";
import { AxiosErrorDataInterface } from "@/config/axios/axios.types";
import { useSnackbar } from "@/config/mui/snackbar";
import { VacancyInterface } from "@/interfaces/models.interface";

const statusColors = {
  [VacancyStatus.NEW]: "secondary",
  [VacancyStatus.IN_PROGRESS]: "warning",
  [VacancyStatus.DELIVERED]: "success",
};

const Vacancies: FC = () => {
  const { user } = useAuth();
  const { showSnackbar } = useSnackbar();

  const [vacancies, setVacancies] = useState<VacancyInterface[] | []>([]);

  const getCreatedVacancies = useCallback(
    async (userId: string) => {
      try {
        const vacancies = await getCreatedVacanciesRequest({
          params: { userId },
        });
        setVacancies(vacancies);
      } catch (error) {
        const { message } = error as AxiosErrorDataInterface;
        showSnackbar(message, "error");
      }
    },
    [showSnackbar]
  );

  useEffect(() => {
    if (user) getCreatedVacancies(user.id);
  }, [user, getCreatedVacancies]);

  return (
    <Container sx={{ mt: 8 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Typography variant="h5" align="center">
          Created by me
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          href="/logist/create-vacancy"
        >
          + Create new Vacancy
        </Button>
      </Box>
      <Grid container spacing={3} padding={3}>
        {vacancies.map((vacancy) => (
          <Grid item xs={12} sm={6} md={4} key={vacancy.id}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardHeader
                avatar={<WorkIcon color="primary" />}
                title={vacancy.title}
                subheader={new Date(vacancy.createdAt).toLocaleDateString()}
                action={
                  <Chip
                    label={vacancy.status}
                    color={statusColors[vacancy.status]}
                  />
                }
              />
              <CardContent>
                <Typography variant="body1">{vacancy.description}</Typography>
                <Typography
                  variant="h6"
                  mt={2}
                  display="flex"
                  alignItems="center"
                >
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "UAH",
                  }).format(vacancy.unitPrice / 100)}
                </Typography>
                <Typography
                  variant="subtitle1"
                  mt={2}
                  display="flex"
                  alignItems="center"
                >
                  <LocationOnIcon color="secondary" sx={{ mr: 1 }} /> From:{" "}
                  {vacancy.from.city || "Unknown"}, {vacancy.from.country}
                </Typography>
                <Typography
                  variant="subtitle1"
                  display="flex"
                  alignItems="center"
                >
                  <LocationOnIcon color="secondary" sx={{ mr: 1 }} /> To:{" "}
                  {vacancy.to.city || "Unknown"}, {vacancy.to.country}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "end" }}>
                <Button
                  color="secondary"
                  variant="outlined"
                  component={Link}
                  href={`/logist/vacancy/${vacancy.id}`}
                >
                  Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Vacancies;
