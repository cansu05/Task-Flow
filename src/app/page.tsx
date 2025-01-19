'use client'

import Board from "@/app/components/board";
import {
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// ---------------------------------------------------------------

export default function Home() {
  const {palette} = useTheme();
  return (
    <Container
      sx={{ backgroundColor: palette.background.default, mt: 5 }}
    >
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
            <Typography variant="h4">TaskFlow</Typography>
            <IconButton
                sx={{
                  color: palette.primary.main,
                  border: `1px dashed ${palette.primary.main}`,
                  width: "30px",
                  height: "30px",
                }}
            >
              <AddIcon />
            </IconButton>
        </Stack>
        <Divider
            sx={{
              borderColor: `${palette.secondary.main}`,
              borderWidth: 1,
              mb: 5,
            }}
        />
          <Board />
    </Container>
  );
}
