/* eslint-disable */
"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonIcon from "@mui/icons-material/Person";

import { useAuth } from "@/config/auth";
import { VacancyInterface } from "@/interfaces/models.interface";
import {
  getAppliedVacanciesRequest,
  getStatusDeliveredVacanciesRequest,
  getStatusInProgressVacanciesRequest,
  markVacancyAsDeliveredRequest,
} from "@/services/api/vacancy/vacancy.api";

const Vacancies: FC = () => {
  const { user } = useAuth();

  const [appliedVacancies, setAppliedVacancies] = useState<VacancyInterface[]>(
    []
  );
  const [inProgressVacancies, setInProgressVacancies] = useState<
    VacancyInterface[]
  >([]);
  const [deliveredVacancies, setDeliveredVacancies] = useState<
    VacancyInterface[]
  >([]);

  const [selectedVacancy, setSelectedVacancy] =
    useState<VacancyInterface | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchVacancies = async () => {
    if (!user) return;
    try {
      const applied = await getAppliedVacanciesRequest({
        params: { userId: user.id },
      });
      const inProgress = await getStatusInProgressVacanciesRequest({
        params: { userId: user.id },
      });
      const delivered = await getStatusDeliveredVacanciesRequest({
        params: { userId: user.id },
      });

      setAppliedVacancies(applied);
      setInProgressVacancies(inProgress);
      setDeliveredVacancies(delivered);
    } catch (error) {
      console.error("Failed to fetch vacancies", error);
    }
  };

  const handleMarkDelivered = async () => {
    if (!selectedVacancy) return;
    try {
      await markVacancyAsDeliveredRequest({
        params: { id: selectedVacancy.id },
      });
      setInProgressVacancies((prev) =>
        prev.filter((v) => v.id !== selectedVacancy.id)
      );
      setDeliveredVacancies(
        (prev) => [...prev, { ...selectedVacancy, status: "DELIVERED" }] as any
      );
      setOpenModal(false);
    } catch (e) {
      console.error("Error marking as delivered", e);
    }
  };

  const renderVacancyCard = (
    vacancy: VacancyInterface,
    withDeliverBtn = false
  ) => (
    <Card key={vacancy.id} sx={{ backgroundColor: "#f9f9f9" }}>
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <DescriptionIcon color="primary" />
            <Typography variant="h6">{vacancy.title}</Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeIcon color="primary" />
            <Typography>
              Створено: {new Date(vacancy.createdAt).toLocaleString()}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <MonetizationOnIcon color="primary" />
            <Typography>{vacancy.unitPrice / 100}грн</Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnIcon color="primary" />
            <Typography>
              Звідки: {vacancy.from.city}, {vacancy.from.street}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnIcon color="error" />
            <Typography>
              Куди: {vacancy.to.city}, {vacancy.to.street}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <PersonIcon color="primary" />
            <Typography>Логіст: {vacancy.creator.username}</Typography>
          </Stack>

          <Typography color="textSecondary">
            Статус: {vacancy.status}
          </Typography>
        </Stack>
      </CardContent>

      {withDeliverBtn && (
        <CardActions>
          <Button
            variant="contained"
            onClick={() => {
              setSelectedVacancy(vacancy);
              setOpenModal(true);
            }}
          >
            Позначити доставленим
          </Button>
        </CardActions>
      )}
    </Card>
  );

  useEffect(() => {
    fetchVacancies();
  }, [user]);

  return (
    <Box maxWidth="md" mx="auto" my={5}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Вакансії, на які ви подались
      </Typography>

      {/* IN PROGRESS */}
      <Box mt={6}>
        <Typography variant="h5" mb={2}>
          Вас обрали водієм (в процессі виконання)
        </Typography>
        <Stack spacing={3}>
          {inProgressVacancies.map((v) => renderVacancyCard(v, true))}
          {inProgressVacancies.length === 0 && (
            <Typography>Немає таких вакансій</Typography>
          )}
        </Stack>
      </Box>

      {/* APPLIED */}
      <Box mt={4}>
        <Typography variant="h5" mb={2}>
          Подались (чекаємо відповідь клієнта)
        </Typography>
        <Stack spacing={3}>
          {appliedVacancies.map((v) => renderVacancyCard(v))}
          {appliedVacancies.length === 0 && (
            <Typography>Немає таких вакансій</Typography>
          )}
        </Stack>
      </Box>

      {/* DELIVERED */}
      <Box mt={6}>
        <Typography variant="h5" mb={2}>
          Доставлено (старі рейси)
        </Typography>
        <Stack spacing={3}>
          {deliveredVacancies.map((v) => renderVacancyCard(v))}
          {deliveredVacancies.length === 0 && (
            <Typography>Немає таких вакансій</Typography>
          )}
        </Stack>
      </Box>

      {/* Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Підтвердити доставку</DialogTitle>
        <DialogContent>
          <Typography>
            Ви впевнені що хочете позначити вакансію як виконану?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Ні</Button>
          <Button variant="contained" onClick={handleMarkDelivered}>
            Так
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Vacancies;
