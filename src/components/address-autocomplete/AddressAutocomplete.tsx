import React, { useState, useEffect, FC } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";

import { AddressInterface } from "@/interfaces/models.interface";

type Props = {
  label?: string;
  onSelect: (address: Omit<AddressInterface, "id">) => void;
};

const AddressAutocomplete: FC<Props> = (props) => {
  const { label, onSelect } = props;

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!inputValue) return;
    setLoading(true);
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
            inputValue
          )}`
        );
        const data = await response.json();
        setOptions(
          data.map((item: any) => ({
            label: item.display_name,
            value: {
              latitude: item.lat,
              longitude: item.lon,
              country: item.address?.country || "",
              city:
                item.address?.city ||
                item.address?.town ||
                item.address?.village ||
                "",
              street: `${item.address?.road || ""} ${
                item.address?.house_number || ""
              }`.trim(),
            },
          }))
        );
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
      setLoading(false);
    };

    const timeoutId = setTimeout(fetchAddresses, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) => option.label}
      onInputChange={(_, newValue) => setInputValue(newValue)}
      onChange={(_, selectedOption: any) => {
        if (selectedOption) onSelect(selectedOption.value);
      }}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label || "Enter address"}
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AddressAutocomplete;
