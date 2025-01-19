"use client";

import { useState } from "react";
import { useStore } from "@/stores/store";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

// -------------------------------

type AddAssigneeDialogProps = {
  open: boolean;
  onClose: () => void;
};

// -------------------------------

export const AddAssigneeDialog = ({
  open,
  onClose,
}: AddAssigneeDialogProps) => {
  const [name, setName] = useState("");
  const addAssignee = useStore((state) => state.addAssignee);

  const handleSubmit = () => {
    if (name.trim()) {
      addAssignee(name.trim());
      setName("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add New Assignee</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!name.trim()}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
