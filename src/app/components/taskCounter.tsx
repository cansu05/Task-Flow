import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { StatusColors } from "@/types";

type TaskCounterProps = {
  count: number;
  title: string;
  colors: StatusColors;
};

export const TaskCounter: FC<TaskCounterProps> = ({ count, title, colors }) => (
  <Stack direction="row" alignItems="center" gap={1}>
    <Box
      sx={{
        border: `1px dashed ${colors.textColor}`,
        borderRadius: 4,
        color: colors.textColor,
        backgroundColor: colors.btnColor,
        width: 30,
        height: 30,
        textAlign: "center",
        lineHeight: "30px",
      }}
    >
      {count}
    </Box>
    <Typography variant="h5" sx={{ color: colors.textColor }}>
      {title}
    </Typography>
  </Stack>
);
