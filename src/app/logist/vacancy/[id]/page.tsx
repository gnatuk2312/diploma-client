/* eslint-disable */
"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { OfferInterface } from "@/interfaces/models.interface";
import {
  acceptOfferRequest,
  getAllOffersByVacancyIdRequest,
} from "@/services/api/offer/offer.api";
import { useSnackbar } from "@/config/mui/snackbar";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

const PreviewVacancyOffers: FC<Props> = (props) => {
  const [offers, setOffers] = useState<OfferInterface[]>([]);
  const [error, setError] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<OfferInterface | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);

  const { showSnackbar } = useSnackbar();

  const fetchOffers = async () => {
    const { id } = await props.params;

    try {
      const data = await getAllOffersByVacancyIdRequest({
        params: { vacancyId: id },
      });
      setOffers(data);
    } catch (e) {
      console.error("Failed to fetch offers", e);
      setError(true);
    }
  };

  const handleAccept = async () => {
    if (!selectedOffer) return;
    try {
      await acceptOfferRequest({ params: { id: selectedOffer.id } });
      setOpenModal(false);
      setOffers((prev) =>
        prev.map((offer) =>
          offer.id === selectedOffer.id
            ? { ...offer, acceptedAt: new Date() }
            : offer
        )
      );
      showSnackbar("Пропозиція успішно прийнята!", "success");
    } catch (e) {
      console.error("Error accepting offer", e);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  if (error) {
    return (
      <Box mt={5} textAlign="center">
        <Typography variant="h5" color="textSecondary">
          У вас немає пропозицій від водіїв для цієї вакансії
        </Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="md" mx="auto" mt={5}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 8 }}>
        Пропозиції від водіїв
      </Typography>

      <Stack spacing={3}>
        {offers.map((offer) => (
          <Card key={offer.id} sx={{ backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <CommentIcon color="primary" />
                <Typography>
                  {offer.comment || "*Коментар не додано"}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <PersonIcon color="primary" />
                <Typography>{offer.creator.username}</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <AccessTimeIcon color="primary" />
                <Typography>
                  Створено: {new Date(offer.createdAt).toLocaleString()}
                </Typography>
              </Stack>

              {offer.acceptedAt && (
                <Typography color="success.main" mt={1}>
                  ✅ Ви прийняли пропозицію:{" "}
                  {new Date(offer.acceptedAt).toLocaleString()}
                </Typography>
              )}
            </CardContent>

            <CardActions>
              {!offer.acceptedAt && (
                <Button
                  variant="contained"
                  onClick={() => {
                    setSelectedOffer(offer);
                    setOpenModal(true);
                  }}
                >
                  Прийняти
                </Button>
              )}
              <Button
                component={Link}
                href={`/driver/profile/${offer?.creator?.id}`}
              >
                Переглянути профіль водія
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>

      {/* Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Підтвердити прийняття пропозиції</DialogTitle>
        <DialogContent>
          <Typography mb={2}>Ви впевнені?</Typography>
          {selectedOffer && (
            <Stack spacing={1}>
              <Typography>
                <strong>Коментар:</strong> {selectedOffer.comment || "None"}
              </Typography>
              <Typography>
                <strong>Водій:</strong> {selectedOffer.creator.username}
              </Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Скасувати</Button>
          <Button onClick={handleAccept} variant="contained" color="primary">
            Прийняти
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PreviewVacancyOffers;
