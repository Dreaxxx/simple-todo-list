import type { ChangeEvent } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { InputAdornment, TextField } from "@mui/material";

type TodoSearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export function TodoSearchBar({
  search,
  onSearchChange,
}: TodoSearchBarProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.target.value);
  }

  return (
    <TextField
      fullWidth
      label="Rechercher"
      placeholder="Par titre ou nom d'utilisateur"
      value={search}
      onChange={handleChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
