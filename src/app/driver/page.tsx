"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Stack,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import RoomIcon from "@mui/icons-material/Room";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { VacancyInterface } from "@/interfaces/models.interface";
import { useAuth } from "@/config/auth";
import { getStatusNewVacanciesRequest } from "@/services/api/vacancy/vacancy.api";
import { createOfferRequest } from "@/services/api/offer/offer.api";
import { useSnackbar } from "@/config/mui/snackbar";

const VacanciesPage: FC = () => {
  const [vacancies, setVacancies] = useState<VacancyInterface[]>([]);
  const [selectedVacancy, setSelectedVacancy] =
    useState<VacancyInterface | null>(null);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { showSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<{ comment: string }>();

  const fetchVacancies = async () => {
    try {
      const data = await getStatusNewVacanciesRequest();
      setVacancies(data);
    } catch (e) {
      console.error("Failed to load vacancies", e);
    }
  };

  const onSubmit = async (data: { comment: string }) => {
    if (!user || !selectedVacancy) return;
    try {
      await createOfferRequest({
        body: {
          vacancyId: selectedVacancy.id,
          creatorId: user.id,
          comment: data.comment,
        },
      });
      reset();
      setOpen(false);
      showSnackbar("Ви успішно відгукнулись на вакансію!", "success");
    } catch (e) {
      console.error("Failed to create offer", e);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  return (
    <Box maxWidth="md" mx="auto" mt={5}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Доступні вакансії (рейси)
      </Typography>

      <Grid container spacing={3} sx={{ my: 6 }}>
        {vacancies.map((vacancy) => (
          <Grid item xs={12} key={vacancy.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {vacancy.title}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <DescriptionIcon color="action" />
                  <Typography>
                    {vacancy.description || "Немає детального опису"}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <MonetizationOnIcon color="action" />
                  <Typography>{vacancy.unitPrice / 100}грн</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <RoomIcon color="action" />
                  <Typography>
                    Звідки: {vacancy?.from?.country}, {vacancy?.from?.city},{" "}
                    {vacancy?.from?.street}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <RoomIcon color="action" />
                  <Typography>
                    Куди: {vacancy?.to?.country}, {vacancy?.to?.city},{" "}
                    {vacancy?.to?.street}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <PersonIcon color="action" />
                  <Typography>Логіст: {vacancy?.creator?.username}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessTimeIcon color="action" />
                  <Typography>
                    Створено: {new Date(vacancy.createdAt).toLocaleString()}
                  </Typography>
                </Stack>
              </CardContent>

              <CardActions>
                <Button
                  href={`/logist/profile/${vacancy?.creator?.id}`}
                  variant="outlined"
                  size="small"
                >
                  Профіль логіста
                </Button>

                {user && (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      setSelectedVacancy(vacancy);
                      setOpen(true);
                    }}
                  >
                    Відгукнутись
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Відгукнутись на вакансію</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="comment"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Коментар"
                  multiline
                  rows={4}
                  variant="outlined"
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Закрити</Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Відгукнутись
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default VacanciesPage;
