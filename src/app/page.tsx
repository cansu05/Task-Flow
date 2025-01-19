"use client";

import { useState } from "react";
import {
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Board from "@/app/components/board";
import { AddAssigneeDialog } from "@/app/components/addAssigneeDiaolg";
import { AddMemberList } from "./components/addMamberList";
import { useStore } from "@/stores/store";

// -----------------------------------------------------------------------------

export default function Page() {
  const { palette } = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const { assignees } = useStore();

  return (
    <Container sx={{ backgroundColor: palette.background.default, mt: 5 }}>
      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography variant="h4">TaskFlow</Typography>
        <AddMemberList
          members={assignees} 
          onAddClick={handleDialogOpen} 
        />
      </Stack>
      <Divider
        sx={{
          borderColor: `${palette.secondary.main}`,
          borderWidth: 1,
          mb: 5,
        }}
      />
      <Board />
      <AddAssigneeDialog open={dialogOpen} onClose={handleDialogClose} />
    </Container>
  );
}
